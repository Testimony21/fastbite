import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], totalItems: 0 });
  const [loading, setLoading] = useState(false);

  // ✅ Backend base URL
  const BASE_URL = "http://localhost:5000";

  // ✅ Get token from localStorage
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

  // ✅ Fetch Cart
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
      } else {
        console.error("❌ Error fetching cart:", data.message);
      }
    } catch (err) {
      console.error("❌ Error fetching cart:", err);
    } finally {
      setLoading(false);
    }
  };

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

      // ✅ Update totalItems immediately
      setCart((prev) => ({
        ...prev,
        totalItems: data.totalItems,
      }));

      // ✅ Then fetch full updated cart from backend (items + quantities)
      fetchCart();
    } else {
      console.error("❌ Error adding to cart:", data.message);
    }
  } catch (error) {
    console.error("❌ Error adding to cart:", error.message);
  }
};

// ✅ Remove item from cart
const removeFromCart = async (productId) => {
  const token = getToken();
  if (!token) {
    console.warn("⚠️ No token found. Please log in first.");
    return;
  }

  try {
    const response = await fetch(`${BASE_URL}/api/cart/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (response.ok) {
      console.log("🗑️ Item removed from cart:", data);
      
      // ✅ Instantly update local cart state
      setCart((prevCart) => ({
        ...prevCart,
        items: prevCart.items.filter((item) => item.productId !== productId),
        totalItems: data.totalItems || prevCart.totalItems - 1,
      }));

      // ✅ Optionally refetch full cart for accuracy
      fetchCart();
    } else {
      console.error("❌ Error removing item:", data.message);
    }
  } catch (error) {
    console.error("❌ Error removing from cart:", error.message);
  }
};

  // ✅ Fetch cart when page loads
  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider value={{ cart, addToCart,  removeFromCart, fetchCart, loading }}>
      {children}
    </CartContext.Provider>
  );
};