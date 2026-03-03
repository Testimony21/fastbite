import React, { useState, useEffect, useContext } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaShoppingCart } from "react-icons/fa";
import { CartContext } from "../../Context/CartContext";
import { toast } from "react-toastify";
import { useLoading } from "../../Context/LoadingContext/LoadingContext";
import "./Navbar.css";
// import logo from "../../assets/Images/main-fastbite-logo2.png";
import logo from "../../assets/Images/new-logo.png";

const defaultHomeLinks = [
  { label: "Partner with us", path: "/partner-with-us" },
  { label: "Log in", path: "/login" },
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
  const { setLoading } = useLoading();
  const path = location.pathname.toLowerCase();

  const [hasScrolled, setHasScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const { cart } = useContext(CartContext);

  const showCart =
    location.pathname.startsWith("/restaurants/") || location.pathname === "/cart";

  // Load user info
  useEffect(() => {
    try {
      const stored = localStorage.getItem("userInfo");
      const parsed = stored ? JSON.parse(stored) : null;
      setUserInfo(parsed);
    } catch {
      setUserInfo(null);
    }
  }, [location.pathname]);

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => setHasScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = () => {
    toast.info(
      <div className="signout-toast">
        <p>Are you sure you want to sign out?</p>
        <div className="toast-buttons">
          <button
            className="toast-btn toast-ok"
            onClick={() => {
              localStorage.removeItem("userInfo");
              setUserInfo(null);
              toast.dismiss();
              toast.success("Signed out successfully!");
              navigate("/");
            }}
          >
            Okay
          </button>
        </div>
      </div>,
      { autoClose: false, icon: false }
    );
  };

  // Determine links
  let links = defaultHomeLinks;
  let navType = "home";

  if (path.startsWith("/partner-with-us")) {
    links =
      userInfo?.token && userInfo.role === "restaurant"
        ? [...partnerLinksUser, { label: "Sign Out", action: handleSignOut }]
        : partnerLinksGuest;
    navType = "partner";
  } else if (path === "/" || path === "/home") {
    links = userInfo?.token
      ? [
          { label: "Partner with us", path: "/partner-with-us" },
          { label: "Sign Out", action: handleSignOut },
        ]
      : defaultHomeLinks;
    navType = "home";
  }

  if (overrideLinks && Array.isArray(overrideLinks)) links = overrideLinks;

  // Minimal Navbar
  if (minimal) {
    return (
      <nav className="navbar minimal">
        <div className="nav-left">
          <NavLink to="/" className="logo">
            {/* FastBite */}
            <img src={logo} alt="FastBite Logo" />
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

  // Full Navbar
  const handleNavClick = async (link) => {
    if (link.action) return link.action();
    setLoading(true);
    navigate(link.path);
    setMenuOpen(false);
    setTimeout(() => setLoading(false), 300); // simulate loading
  };

  return (
    <nav className={`navbar ${navType} ${hasScrolled ? "scrolled" : ""}`}>
      <div className="nav-left">
        <NavLink to="/" className="logo">
          {/* FastBite */}
          <img src={logo} alt="FastBite Logo" />
        </NavLink>
      </div>

      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
        {links.map((l, i) => (
          <li key={i}>
            <NavLink
              to={l.path || "#"}
              onClick={() => handleNavClick(l)}
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
              end={l.path === "/"}
            >
              {l.label}
            </NavLink>
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
