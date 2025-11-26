import "./HomeHero.css";
import { FaMapMarkerAlt, FaSearch } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import HeroImage1 from "../../assets/Images/fastbite-slide-image2.jpg";
import HeroImage2 from "../../assets/Images/fastbite-slide-image1.jpg";
import HeroImage3 from "../../assets/Images/fastbite3.jpg";
import { useLoading } from "../../Context/LoadingContext/LoadingContext"; // <-- global

function HomeHero() {
  const { setLoading } = useLoading(); // use global loading
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownRef = useRef(null);

  const cities = ["Umuahia", "Yola", "Uyo", "Awka", "Bauchi", "Yenegua", "Makurdi", "Maiduguri", "Calabar", "Asaba", "Abakiliki", "Benin City", "Ado Ekiti", "Enugu", "Gombe", "Owerri", "Dutse", "Kaduna", "Kano", "Katsina", "Birnin Kebbi", "Lokoja", "Ilorin", "Ikeja", "Lafia", "Minna", "Abeokuta", "Akure", "Osogbo", "Ibadan", "Jos", "Port harcourt", "Sokoto", "Jalingo", "Damaturu", "Dutse", "Abuja"
  ]

  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [HeroImage1, HeroImage2, HeroImage3];

  // Slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = () => {
    if (!location.trim()) {
      alert("Please enter your location");
      return;
    }

    setLoading(true); // turn on global loader
    setTimeout(() => {
      navigate(`/restaurants?location=${encodeURIComponent(location)}`);
      // setLoading(false) will be handled in RestaurantsPage when data is fetched
    }, 100); // small delay so loader shows
  };

  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredCities = cities.filter(city =>
    city.toLowerCase().includes(location.toLowerCase())
  );

  return (
    <section className="hero">
      {images.map((img, idx) => (
        <img
          key={idx}
          src={img}
          alt={`hero-img${idx}`}
          draggable="false"
          className={idx === currentIndex ? "active" : ""}
        />
      ))}

      <div className="hero-content">
        <h1>Order with FastBite</h1>
        <h2>Delicious meals delivered fast – wherever you are</h2>

        <div className="search-container">
          <div className="location-input" ref={dropdownRef}>
            <FaMapMarkerAlt className="input-icon" />
            <input
              type="text"
              placeholder="Enter your city in Nigeria"
              value={location}
              onClick={() => setShowDropdown(true)}
              onChange={(e) => setLocation(e.target.value)}
            />

            {showDropdown && filteredCities.length > 0 && (
              <ul className="full-dropdown">
                {filteredCities.map((city, i) => (
                  <li
                    key={i}
                    onClick={() => {
                      setLocation(city);
                      setShowDropdown(false);
                    }}
                  >
                    {city}
                  </li>
                ))}
              </ul>
            )}
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
