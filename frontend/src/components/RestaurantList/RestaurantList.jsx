import React from "react";
import "./RestaurantList.css";

const RestaurantList = ({ restaurants = [] }) => {
  if (!Array.isArray(restaurants) || restaurants.length === 0) {
    return <p>No restaurants found.</p>;
  }

  return (
    <div className="restaurant-list">
      {restaurants.map((r) => (
        <div key={r._id} className="restaurant-card">
          <img src={r.image || "https://via.placeholder.com/150"} alt={r.name} />
          <h3>{r.name}</h3>
          <p>{r.address}</p>
          <p>{r.location}</p>
          <p>{r.phone}</p>
        </div>
      ))}
    </div>
  );
};



export default RestaurantList;
