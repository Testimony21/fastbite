// Footer.jsx
import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import "./Footer.css";

const PartnerFooter = () => {
  return (
    <footer className="partner-footer">
      {/* Left Links */}
      <div className="partner-footer-left">
        <a href="/about">About Us</a>
        <a href="/privacy">Privacy Policy</a>
        <a href="/cookies">Cookie Policy</a>
      </div>

      {/* Right Social Icons */}
      <div className="partner-footer-right">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebookF />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <FaTwitter />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <FaInstagram />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
          <FaLinkedinIn />
        </a>
      </div>
    </footer>
  );
};

export default PartnerFooter;
