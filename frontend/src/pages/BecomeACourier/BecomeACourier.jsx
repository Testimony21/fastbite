import React, { useEffect, useState } from "react";
import { FaMotorcycle } from "react-icons/fa";
import { Link } from "react-router-dom";
import courierHero1 from "../../assets/Images/fastbite-image12.jpg";
import courierHero2 from "../../assets/Images/courier3.jpg";
import courierHero3 from "../../assets/Images/courier2.jpg"; // add more if you like
import "./BecomeACourier.css";
import BecomeNavbar from "./BecomeNavbar/BecomeNavbar";
import BecomeWhyDeliver from "../../pages/BecomeACourier/BecomeWhyDeliver/BecomeWhyDeliver";
import BecomeRequirements from "../../pages/BecomeACourier/BecomeRequirements/BecomeRequirements";
import BecomeQuestions from "../../pages/BecomeACourier/BecomeQuestions/BecomeQuestions";

const images = [courierHero1, courierHero2, courierHero3];

const BecomeCourierHero = () => {
  const [animate, setAnimate] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    setAnimate(true);

    // change image every 5s
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <section
        className="become-hero fade"
        style={{ backgroundImage: `url(${images[currentImage]})` }}
      >
        <div className="hero-overlay">
          <div className={`become-content ${animate ? "animate" : ""}`}>
            <h1>Fast cash, flexible work</h1>
            <p>
              Make extra money fast and fit delivering around your lifestyle.
            </p>
            <Link to="/courier-register" className="apply-now-btn">
              <FaMotorcycle className="motorcycle-icon" />
              Apply now
            </Link>
          </div>
        </div>
      </section>

      <BecomeNavbar />
      <BecomeWhyDeliver />
      <BecomeRequirements />
      <BecomeQuestions />
    </>
  );
};

export default BecomeCourierHero;
