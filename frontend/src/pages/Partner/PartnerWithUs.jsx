import React, { useState, useEffect } from "react"; 
import "./PartnerWithUs.css";
import { Link } from "react-router-dom";
import { FaRegBuilding } from "react-icons/fa";
// import PartnerNavbar from "./PartnerNavbar/PartnerNavbar";
import PartnerWhyFastBite from './PartnerWhyFastBite/PartnerWhyFastBite';
import HeroImage from "../../assets/Images/fastbite-image1.jpg";
import PartnerGetWithUs from "./PartnerGetWithUs/PartnerGetWithUs";
import PartnerHowToGetStarted from "./PartnerHowToGetStarted/PartnerHowToGetStarted";
import PartnerReview from "./PartnerReview/PartnerReview";
import PartnerFaq from "./PartnerFaq/PartnerFaq"; // Import the CSS for FAQ section
// import PartnerFooter from "./PartnerFooter/PartnerFooter"; 
// import PartnerAuth from "./PartnerAuth/PartnerAuth";
// import PartnerForgotPassword from "./PartnerAuth/PartnerForgotPassword/PartnerForgotPassword";
import UploadForm from "./UploadForm/UploadForm";
import Dashboard from "../Dashboard/Dashboard";

const PartnerWithUs = () => {
  const firstPart = "The missing ingredient";
  const [firstPartState, setFirstPartState] = useState("");

  useEffect(() => {
    let i = 0;
    const firstTimer = setInterval(() => {
      i++;
      setFirstPartState(firstPart.slice(0, i));
      if (i >= firstPart.length) clearInterval(firstTimer);
    }, 70);
    return () => clearInterval(firstTimer);
  }, []);

  return (
    <>
      <section
        className="partner-with-us"
        style={{
          backgroundImage: `url(${HeroImage})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "100vh",
        }}
      >
        <div className="partner-hero-overlay">
          <div className="partner-hero-content">
            {/* Left side */}
            <div className="partner-left">
              <h1>{firstPartState}</h1>
              <h1>to your success</h1>
            </div>

            {/* Right side */}
            <div className="partner-right">
              <h2>Grow your orders, your customers and your brand</h2>
              <p>
                Already have an account? <a href="/login">Log in</a>
              </p>

              <div className="business-info-title">
                <FaRegBuilding /> Business info
              </div>

              <form>
                <input type="text" placeholder="Business Name" />
                <input type="email" placeholder="Email Address" />
                <input type="text" placeholder="Phone Number" />
                <input type="text" placeholder="Business Address" />
                <button type="submit">Apply Now</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Other sections */}
      <PartnerWhyFastBite />
      <PartnerGetWithUs />
      <PartnerHowToGetStarted />
      <PartnerReview />
      <PartnerFaq />
      <UploadForm />
      <Dashboard />
    </>
  );
};

export default PartnerWithUs;