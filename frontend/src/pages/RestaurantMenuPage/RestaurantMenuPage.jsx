// src/pages/RestaurantMenuPage.jsx
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import "./RestaurantMenuPage.css";
import { CartContext } from "../../Context/CartContext";
import { useLoading } from "../../Context/LoadingContext/LoadingContext"; 
import ClipLoader from "react-spinners/ClipLoader";

const BACKEND_URL = import.meta.env.VITE_API_URL;

const RestaurantMenuPage = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [menus, setMenus] = useState([]);
  const [addingToCart, setAddingToCart] = useState(false);

  const { addToCart } = useContext(CartContext);
  const { setLoading } = useLoading(); // GLOBAL LOADER

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const resRestaurant = await fetch(`${BACKEND_URL}/api/restaurants/${id}`);
        if (!resRestaurant.ok) throw new Error("Failed to fetch restaurant");
        const restaurantData = await resRestaurant.json();

        const resMenus = await fetch(`${BACKEND_URL}/api/restaurants/${id}/menus`);
        if (!resMenus.ok) throw new Error("Failed to fetch menus");
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
  }, [id, setLoading]);

  const handleAddToCart = async (item) => {
    setAddingToCart(true);
    try {
      await addToCart(item);
    } finally {
      setTimeout(() => setAddingToCart(false), 500);
    }
  };

  return (
    <>
      {addingToCart && (
        <div className="loading-overlay">
          <ClipLoader size={50} />
          <p className="loader-text">Adding to cart...</p>
        </div>
      )}

      <div className="restaurant-menu-page">
        {restaurant && (
          <div className="restaurant-header">
            <h1>{restaurant.name}</h1>
          </div>
        )}

        <h2 className="menu-title">Menu</h2>

        {menus.length === 0 ? (
          <p>No menu items yet.</p>
        ) : (
          <div className="menu-grid">
            {menus.map(item => (
              <div className="menu-card" key={item._id}>
                <img src={item.image} alt={item.name} />
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <p>₦{item.price.toLocaleString()}</p>
                <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default RestaurantMenuPage;
