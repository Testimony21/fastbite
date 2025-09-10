import React from "react";
import { IoClose } from "react-icons/io5";
import "./FormModal.css";

const FormModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {/* Cancel Icon */}
        <button className="close-btn" onClick={onClose}>
          <IoClose size={24} />
        </button>

        {/* Heading */}
        <h2 className="modal-heading">Your first delivery is on us!</h2>

        {/* Subtext */}
        <p className="modal-subtext">
          Submit your details below and an account manager will be in touch shortly.
        </p>

        {/* Form */}
        <form className="modal-form">
          <textarea
            placeholder="Email"
            className="modal-input"
            rows="1"
          ></textarea>

          <textarea
            placeholder="Phone number"
            className="modal-input"
            rows="1"
          ></textarea>

          <div className="dropdown-wrapper">
            <select className="modal-input">
              <option value="">Order Size</option>
              <option value="small">Small (1-5 meals)</option>
              <option value="medium">Medium (6-15 meals)</option>
              <option value="large">Large (16-50 meals)</option>
              <option value="bulk">Bulk (50+ meals)</option>
            </select>
          </div>

          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>

        {/* Bottom Link */}
        <a href="#" className="modal-bottom-link">
          Looking to sell food with us?
        </a>
      </div>
    </div>
  );
};

export default FormModal;
