import React from "react";
import AddRestaurant from "../../components/RestaurantCard/AddRestaurant";
import "./Dashboard.css"; // styled version

export default function Dashboard() {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  if (!userInfo) {
    return <p>You need to log in to access the dashboard.</p>;
  }

  if (userInfo.role !== "restaurant") {
    return <p>This page is only for restaurant owners.</p>;
  }

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <h1 className="logo">FastBite</h1>
        <nav>
          <a href="/partner/dashboard">🏠 Dashboard</a>
          <a href="/partner/dashboard/add">➕ Add Restaurant</a>
          <a href="/partner/dashboard/restaurants">🍴 My Restaurants</a>
          <a href="/partner/dashboard/orders">📦 Orders</a>
        </nav>
        <button className="logout">🚪 Logout</button>
      </aside>

      {/* Main Content */}
      <main className="main">
        <h2 className="welcome">Welcome, {userInfo.name} 👋</h2>
        <p className="subtitle">Manage your restaurants here.</p>

        {/* Add Restaurant Form */}
        <section className="add-restaurant">
          <h3>Add a New Restaurant</h3>
          <AddRestaurant />
        </section>
      </main>
    </div>
  );
}
