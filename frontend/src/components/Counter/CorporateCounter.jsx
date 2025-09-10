import React from "react";
import "./CorporateCouter.css";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { FaUtensils, FaStore, FaUsers, FaBuilding } from "react-icons/fa";

const statsData = [
  {
    icon: <FaUtensils />,
    value: 5000000,
    text: "Meals delivered to date",
  },
  {
    icon: <FaStore />,
    value: 600,
    text: "Restaurants and caterers",
  },
  {
    icon: <FaUsers />,
    value: 30000,
    text: "People fed every week",
  },
  {
    icon: <FaBuilding />,
    value: 600,
    text: "Companies ordering weekly",
  },
];

export default function CorporateCounter() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <section className="stats-section" ref={ref}>
      {statsData.map((stat, index) => (
        <div className="stat-block" key={index}>
          <div className="stat-icon">{stat.icon}</div>
          <h2 className="stat-number">
            {inView ? (
              <CountUp start={0} end={stat.value} duration={2} separator="," />
            ) : (
              0
            )}
          </h2>
          <p className="stat-text">{stat.text}</p>
        </div>
      ))}
    </section>
  );
}
