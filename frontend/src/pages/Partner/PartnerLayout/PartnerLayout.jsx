import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import PartnerNavbar from "../PartnerNavbar/PartnerNavbar";
import PartnerFooter from "../PartnerFooter/PartnerFooter";

export default function PartnerLayout() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      {/* Navbar gets the handler */}
      <PartnerNavbar onGetStartedClick={() => setShowForm(true)} />

      {/* Page content */}
      <Outlet context={{ setShowForm }} />

      <PartnerFooter />

      {/* ✅ Centralized modal form */}
      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-modal" onClick={() => setShowForm(false)}>
              &times;
            </span>
            <h2>Grow your orders, your customers and your brand</h2>
            <p>
              Already have an account? <a href="/login">Log in</a>
            </p>
            <div className="business-info-title">Business info</div>
            <form>
              <input type="text" placeholder="Business Name" />
              <input type="email" placeholder="Email Address" />
              <input type="text" placeholder="Phone Number" />
              <input type="text" placeholder="Business Address" />
              <button type="submit" className="apply-now">
                Apply Now
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}


