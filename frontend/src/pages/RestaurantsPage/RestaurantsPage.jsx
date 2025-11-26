import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import "./RestaurantsPage.css";
import { useLoading } from "../../Context/LoadingContext/LoadingContext";

const RestaurantsPage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState("");

  const { setLoading } = useLoading(); // <-- use global loader
  const params = new URLSearchParams(window.location.search);
  const location = params.get("location") || "";

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setLoading(true); // show loader

        const BACKEND_URL = import.meta.env.VITE_API_URL;

        const res = await fetch(
          `${BACKEND_URL}/api/restaurants/search?location=${location}`
        );

        if (!res.ok) throw new Error("Failed to fetch restaurants");

        const data = await res.json();
        setRestaurants(Array.isArray(data.restaurants) ? data.restaurants : []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // hide loader once data is ready
      }
    };

    if (location) fetchRestaurants();
  }, [location, setLoading]);

  if (error) return <p className="error">{error}</p>;

  return (
    <div className="restaurants-page">
      <h1 className="page-title">Restaurants in {location || "your area"}</h1>

      {restaurants.length === 0 ? (
        <p>No restaurants found.</p>
      ) : (
        <ul className="restaurants-list">
          {restaurants.map((r) => (
            <li key={r._id} className="restaurant-card">
              <Link to={`/restaurants/${r._id}`} className="restaurant-link">
                {r.image && <img src={r.image} alt={r.name} className="restaurant-img" />}
              </Link>
              <h2 className="restaurant-name">{r.name}</h2>
              <p className="restaurant-location">{r.location}</p>
              <p className="restaurant-cuisine">Cuisine: {r.cuisine}</p>
              <p className="restaurant-rating">Rating: ⭐ {r.rating}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RestaurantsPage;
