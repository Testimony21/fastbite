import React, { useEffect, useState } from "react";
import axios from "axios";

export default function MyRestaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/restaurants/mine",
          {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
        );

        setRestaurants(data);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };

    fetchRestaurants();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Restaurants</h2>

      {restaurants.length === 0 ? (
        <p>No restaurants added yet.</p>
      ) : (
        restaurants.map((restaurant) => (
          <div
            key={restaurant._id}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              marginBottom: "10px",
              borderRadius: "8px",
            }}
          >
            <h3>{restaurant.name}</h3>
            <p>{restaurant.description}</p>
            <p>{restaurant.address}</p>
          </div>
        ))
      )}
    </div>
  );
}