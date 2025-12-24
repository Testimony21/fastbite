import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import "./RestaurantsPage.css";
import { useLoading } from "../../Context/LoadingContext/LoadingContext";

const allowedCities = [
  "Yola", "Uyo", "Awka", "Bauchi", "Yenegua", "Makurdi", "Maiduguri",
  "Calabar", "Asaba", "Abakiliki", "Benin City", "Ado Ekiti", "Enugu", "Gombe",
  "Owerri", "Dutse", "Kaduna", "Kano", "Katsina", "Birnin Kebbi", "Lokoja",
  "Ilorin", "Ikeja", "Lafia", "Minna", "Abeokuta", "Akure", "Osogbo", "Ibadan",
  "Jos", "Port Harcourt", "Sokoto", "Jalingo", "Damaturu", "Abuja"
];

const RestaurantsPage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState("");
  const [localLoading, setLocalLoading] = useState(false);

  const { setLoading } = useLoading();
  const routerLocation = useLocation();

  const params = new URLSearchParams(routerLocation.search);
  const city = params.get("location")?.trim() || "";

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
        setRestaurants(Array.isArray(data.restaurants) ? data.restaurants : []);
      } catch (err) {
        setError(err.message);
        setRestaurants([]);
      } finally {
        setLocalLoading(false);
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, [city, setLoading]);

  const cityNormalized = city.toLowerCase();
  const allowedCitiesLower = allowedCities.map(c => c.toLowerCase());

  return (
    <div className="page-container">
      <div className="content-wrap">
        <div className="restaurants-page">
          <h1 className="page-title">
            Restaurants in {city || "your area"}
          </h1>

          {/* Loader above message */}
          {localLoading && (
            <div className="loader-container">
              <ClipLoader size={35} color="#555" />
              <p>Loading restaurants…</p>
            </div>
          )}

          {/* API or fetch error */}
          {!localLoading && error && <p className="error">{error}</p>}

          {/* No restaurants */}
          {!localLoading && !error && restaurants.length === 0 && city && (
            allowedCitiesLower.includes(cityNormalized) ? (
              <p>No restaurants available in {city} yet.</p>
            ) : (
              <p className="error">
                ❌ "{city}" is not a valid city. Please select a city from the dropdown.
              </p>
            )
          )}

          {/* Restaurants List */}
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
