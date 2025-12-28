import { Link } from "react-router-dom";

const OrderSuccess = () => (
  <div style={{ padding: "2rem", textAlign: "center" }}>
    <h1>🎉 Order Confirmed!</h1>
    <p>Your payment was successful.</p>
    <Link to="/">Back to Home</Link>
  </div>
);

export default OrderSuccess;