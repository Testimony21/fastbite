// src/pages/CartPage/CartPage.jsx
import React, { useEffect } from "react";
import { useCart } from "../../Context/CartContext";
import "./CartPage.css";

const CartPage = () => {
  const { cart, cartCount, updateQuantity, removeFromCart, clearCart, fetchCart, loading } =
    useCart();

  useEffect(() => {
    fetchCart();
  }, []);

  const items = cart?.items || [];

  if (loading) return <p>Loading your cart...</p>;

  return (
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
                    onClick={() => updateQuantity(item.productId, "decrease")}
                    disabled={item.quantity <= 1}
                  >
                    –
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.productId, "increase")}
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeFromCart(item.productId)}
                  className="remove-btn"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="cart-actions">
            <button className="clear-cart-btn" onClick={clearCart}>
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
            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
