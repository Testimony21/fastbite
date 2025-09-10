import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import "./Navbar.css";

// Default home links (guest user)
const defaultHomeLinks = [
  { label: "Become a courier", path: "/become-a-courier" },
  { label: "Partner with us", path: "/partner-with-us" },
  { label: "Log in", path: "/login" },
];

// Become courier links
const becomeLinks = [
  { label: "FAQs", path: "/become-a-courier#faqs" },
  { label: "Inside track", path: "/become-a-courier#inside-track" },
  { label: "Apply now", path: "/become-a-courier#apply" },
];

// Partner links
const partnerLinksGuest = [
  { label: "Login", path: "/login" },
  { label: "Get Started", path: "/get-started" },
];

const partnerLinksUser = [
  { label: "Dashboard", path: "/partner/dashboard" },
  { label: "Get Started", path: "/get-started" },
];

export default function Navbar({ overrideLinks, minimal = false }) {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname.toLowerCase();

  const [hasScrolled, setHasScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  // ✅ Always sync user from localStorage
  useEffect(() => {
      try {
        const stored = localStorage.getItem("userInfo");
        const parsed = stored ? JSON.parse(stored) : null;
        setUserInfo(parsed);
      } catch (err) {
        setUserInfo(null);
      }
    }, [location.pathname]);

    // syncUser();

    // listen for localStorage changes (cross-tab + consistency)
  //   window.addEventListener("storage", syncUser);
  //   return () => window.removeEventListener("storage", syncUser);
  // }, []);

  const handleSignOut = () => {
    const confirmLogout = window.confirm("Are you sure you want to sign out?");
    if (confirmLogout) {
      localStorage.removeItem("userInfo");
      setUserInfo(null);
      navigate("/"); // back to homepage
    }
  };

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setHasScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (minimal) {
    return (
      <nav className="navbar minimal">
        <div className="nav-left">
          <NavLink to="/" className="logo">FastBite</NavLink>
        </div>
      </nav>
    );
  }

  // --- Decide navbar links ---
  let links = defaultHomeLinks;
  let navType = "home";

  if (path.startsWith("/become-a-courier")) {
    links = becomeLinks;
    navType = "become";
  } else if (path.startsWith("/partner-with-us")) {
    if (userInfo?.token && userInfo.role === "restaurant") {
      links = [
        ...partnerLinksUser,
        { label: "Sign Out", action: handleSignOut },
      ];
    } else {
      links = partnerLinksGuest;
    }
    navType = "partner";
  } else if (path === "/" || path === "/home") {
    if (userInfo?.token) {
      links = [
        { label: "Become a courier", path: "/become-a-courier" },
        { label: "Partner with us", path: "/partner-with-us" },
        { label: "Sign Out", action: handleSignOut },
      ];
    } else {
      links = defaultHomeLinks;
    }
    navType = "home";
  }

  // Allow overrides
  if (overrideLinks && Array.isArray(overrideLinks)) {
    links = overrideLinks;
  }

  return (
    <nav className={`navbar ${navType} ${hasScrolled ? "scrolled" : ""}`}>
      <div className="nav-left">
        <NavLink to="/" className="logo">FastBite</NavLink>
      </div>

      {/* Hamburger menu toggle */}
      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        <FaBars />
      </div>

      {/* Navbar links */}
      <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
        {links.map((l, i) => (
          <li key={i} className={l.className || ""}>
            {l.action ? (
              <NavLink
                onClick={l.action}
                className="signout-btn"
              >
                {l.label}
              </NavLink>
            ) : (
              <NavLink
                to={l.path}
                className={({ isActive }) => (isActive ? "active" : "")}
                end={l.path === "/"}
                onClick={() => setMenuOpen(false)}
              >
                {l.label} {l.icon || null}
              </NavLink>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
