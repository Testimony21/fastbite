import React, { useState, useEffect, useContext } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaShoppingCart } from "react-icons/fa";
import { CartContext } from "../../Context/CartContext";
import "./Navbar.css";

const defaultHomeLinks = [
  { label: "Become a courier", path: "/become-a-courier" },
  { label: "Partner with us", path: "/partner-with-us" },
  { label: "Log in", path: "/login" },
];

const becomeLinks = [
  { label: "Inside track", path: "/become-a-courier#inside-track" },
  { label: "Apply now", path: "/courier-register" },
];

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

  // ✅ Use cart context properly inside component
  const { cart } = useContext(CartContext);

  const showCart =
    location.pathname.startsWith("/restaurants/") ||
    location.pathname === "/cart";

  // ✅ Load user info
  useEffect(() => {
    try {
      const stored = localStorage.getItem("userInfo");
      const parsed = stored ? JSON.parse(stored) : null;
      setUserInfo(parsed);
    } catch {
      setUserInfo(null);
    }
  }, [location.pathname]);

  // ✅ Handle scroll
  useEffect(() => {
    const handleScroll = () => setHasScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = () => {
    if (window.confirm("Are you sure you want to sign out?")) {
      localStorage.removeItem("userInfo");
      setUserInfo(null);
      navigate("/");
    }
  };

  // ✅ Determine links
  let links = defaultHomeLinks;
  let navType = "home";

  if (path.startsWith("/become-a-courier")) {
    links = becomeLinks;
    navType = "become";
  } else if (path.startsWith("/partner-with-us")) {
    links =
      userInfo?.token && userInfo.role === "restaurant"
        ? [...partnerLinksUser, { label: "Sign Out", action: handleSignOut }]
        : partnerLinksGuest;
    navType = "partner";
  } else if (path === "/" || path === "/home") {
    links = userInfo?.token
      ? [
          { label: "Become a courier", path: "/become-a-courier" },
          { label: "Partner with us", path: "/partner-with-us" },
          { label: "Sign Out", action: handleSignOut },
        ]
      : defaultHomeLinks;
    navType = "home";
  }

  if (overrideLinks && Array.isArray(overrideLinks)) links = overrideLinks;

  // ✅ Minimal Navbar (used on restaurant pages)
  if (minimal) {
    return (
      <nav className="navbar minimal">
        <div className="nav-left">
          <NavLink to="/" className="logo">
            FastBite
          </NavLink>
        </div>

        {showCart && (
          <div className="nav-right">
            <NavLink to="/cart" className="cart-link">
              <FaShoppingCart size={22} />
              <span className="cart-badge">{cart?.totalItems || 0}</span>
            </NavLink>
          </div>
        )}
      </nav>
    );
  }

  // ✅ Full Navbar
  return (
    <nav className={`navbar ${navType} ${hasScrolled ? "scrolled" : ""}`}>
      <div className="nav-left">
        <NavLink to="/" className="logo">
          FastBite
        </NavLink>
      </div>

      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        <FaBars />
      </div>

      <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
        {links.map((l, i) => (
          <li key={i}>
            {l.action ? (
              <NavLink onClick={l.action} className="signout-btn">
                {l.label}
              </NavLink>
            ) : (
              <NavLink
                to={l.path}
                className={({ isActive }) => (isActive ? "active" : "")}
                end={l.path === "/"}
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </NavLink>
            )}
          </li>
        ))}
      </ul>

      {showCart && (
        <div className="cart-icon-wrapper">
          <NavLink to="/cart" className="cart-link">
            <FaShoppingCart size={22} />
            <span className="cart-badge">{cart?.totalItems || 0}</span>
          </NavLink>
        </div>
      )}
    </nav>
  );
}
