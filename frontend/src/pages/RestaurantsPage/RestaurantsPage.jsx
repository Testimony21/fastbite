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
        setRestaurants(Array.isArray(data.restaurants) ? data.restaurants : []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (location) fetchRestaurants();
  }, [location]);

  if (loading) return <p className="loading">Loading restaurants...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="restaurants-page">
      <h1 className="page-title">
        Restaurants in {location || "your area"}
      </h1>

      {restaurants.length === 0 ? (
        <p>No restaurants found.</p>
      ) : (
        <ul className="restaurants-list">
          {restaurants.map((r) => (
            <li key={r._id} className="restaurant-card">
              <Link to={`/restaurants/${r._id}`} className="restaurant-link">
                {r.image && (
                  <img
                    src={r.image}
                    alt={r.name}
                    className="restaurant-img"
                  />
                )}
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