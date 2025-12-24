import React, { useEffect, useState, useContext, useMemo } from "react";
import { useParams } from "react-router-dom";
import "./RestaurantMenuPage.css";
import { CartContext } from "../../Context/CartContext";
import { useLoading } from "../../Context/LoadingContext/LoadingContext";
import ClipLoader from "react-spinners/ClipLoader";

const BACKEND_URL = import.meta.env.VITE_API_URL;

const RestaurantMenuPage = () => {
  const { restaurantId } = useParams();

  const [restaurant, setRestaurant] = useState(null);
  const [menus, setMenus] = useState([]);
  const [menusLoading, setMenusLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);

  const { addToCart } = useContext(CartContext);
  const { setLoading } = useLoading();

  /* =======================
     FETCH RESTAURANT + MENUS
     ======================= */
  useEffect(() => {
    if (!restaurantId) return;

    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        setMenusLoading(true);

        const [restaurantRes, menuRes] = await Promise.all([
          fetch(`${BACKEND_URL}/api/restaurants/${restaurantId}`),
          fetch(`${BACKEND_URL}/api/restaurants/${restaurantId}/menus`)
        ]);

        const restaurantData = await restaurantRes.json();
        const menuData = await menuRes.json();

        if (isMounted) {
          setRestaurant(restaurantData);
          setMenus(Array.isArray(menuData) ? menuData : []);
        }
      } catch (error) {
        console.error("Error fetching restaurant data:", error);
      } finally {
        if (isMounted) {
          setMenusLoading(false);
          setLoading(false);
        }
      }
    };

    fetchData();
    return () => (isMounted = false);
  }, [restaurantId, setLoading]);

  /* =======================
     REMOVE DUPLICATE MENUS
     ======================= */
  const uniqueMenus = useMemo(() => {
    const seen = new Set();
    return menus.filter(item => {
      const key = `${item.name}-${item.restaurant}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [menus]);

  /* =======================
     ADD TO CART
     ======================= */
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
      {/* Add-to-cart loader */}
      {addingToCart && (
        <div className="loading-overlay">
          <ClipLoader size={50} />
          <p className="loader-text">Adding to cart...</p>
        </div>
      )}

      <div className="restaurant-menu-page">
        {/* Restaurant Header */}
        {restaurant && (
          <div className="restaurant-header">
            <h1>{restaurant.name}</h1>
            <p className="restaurant-location">{restaurant.location}</p>
            <p className="restaurant-cuisine">
              Cuisine: {restaurant.cuisine}
            </p>
          </div>
        )}

        <h2 className="menu-title">Menu</h2>

        {/* ✅ FIXED MENU LOGIC */}
        {menusLoading ? (
          <div className="menu-loading">
            <ClipLoader size={35} />
            <p>Loading menu...</p>
          </div>
        ) : uniqueMenus.length === 0 ? (
          <p>No menu items available.</p>
        ) : (
          <div className="menu-grid">
            {uniqueMenus.map(item => (
              <div className="menu-card" key={item._id}>
                <img src={item.image} alt={item.name} />
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <p className="menu-price">
                  ₦{item.price.toLocaleString()}
                </p>

                <button onClick={() => handleAddToCart(item)}>
                  Add to Cart
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
