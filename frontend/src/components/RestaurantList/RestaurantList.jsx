import React from "react";
import { Link } from "react-router-dom";
import "./RestaurantList.css";

const RestaurantList = ({ restaurants = [], loading, error }) => {
  if (loading) return null;

  if (error) {
    return <p className="error">{error}</p>;
  }

  if (!restaurants.length) {
    return <p>No restaurants available in this city yet.</p>;
  }

  return (
    <div className="restaurant-list">
      {restaurants.map((r) => (
        <Link
          to={`/restaurants/${r._id}`}
          key={r._id}
          className="restaurant-card"
        >
          <img
            src={r.image || "https://via.placeholder.com/150"}
            alt={r.name}
          />
          <h3>{r.name}</h3>
          <p>{r.location}</p>
          <p>{r.cuisine}</p>
        </Link>
      ))}
    </div>
  );
};

export default RestaurantList;
