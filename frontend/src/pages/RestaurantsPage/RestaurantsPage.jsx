import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader"; // ✅ Add this import
import "./RestaurantsPage.css";
import { useLoading } from "../../Context/LoadingContext/LoadingContext";

const RestaurantsPage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState("");
  const [localLoading, setLocalLoading] = useState(false);

  const { setLoading } = useLoading();
  const routerLocation = useLocation();

  const params = new URLSearchParams(routerLocation.search);
  const city = params.get("location") || "";

  useEffect(() => {
    if (!city) {
      setRestaurants([]);
      return;
    }

    const fetchRestaurants = async () => {
      try {
        setError("");
        setLocalLoading(true);
        setLoading(true);

        const BACKEND_URL = import.meta.env.VITE_API_URL;
        const res = await fetch(
          `${BACKEND_URL}/api/restaurants/search?location=${city}`
        );

        if (!res.ok) throw new Error("Failed to fetch restaurants");

        const data = await res.json();

        if (!Array.isArray(data.restaurants) || data.restaurants.length === 0) {
          setRestaurants([]);
          return;
        }

        setRestaurants(data.restaurants);
      } catch (err) {
        setError(err.message);
      } finally {
        setLocalLoading(false);
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, [city, setLoading]);

  return (
    <div className="page-container">
      <div className="content-wrap">
        <div className="restaurants-page">
          <h1 className="page-title">
            Restaurants in {city || "your area"}
          </h1>

          {/* ✅ Skeleton loader / spinner above message */}
          {localLoading && (
            <div className="loader-container">
              <ClipLoader size={35} color="#555" />
              <p>Loading restaurants…</p>
            </div>
          )}

          {!localLoading && error && <p className="error">{error}</p>}

          {!localLoading && !error && restaurants.length === 0 && (
            <p>No restaurants available in this city yet.</p>
          )}

          {!localLoading && restaurants.length > 0 && (
            <ul className="restaurants-list">
              {restaurants.map((r) => (
                <li key={r._id} className="restaurant-card">
                  <Link to={`/restaurants/${r._id}`} className="restaurant-link">
                    <div className="image-wrapper">
                      <img
                        src={r.image || "https://via.placeholder.com/150"}
                        alt={r.name}
                        className="restaurant-img"
                      />
                      <div className="overlay">View Menu</div>
                    </div>
                  </Link>

                  <h2 className="restaurant-name">{r.name}</h2>
                  <p className="restaurant-location">{r.location}</p>
                  <p className="restaurant-cuisine">Cuisine: {r.cuisine}</p>
                  <p className="restaurant-rating">⭐ {r.rating}</p>
                </li>
              ))}
            </ul>

          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantsPage;
