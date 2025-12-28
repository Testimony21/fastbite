// src/pages/Checkout.jsx
import { useCart } from "../../Context/CartContext";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

const Checkout = () => {
  const { cart } = useCart();
  const navigate = useNavigate();

  const totalAmount = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="checkout-page">
      <h1 className="checkout-title">Checkout</h1>

      {cart.items.length === 0 ? (
        <p className="empty-checkout">Your cart is empty</p>
      ) : (
        <>
          <ul className="checkout-list">
            {cart.items.map((item) => (
              <li className="checkout-item" key={item._id}>
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>
                  ₦{(item.price * item.quantity).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>

          <div className="checkout-summary">
            <h2>
              Total: ₦{totalAmount.toLocaleString()}
            </h2>

            <button
              className="checkout-btn"
              onClick={() => navigate("/fake-payment")}
            >
              Proceed to Fake Payment
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Checkout;
