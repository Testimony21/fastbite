import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaCheckCircle, FaTimes } from "react-icons/fa";
import forgotImage1 from "../../../../assets/Images/fastbite-image2.jpg";
import "./PartnerForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    try {
      // Call backend forgot-password route
      const res = await fetch(`&{API_URL}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        alert("No account found with that email");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="forgot-container">
      <div className="forgot-content">
        {/* Left Image */}
        <div className="forgot-image">
          <img src={forgotImage1} alt="Partner signup" />
        </div>

        {/* Right Form Section */}
        <div className="forgot-form">
          <div className="back-login" onClick={() => navigate("/login")}>
            <FaArrowLeft className="back-icon" /> <h5>Back to Login</h5>
          </div>
          <h2>Forgot your password?</h2>
          <p className="instructions">
            Enter your email below. If an account exists, you’ll receive a reset link.
          </p>

          <form onSubmit={handleSubmit}>
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="confirm-btn">Confirm</button>
          </form>
          <hr />

          {submitted && (
            <div className="success-alert">
              <FaCheckCircle className="success-icon" />
              <p>
                We sent a password reset email to your address.
                <br />
                No email yet? Try resending in a few minutes.
              </p>
              <FaTimes
                className="close-icon"
                onClick={() => setSubmitted(false)}
              />
            </div>
          )}

          <div className="signup-footer">
            <h4>Don't have an account?</h4>
            <button className="signup-btn" onClick={() => navigate("/signup")}>
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
