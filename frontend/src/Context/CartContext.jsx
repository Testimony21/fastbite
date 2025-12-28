import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], totalItems: 0 });
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const BASE_URL = import.meta.env.VITE_API_URL;

  const getToken = () => {
    const userData = localStorage.getItem("userInfo");
    if (!userData) return null;
    try {
      const parsed = JSON.parse(userData);
      return parsed.token || parsed.accessToken || null;
    } catch {
      return null;
    }
  };

  // ✅ Fetch user cart
  const fetchCart = async () => {
    const token = getToken();
    if (!token) return;

    try {
      setLoading(true);
      const { data } = await axios.get(`${BASE_URL}/api/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(data);
      setCartCount(data.totalItems || 0);
    } catch (err) {
      console.error("❌ Error fetching cart:", err.response?.data || err.message);
      setCart({ items: [], totalItems: 0 });
    } finally {
      setLoading(false);
    }
  };

  // ✅ Add item to cart
  // ✅ Add item to cart
  const addToCart = async (product, quantity = 1) => {
    const token = getToken();
    if (!token) return;

    // Extract productId properly
    const productId = product._id || product.id || product;

    try {
      const { data } = await axios.post(
        `${BASE_URL}/api/cart`,
        { productId, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("✅ Added to cart:", data);
      fetchCart();
    } catch (err) {
      console.error(
        "❌ Error adding to cart:",
        err.response?.data || err.message
      );
    }
  };

  // ✅ Decrease or remove item
  const removeFromCart = async (productId) => {
    const token = getToken();
    if (!token) return;

    try {
      const { data } = await axios.delete(`${BASE_URL}/api/cart/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("✅ Removed from cart:", data);
      fetchCart();
    } catch (err) {
      console.error("❌ Error removing from cart:", err.response?.data || err.message);
    }
  };

  // ✅ Increase or decrease quantity via PUT route
  const updateQuantity = async (productId, action) => {
    const token = getToken();
    if (!token) return;

    try {
      const { data } = await axios.put(
        `${BASE_URL}/api/cart/${productId}`,
        { action }, // "increase" or "decrease"
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("🔁 Quantity updated:", data);
      fetchCart();
    } catch (err) {
      console.error("❌ Error updating quantity:", err.response?.data || err.message);
    }
  };

  // ✅ Clear entire cart
  const clearCart = async () => {
    const token = getToken();
    if (!token) return;

    try {
      const { data } = await axios.delete(`${BASE_URL}/api/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("🧹 Cart cleared:", data);
      fetchCart();
    } catch (err) {
      console.error("❌ Error clearing cart:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    const token = getToken();
    if (token) {
       fetchCart();
    }
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        addToCart,
        removeFromCart,
        updateQuantity,
        fetchCart,
        clearCart,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => React.useContext(CartContext);
