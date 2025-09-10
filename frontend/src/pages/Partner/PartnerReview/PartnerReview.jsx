import React, { useState } from "react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import "./PartnerReview.css";
import sampleImage from "../../../assets/Images/fastbite-image1.jpg";

const reviews = [
  {
    text: "Being with FastBite has introduced our business to thousands of people who wouldn’t have seen us before.",
    name: "Chillis",
  },
  {
    text: "Everyone knows FastBite and FastBite let everyone know we’re on their platform. The quality and variety of their branded merchandise is a real bonus.",
    name: "Chocstop",
  },
  {
    text: "Being with FastBite has introduced our business to thousands of people who wouldn’t have seen us before.",
    name: "Georgia Fried Chicken",
  },
  {
    text: "Best decision we ever made. Reliable, professional, and they have helped us grow our business.",
    name: "One Stop Caribbean",
  },
  {
    text: "Partnering with FastBite has been a game-changer for us. Orders are up and the support has been fantastic. Highly recommended.",
    name: "Chilla & Valentinos Pizza",
  },
];

const ReviewSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length
    );
  };

  return (
    <div className="reviews-section">
      {/* Left Section */}
      <div className="reviews-left">
        {/* Static Quotes */}
        <FaQuoteLeft className="quote-icon left-quote" />

        {/* Sliding Text */}
        <div key={currentIndex} className="slide-in">
          <p className="review-text">
            {reviews[currentIndex].text}
            <FaQuoteRight className="quote-icon right-quote" />
          </p>
          <p className="reviewer-name">{reviews[currentIndex].name}</p>
        </div>

        {/* Controls */}
        <div className="reviews-controls">
          <MdKeyboardArrowLeft className="arrow-icon" onClick={handlePrev} />

          <div className="dots">
            {reviews.map((_, index) => (
              <span
                key={index}
                className={`dot ${currentIndex === index ? "active" : ""}`}
              ></span>
            ))}
          </div>

          <MdKeyboardArrowRight className="arrow-icon" onClick={handleNext} />
        </div>
      </div>

      {/* Right Section */}
      <div className="reviews-right">
        <img src={sampleImage} alt="Review Visual" className="side-image" />
      </div>
    </div>
  );
};

export default ReviewSection;
