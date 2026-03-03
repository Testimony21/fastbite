import React, { useEffect, useState } from "react";
import { FaUser, FaTimes, FaBars } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
// import logo from "../../../assets/Images/main-fastbite-logo2.png";
import logo from "../../../assets/Images/new-logo.png";
import "./PartnerNavbar.css";

const PartnerNavbar = ({ onGetStartedClick }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);

    // load user from localStorage
    const stored = localStorage.getItem("userInfo");
    setUserInfo(stored ? JSON.parse(stored) : null);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = () => {
    if (window.confirm("Are you sure you want to sign out?")) {
      localStorage.removeItem("userInfo");
      setUserInfo(null);
      navigate("/");
    }
  };

  return (
    <nav className={`partner-navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="logo">
        <Link to="/" className="logo-link">
          <img src={logo} alt="FastBite Logo" />
        </Link>
      </div>

      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      <div className={`actions ${menuOpen ? "open" : ""}`}>
        {userInfo?.token ? (
          <>
            <Link to="/partner/dashboard" className="dashboard-clk">
              Dashboard
            </Link>
            {/* <button onClick={onGetStartedClick}>
              Get Started
            </button> */}
            <button onClick={handleSignOut} className="log-btn">
              Sign Out
            </button>
          </>
        ) : (
          <Link to="/login" className="log-btn">
            <FaUser className="user-icon" /> Login
          </Link>
        )}

      </div>
    </nav>
  );
};

export default PartnerNavbar;
