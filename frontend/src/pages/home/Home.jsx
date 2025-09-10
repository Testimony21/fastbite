import React, { useState } from "react";
import HomeHero from "../../components/hero/HomeHero";
import RestaurantList from "../../components/RestaurantList/RestaurantList";
import HowToOrder from "../../components/HowToOrder/HowToOrder"; // fixed import
import CorporateTestimonials from "../../components/CorporateTestimonials/CorporateTestimonials";
import Counter from "../../components/Counter/CorporateCounter";
import CorporateGetStarted from "../../components/CorporateGetStarted/CorporateGetStarted";

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);

  const handleSearch = async (location) => {
    try {
      const res = await fetch(`http://localhost:5000/api/restaurants?location=${location}`);
      const data = await res.json();

      if (!res.ok) {
        console.error("Error:", data.message || "Failed to fetch");
        return;
      }

      setRestaurants(data);
    } catch (err) {
      console.error("Error fetching restaurants:", err);
    }
  };

  return (
    <main className="home-page">
      <HomeHero onSearch={handleSearch} />

      {/* ✅ Show search results only if restaurants are found */}
      {restaurants.length > 0 && (
        <section className="results-section">
          <h2>Restaurants near you</h2>
          <RestaurantList restaurants={restaurants} />
        </section>
      )}

      {/* ✅ Always visible homepage sections */}
      <HowToOrder />
      <CorporateTestimonials />
      <Counter />
      <CorporateGetStarted />
    </main>
  );
};

export default Home;
