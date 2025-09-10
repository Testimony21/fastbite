import React, { useEffect, useState } from "react";
import { FaMotorcycle } from "react-icons/fa";
import courierHero from "../../assets/Images/fastbite-image12.jpg";
import "./becomeACourier.css";
import BecomeNavbar from "./BecomeNavbar/BecomeNavbar";
import BecomeWhyDeliver from "../../pages/BecomeACourier/BecomeWhyDeliver/BecomeWhyDeliver";
import BecomeRequirements from "../../pages/BecomeACourier/BecomeRequirements/BecomeRequirements";
import BecomeQuestions from "../../pages/BecomeACourier/BecomeQuestions/BecomeQuestions";

const BecomeCourierHero = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimate(true), 100);
  }, []);

  return (
    <>
      <section
        className="become-hero"
        style={{ backgroundImage: `url(${courierHero})` }}
      >
        <div className="hero-overlay">
          <div className={`become-content ${animate ? "animate" : ""}`}>
            <h1>
              Fast cash, flexible work
            </h1>
            <p>
              Make extra money fast and fit delivering around your lifestyle.
            </p>
            <button className="apply-btn">
              <FaMotorcycle className="motorcycle-icon" />
              Apply now
            </button>
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
