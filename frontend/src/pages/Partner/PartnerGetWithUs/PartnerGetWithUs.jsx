import React from "react";
import "./PartnerGetWithUs.css";
import { FaTools, FaChartLine, FaTags, FaGift, FaCamera, FaUsers } from "react-icons/fa";
import sampleImage from "../../../assets/Images/fastbite-image8.jpg"; 

const PartnerGetWithUs = ({ onGetStartedClick }) => {
  return (
    <section className="partner-get-with-us">
      <div className="left">
        <h1>What you'll get with us</h1>
        <ul>
          <li><FaTools className="icon" /> Self-service management tools</li>
          <li><FaChartLine className="icon" /> Real time insights and data</li>
          <li><FaTags className="icon" /> Custom and pre-set promotions</li>
          <li><FaGift className="icon" /> Exclusive offers and business savings</li>
          <li><FaCamera className="icon" /> Free photography, branding, merchandise</li>
          <li><FaUsers className="icon" /> Reach millions of loyal FastBite customers</li>
        </ul>
        <button className="get-started-btn" onClick={onGetStartedClick}>
          Get Started
        </button>
      </div>

      <div className="right">
        <img src={sampleImage} alt="Benefits preview" />
      </div>
    </section>
  );
};

export default PartnerGetWithUs;
