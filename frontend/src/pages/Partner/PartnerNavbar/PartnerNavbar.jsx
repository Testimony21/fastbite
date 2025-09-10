import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
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
        <Link to="/" className="logo-link">FastBite</Link>
      </div>

      <div className="actions">
        {userInfo?.token ? (
          <>
            <Link to="/partner/dashboard" className="login-btn">
               Dashboard
            </Link>
        <button className="get-started-btn" onClick={onGetStartedClick}>
          Get Started
        </button>
        <button onClick={handleSignOut} className="login-btn">
              Sign Out
            </button>
          </>
        ) : (
          <button className="login-btn">
            <Link to = "/login">
            <FaUser className="user-icon" /> Login
            </Link>
          </button>
        )}

        
        
        {/* <button onClick={handleSignOut} className="login-btn">
              Sign Out
            </button> */}
      </div>
    </nav>
  );
};

export default PartnerNavbar;
