import React, { useState } from "react";
import "./CorporateGetStarted.css";
import FormModal from "./FormModal/FormModal";

const GetStarted = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="form-container">
        {/* Left Section */}
        <div className="form-left">
          <h1>Claim your free delivery today!</h1>
          <p>Fill out the form to reach us quickly. We’ll get back to you soon.</p>
        </div>

        {/* Right Section */}
        <div className="form-right">
          <textarea
            placeholder="Enter your email"
            className="form-textarea"
            rows="2"
          ></textarea>
          <textarea
            placeholder="Enter your location"
            className="form-textarea"
            rows="2"
          ></textarea>
          <button onClick={() => setIsModalOpen(true)}>Get Started</button>
        </div>
      </div>

      {/* Modal */}
      <FormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default GetStarted;
