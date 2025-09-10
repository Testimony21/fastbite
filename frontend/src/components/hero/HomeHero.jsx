import './HomeHero.css';
import { FaMapMarkerAlt, FaChevronDown, FaSearch } from 'react-icons/fa';
import HeroImage from '../../assets/Images/fastbite3.jpg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function HomeHero() {
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!location.trim()) {
      alert("Please enter your location");
      return;
    }
    // Redirect to /restaurants page with query string
    navigate(`/restaurants?location=${encodeURIComponent(location)}`);
  };

  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Order with FastBite</h1>
        <h2>Delicious meals delivered fast – wherever you are</h2>

        <div className="search-container">
          <div className="location-input">
            <FaMapMarkerAlt className="input-icon" />
            <input
              type="text"
              placeholder="Enter your location"
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
    </section>
  );
}

export default HomeHero;
