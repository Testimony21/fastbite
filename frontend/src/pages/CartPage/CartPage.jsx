// src/pages/CartPage/CartPage.jsx
import React, { useEffect, useState } from "react";
import { useCart } from "../../Context/CartContext";
import ClipLoader from "react-spinners/ClipLoader";
import "./CartPage.css";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const {
    cart,
    cartCount,
    updateQuantity,
    removeFromCart,
    clearCart,
    fetchCart,
    loading,
  } = useCart();

  const [actionLoading, setActionLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Loading your cart...");

  useEffect(() => {
    fetchCart();
  }, []);

  const items = cart?.items || [];
  const navigate = useNavigate();

  const handleUpdateQuantity = async (productId, type) => {
    setActionLoading(true);
    setLoadingText("Updating item...");
    try {
      await updateQuantity(productId, type);
    } catch (error) {
      console.error("Error updating quantity:", error);
    } finally {
      setTimeout(() => setActionLoading(false), 400); // smoother UX
    }
  };

  const handleRemoveFromCart = async (productId) => {
    setActionLoading(true);
    setLoadingText("Removing item...");
    try {
      await removeFromCart(productId);
    } catch (error) {
      console.error("Error removing from cart:", error);
    } finally {
      setTimeout(() => setActionLoading(false), 400);
    }
  };

  const handleClearCart = async () => {
    setActionLoading(true);
    setLoadingText("Clearing your cart...");
    try {
      await clearCart();
    } catch (error) {
      console.error("Error clearing cart:", error);
    } finally {
      setTimeout(() => setActionLoading(false), 400);
    }
  };

  if (loading)
    return (
      <div className="loading-overlay">
        <ClipLoader color="#ffffff" size={50} />
        <p className="loader-text">{loadingText}</p>
      </div>
    );

  return (
    <>
      {actionLoading && (
        <div className="loading-overlay">
          <ClipLoader color="#ffffff" size={50} />
          <p className="loader-text">{loadingText}</p>
        </div>
      )}

      <div className="cart-page">
        <h2>Your Cart ({cartCount} items)</h2>

        {items.length === 0 ? (
          <p className="empty-cart">Your cart is empty.</p>
        ) : (
          <>
            <div className="cart-items">
              {items.map((item) => (
                <div className="cart-item" key={item._id}>
                  <img
                    src={item.image || "/placeholder.png"}
                    alt={item.name}
                    className="cart-item-img"
                  />

                  <div className="cart-item-details">
                    <h3>{item.name}</h3>
                    <p>₦{item.price?.toLocaleString()}</p>
                  </div>

                  <div className="cart-quantity-controls">
                    <button
                      onClick={() => handleUpdateQuantity(item.productId, "decrease")}
                      disabled={item.quantity <= 1 || actionLoading}
                    >
                      –
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => handleUpdateQuantity(item.productId, "increase")}
                      disabled={actionLoading}
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => handleRemoveFromCart(item.productId)}
                    className="remove-btn"
                    disabled={actionLoading}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-actions">
              <button
                className="clear-cart-btn"
                onClick={handleClearCart}
                disabled={actionLoading}
              >
                🧹 Clear Cart
              </button>
            </div>

            <div className="cart-summary">
              <h3>
                Total: ₦
                {items
                  .reduce((total, item) => total + item.price * item.quantity, 0)
                  .toLocaleString()}
              </h3>
              <button
                className="checkout-btn"
                disabled={actionLoading}
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartPage;
