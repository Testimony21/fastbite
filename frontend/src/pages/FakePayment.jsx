import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";
import { useCart } from "../Context/CartContext";

const FakePayment = ({ amount }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();

  const payNow = async () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (!userInfo?.token) {
      toast.error("Please login to continue");
      return;
    }

    if (!cart.items.length) {
      toast.error("Your cart is empty");
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/payments/fake`,
        {
          amount,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Payment successful!");
      await clearCart();
      navigate("/order-success");
    } catch (err) {
      console.error(err);
      toast.error("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-box">
      <h2>Fake Payment</h2>
      <p>Total: ₦{amount.toLocaleString()}</p>

      <button onClick={payNow} disabled={loading}>
        {loading ? <ClipLoader size={20} /> : "Pay Now (Test)"}
      </button>
    </div>
  );
};

export default FakePayment;
