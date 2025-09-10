// src/pages/RestaurantsPage.jsx
import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import "./RestaurantsPage.css";
import RestaurantList from "../../components/RestaurantList/RestaurantList";

const RestaurantsPage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

 const params = new URLSearchParams(window.location.search);
  const location = params.get("location") || "";

  useEffect(() => {

  const fetchRestaurants = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `http://localhost:5000/api/restaurants/search?location=${location}`
        );
        if (!res.ok) throw new Error("Failed to fetch restaurants");

        const data = await res.json();
        setRestaurants(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (location) fetchRestaurants();
  }, [location]);

  if (loading) return <p className="text-center">Loading restaurants...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Restaurants in {location || "your area"}
      </h1>

      {restaurants.length === 0 ? (
        <p>No restaurants found.</p>
      ) : (
        <ul className="space-y-4">
          {restaurants.map((r) => (
            <li key={r._id} className="border p-4 rounded shadow">
              <h2 className="text-lg font-semibold">{r.name}</h2>
              <p>{r.location}</p>
              <p>Cuisine: {r.cuisine}</p>
              <p>Rating: ⭐ {r.rating}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RestaurantsPage;