// src/pages/Dashboard.jsx
import React, { useState } from "react";
// import AddRestaurant from "../"

const Dashboard = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    location: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo?.token;

    if (!token) {
      alert("You must be logged in to add a restaurant.");
      return;
    }

    const res = await fetch("http://localhost:5000/api/restaurants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (!res.ok) {
      alert(data.message || "Restaurant created!");
    } else {
      alert("Restaurant created!");
    }
  };

  return (
    <div className="p-6">
      {/* <h1 className="text-2xl mb-4">Add Your Restaurant</h1> */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
        <input
          type="text"
          name="name"
          placeholder="Restaurant Name"
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          onChange={handleChange}
          required
        />
        <input
        type="text"
        name="location"
        placeholder="location"
        onChange={handleChange}
        required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          onChange={handleChange}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Dashboard;
