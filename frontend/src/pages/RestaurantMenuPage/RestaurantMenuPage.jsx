// src/pages/RestaurantMenuPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./RestaurantMenuPage.css";
import Navbar from "../../components/navbar/Navbar";

const RestaurantMenuPage = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch restaurant info
        const resRestaurant = await fetch(`http://localhost:5000/api/restaurants/${id}`);
        const restaurantData = await resRestaurant.json();

        // Fetch menus
        const resMenus = await fetch(`http://localhost:5000/api/restaurants/${id}/menus`);
        const menuData = await resMenus.json();

        setRestaurant(restaurantData);
        setMenus(menuData);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <Navbar minimal />
      <div className="restaurant-menu-page">
        {restaurant && (
          <div className="restaurant-header">
            <img src={restaurant.image} alt={restaurant.name} />
            <h1>{restaurant.name}</h1>
            <p>{restaurant.description}</p>
            <p>{restaurant.location}</p>
          </div>
        )}

        <h2>Menu</h2>
        {menus.length === 0 ? (
          <p>No menu items yet.</p>
        ) : (
          <div className="menu-grid">
            {menus.map((item) => (
              <div className="menu-card" key={item._id}>
                <img src={item.image} alt={item.name} />
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <p>₦{item.price.toLocaleString()}</p>
                <button>Add to Cart</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default RestaurantMenuPage;