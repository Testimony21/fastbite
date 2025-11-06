// src/pages/RestaurantMenuPage.jsx
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import "./RestaurantMenuPage.css";
import { CartContext } from "../../../src/Context/CartContext";
import ClipLoader from "react-spinners/ClipLoader";

const RestaurantMenuPage = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);

  const { addToCart } = useContext(CartContext); // ✅ Access addToCart from context

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

  const handleAddToCart = async (item) => {
    setAddingToCart(true);
    try {
      await addToCart(item);
    } catch (err) {
      console.error("Error adding to cart:", err);
    } finally {
      // simulate short delay for smoother UX
      setTimeout(() => setAddingToCart(false), 500);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
      {addingToCart && (
        <div className="loading-overlay">
          <ClipLoader color="#ffffff" size={50} />
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
            {menus.map((item) => (
              <div className="menu-card" key={item._id}>
                <img src={item.image} alt={item.name} />
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <p>₦{item.price.toLocaleString()}</p>
                <button onClick={() => handleAddToCart(item)} disabled={addingToCart}>
                  {addingToCart ? "Please wait..." : "Add to Cart"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default RestaurantMenuPage;
