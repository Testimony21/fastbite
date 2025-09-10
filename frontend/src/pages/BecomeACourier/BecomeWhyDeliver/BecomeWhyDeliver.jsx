import React, { useState, useEffect, useRef } from "react";
import {
  FaClock,
  FaMoneyBillWave,
  FaSmile,
  FaUsers,
  FaHeadset,
  FaCheckCircle,
} from "react-icons/fa";
import { BsThreeDots, BsThreeDotsVertical } from "react-icons/bs";
import "./BecomeWhyDeliver.css";

const features = [
  {
    icon: <FaClock />,
    front: "Flexible hours",
    back: "Work when you want. Choose your own schedule and submit your run requests each week.",
  },
  {
    icon: <FaMoneyBillWave />,
    front: "Weekly pay",
    back: "With weekly deposits direct to your bank account, you’ll get fast access to your cash.",
  },
  {
    icon: <FaSmile />,
    front: "Keep 100% of tips",
    back: "Earners, keepers. Whatever tips you make, you’ll pocket the full amount.",
  },
  {
    icon: <FaUsers />,
    front: "Be part of a community",
    back: "Join our community of couriers delivering throughout the U.K.",
  },
  {
    icon: <FaHeadset />,
    front: "Round-the-clock support",
    back: "Whenever you need advice or support, simply chat with us via the courier app.",
  },
  {
    icon: <FaCheckCircle />,
    front: "No experience needed",
    back: "Just making your first career move? We welcome new starters with no previous delivery experience.",
  },
];

export default function WhyDeliver() {
  const [flipped, setFlipped] = useState(Array(features.length).fill(false));
  const sectionRef = useRef(null);

  const toggle = (i) =>
    setFlipped((prev) => prev.map((v, idx) => (idx === i ? !v : v)));

  useEffect(() => {
    const elements = sectionRef.current.querySelectorAll("h2, .flip-card");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
            observer.unobserve(entry.target); 
          }
        });
      },
      { threshold: 0.2 }
    );

    elements.forEach((el, index) => {
      el.style.animationDelay = `${index * 0.2}s`; 
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="why-deliver" ref={sectionRef}>
      <h2>Why deliver with FastBite?</h2>

      <div className="features-grid">
        {features.map((f, i) => (
          <div className="flip-card" key={i}>
            <div className={`flip-card-inner ${flipped[i] ? "flipped" : ""}`}>
              <div className="flip-card-face flip-card-front">
                <div className="icon">{f.icon}</div>
                <h3>{f.front}</h3>
                <button
                  className="dots"
                  aria-label="Show more"
                  onClick={() => toggle(i)}
                  onKeyDown={(e) =>
                    (e.key === "Enter" || e.key === " ") && toggle(i)
                  }
                >
                  <BsThreeDots className="dot-horizontal" />
                  <BsThreeDotsVertical className="dot-vertical" />
                </button>
              </div>

              <div className="flip-card-face flip-card-back">
                <p>{f.back}</p>
                <button
                  className="dots"
                  aria-label="Show less"
                  onClick={() => toggle(i)}
                  onKeyDown={(e) =>
                    (e.key === "Enter" || e.key === " ") && toggle(i)
                  }
                >
                  <BsThreeDots className="dot-horizontal" />
                  <BsThreeDotsVertical className="dot-vertical" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
