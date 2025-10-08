import "./HomeHero.css";
import { FaMapMarkerAlt, FaChevronDown, FaSearch } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HeroImage1 from "../../assets/Images/fastbite-slide-image2.jpg";
import HeroImage2 from "../../assets/Images/fastbite-slide-image1.jpg";
import HeroImage3 from "../../assets/Images/fastbite3.jpg";

function HomeHero() {
  const [location, setLocation] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const images = [HeroImage1, HeroImage2, HeroImage3];

  // Auto change every 5s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  const handleSearch = () => {
    if (!location.trim()) {
      alert("Please enter your location");
      return;
    }
    navigate(`/restaurants?location=${encodeURIComponent(location)}`);
  };

  return (
    <section className="hero-slider">
      {images.map((img, idx) => (
        <div
          key={idx}
          className={`hero-slide ${idx === currentIndex ? "active" : ""}`}
          style={{ backgroundImage: `url(${img})` }}
        >
          <div className="hero-content">
            <h1>Order with FastBite</h1>
            <h2>Delicious meals delivered fast – wherever you are</h2>

            <div className="search-container">
              <div className="location-input">
                <FaMapMarkerAlt className="input-icon" />
                <input
                  type="text"
                  placeholder="Enter your city in Nigeria"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              <div className="order-type">
                <select>
                  <option>Order Now</option>
                  <option>Schedule for Later</option>
                </select>
                <FaChevronDown className="dropdown-icon" />
              </div>

              <button className="search-btn" onClick={handleSearch}>
                <FaSearch /> Search Restaurants
              </button>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

export default HomeHero;
