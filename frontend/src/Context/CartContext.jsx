import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], totalItems: 0 });
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const BASE_URL = "http://localhost:5000";

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

  // ✅ Fetch cart from backend
  const fetchCart = async () => {
    const token = getToken();
    if (!token) {
      console.warn("⚠️ No token found. User not logged in.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/api/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (res.ok) {
        setCart(data); // { items, totalItems }
        setCartCount(data.totalItems || 0);
      } else {
        console.error("❌ Error fetching cart:", data.message);
      }
    } catch (err) {
      console.error("❌ Error fetching cart:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Add to cart
  const addToCart = async (productId, quantity = 1) => {
    const token = getToken();
    if (!token) {
      console.warn("⚠️ No token found. Please log in first.");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("✅ Added to cart successfully:", data);

        setCart((prev) => ({
          ...prev,
          totalItems: data.totalItems,
        }));
        setCartCount(data.totalItems || 0);

        // ✅ Refresh cart items
        fetchCart();
      } else {
        console.error("❌ Error adding to cart:", data.message);
      }
    } catch (error) {
      console.error("❌ Error adding to cart:", error.message);
    }
  };

  // ✅ Remove from cart
  const removeFromCart = async (productId) => {
    const token = getToken();
    if (!token) {
      console.warn("⚠️ No token found. Please log in first.");
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/api/cart/${productId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to remove item");

      const data = await res.json();

      // ✅ Update local state immediately
      setCart((prev) => ({
        ...prev,
        items: prev.items.filter((item) => item.productId !== productId),
        totalItems: data.totalItems || 0,
      }));

      setCartCount(data.totalItems || 0);

      console.log("✅ Removed from cart:", data);
    } catch (error) {
      console.error("❌ Error removing from cart:", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        cartCount,
        setCartCount,
        addToCart,
        removeFromCart,
        fetchCart,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => React.useContext(CartContext);