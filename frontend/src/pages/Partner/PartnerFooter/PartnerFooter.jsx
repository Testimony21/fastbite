import React, { useState } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import logo from "../../../assets/Images/new-logo.png";
import "./PartnerFooter.css";

export default function Footer() {
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (key) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <footer className="footer">
      <div className="footer-glass">

        {/* BRAND */}
        <div className="footer-brand">
          <img src={logo} alt="FastBite Logo" className="footer-logo" />
          <p>Fast delivery. Fresh meals. Trusted restaurants.</p>
        </div>

        {/* GRID COLUMNS */}
        <div className="footer-grid">

          {/* COMPANY */}
          <div className="footer-col">
            <h4 onClick={() => toggleSection("company")}>Company</h4>
            <div className={`col-links ${openSections.company ? "open" : ""}`}>
              <a href="#">About</a>
              <a href="#">Careers</a>
              <a href="#">Blog</a>
              <a href="#">Contact</a>
            </div>
          </div>

          {/* SUPPORT */}
          <div className="footer-col">
            <h4 onClick={() => toggleSection("support")}>Support</h4>
            <div className={`col-links ${openSections.support ? "open" : ""}`}>
              <a href="#">Help Center</a>
              <a href="#">Safety</a>
              <a href="#">Terms</a>
              <a href="#">Privacy</a>
            </div>
          </div>

          {/* PARTNERS */}
          <div className="footer-col">
            <h4 onClick={() => toggleSection("partners")}>Partners</h4>
            <div className={`col-links ${openSections.partners ? "open" : ""}`}>
              <a href="#">Add Restaurant</a>
              <a href="#">Partner Support</a>
              <a href="#">Partner Login</a>
            </div>
          </div>

        </div>

        {/* BOTTOM */}
        <div className="footer-bottom">
          <div className="socials">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaLinkedinIn /></a>
          </div>
          <p>© {new Date().getFullYear()} FastBite. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
}