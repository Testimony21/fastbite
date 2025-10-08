import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "./PartnerAuth.css";
import sampleImage from "../../../assets/Images/fastbite-image2.jpg";
import axios from "axios";
import { toast } from "react-toastify";

export default function PartnerAuth() {
  const location = useLocation();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user", // default role
  });
  const [error, setError] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    setIsLogin(location.pathname === "/login");
  }, [location.pathname]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // validate password match on signup
    if (!isLogin && form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      toast.error("Passwords do not match");
      return;
    }

    // build request body
    let formData = {
      email: form.email,
      password: form.password,
    };

    if (!isLogin) {
      formData = {
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
      };
    }

    try {
      const endpoint = isLogin ? "login" : "signup";
      const { data } = await axios.post(`${API_URL}/api/auth/${endpoint}`, formData);

      // store user data
      localStorage.setItem("userInfo", JSON.stringify(data));
      toast.success(isLogin ? "Login successful!" : "Account created successfully!");

      // redirect based on role
      if (data.role === "restaurant") {
        navigate("/partner-with-us");
      } else {
        navigate("/");
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Server error, please try again";
      console.error("Login/Signup error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Server error, please try again");

      toast.error(errorMessage);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        {/* Left side image */}
        <div className="auth-image">
          <img src={sampleImage} alt="Partner signup" />
        </div>

        {/* Right side form */}
        <div className="auth-form">
          <h2>{isLogin ? "Login" : "Create Account"}</h2>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                required
              />
            )}

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />

            {!isLogin && (
              <>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <select name="role" className="select" value={form.role} onChange={handleChange}>
                  <option value="user">User</option>
                  <option value="restaurant">Restaurant Owner</option>
                </select>
              </>
            )}

            {isLogin && (
              <div className="forgot-password">
                <NavLink to="/forgot-password" className="password">
                  Forgot Password?
                </NavLink>
              </div>
            )}

            <button type="submit" className="login-btn">
              {isLogin ? "Login" : "Create Account"}
            </button>
          </form>

          <hr />

          <h4>
            {isLogin
              ? "Don’t have an account yet?"
              : "Already have an account?"}
          </h4>

          <button
            className="create-account-btn"
            onClick={() => navigate(isLogin ? "/signup" : "/login")}
          >
            {isLogin ? "Create Account" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
}
