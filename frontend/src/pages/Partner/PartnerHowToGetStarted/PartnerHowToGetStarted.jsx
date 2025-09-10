import React from "react";
import "./PartnerHowToGetStarted.css";
import { FaUserPlus, FaIdCard, FaShoppingBag } from "react-icons/fa";
import Image5 from '../../../assets/Images/fastbite-image5.jpg';

const HowToGetStarted = ({ onGetStartedClick }) => {
  return (
    <div className="how-to-get-started">
      <div className="image-section">
        <img src={Image5} alt="How to get started" />
      </div>

      {/* Right - Text */}
      <div className="text-section">
        <h1>How to get started on FastBite</h1>

        <div className="step">
          <FaUserPlus className="step-icon" />
          <div>
            <h5>Register</h5>
            <p>Tell us about your business. You will need a FSA rating to sign up.</p>
          </div>
        </div>

        <div className="step">
          <FaIdCard className="step-icon" />
          <div>
            <h5>Tailor profile</h5>
            <p>
              Upload your own ID and verify your legal details and choose the agreement
              option for.
            </p>
          </div>
        </div>

        <div className="step">
          <FaShoppingBag className="step-icon" />
          <div>
            <h5>Start selling</h5>
            <p>Receive your first orders and watch your sales increase.</p>
          </div>
        </div>

        <button className="get-started-btn" onClick={onGetStartedClick}>
          Get Started
        </button>
      </div>
    </div>
  );
};

export default HowToGetStarted;


