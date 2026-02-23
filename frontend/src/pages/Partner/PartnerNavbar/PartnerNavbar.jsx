import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/Images/main-fastbite-logo2.png";
import "./PartnerNavbar.css";

const PartnerNavbar = ({ onGetStartedClick }) => {
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

      <div className="actions">
        {userInfo?.token ? (
          <>
            <Link to="/partner/dashboard" className="login-btn">
              Dashboard
            </Link>
            <button className="login-btn" onClick={onGetStartedClick}>
              Get Started
            </button>
            <button onClick={handleSignOut} className="login-btn">
              Sign Out
            </button>
          </>
        ) : (
          <Link to="/login" className="login-btn">
            <FaUser className="user-icon" /> Login
          </Link>
        )}

      </div>
    </nav>
  );
};

export default PartnerNavbar;
