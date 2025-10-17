import React, { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import { useCart } from "../../Context/CartContext";
import "./CartPage.css";

const CartPage = () => {
  const { cart, removeFromCart, loading } = useContext(CartContext);

  const cartItems = cart.items || [];

  const getTotal = () =>
    cartItems.reduce((acc, item) => acc + (item.price || 0) * item.quantity, 0);

  if (loading) return <p>Loading cart...</p>;

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item._id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-img" />
                <div className="cart-details">
                  <h3>{item.name}</h3>
                  <p>₦{item.price}</p>
                  <div className="cart-actions">
                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(item.productId)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Total: ₦{getTotal()}</h2>
            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
