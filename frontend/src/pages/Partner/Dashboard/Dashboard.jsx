import React from "react";
import AddRestaurant from "../Dashboard/AddRestaurant/AddRestaurant";
import { Outlet, NavLink } from "react-router-dom";
// import DashboardOverlay from "./DashboardOverlay";
import "./Dashboard.css";


export default function Dashboard() {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  if (!userInfo) {
    return <p>You need to log in to access the dashboard.</p>;
  }

  if (userInfo.role !== "restaurant") {
    return <p>This page is only for restaurant owners.</p>;
  }

  return (
    <>
      <div className="dashboard">
        {/* Sidebar */}
        <aside className="sidebar">
          <h1 className="logo">FastBite</h1>
          <nav>
            <NavLink to="/partner/dashboard">🏠 Dashboard</NavLink>
            <NavLink to="/partner/dashboard/add">➕ Add Restaurant</NavLink>
            <NavLink to="/partner/dashboard/restaurants">🍴 My Restaurants</NavLink>
            <NavLink to="/partner/dashboard/orders">📦 Orders</NavLink>
          </nav>
          <button className="logout">🚪 Logout</button>
        </aside>

        {/* Main Content */}
        <main className="main main-wrapper">
          <h2 className="welcome">Welcome, {userInfo.name} 👋</h2>
          <p className="subtitle">Manage your restaurants here.</p>

        <Outlet />

        </main>
        
      </div>

      
    </>

  );
  
}

