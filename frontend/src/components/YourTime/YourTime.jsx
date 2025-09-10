// src/components/YourTime.jsx

import './YourTime.css';
import { FaCheckCircle, FaHandshake, FaStar } from 'react-icons/fa';
import { IoMdGift } from 'react-icons/io';
import { MdCardGiftcard } from 'react-icons/md';
import { RiCustomerService2Fill } from 'react-icons/ri';
import { MdDevicesOther } from 'react-icons/md';
import { GiTakeMyMoney } from 'react-icons/gi';

const YourTime = () => {
  return (
    <section className="your-time-section">
      <div className="your-time-content">
        <h2 className="brand-name">FastBite</h2>
        <h1 className="section-title">Your time.</h1>

        <div className="your-time-items">

          {/* Loyalty Programs */}
          <div className="your-time-item">
            <IoMdGift className="section-icon" />
            <h2>Loyalty programs</h2>
            <p>
              <FaCheckCircle className="check-icon" />
              <a href="#">Receive stamps</a>, promotions, discounts, news, and more via our newsletters and social channels
            </p>
          </div>

          {/* Our Promise */}
          <div className="your-time-item">
            <FaHandshake className="section-icon" />
            <h2>Our promise</h2>
            <p>
              <FaCheckCircle className="check-icon" />
              Excellent service
            </p>
            <p>
              <FaCheckCircle className="check-icon" />
              Authentic user reviews
            </p>
          </div>

          {/* Your Benefits */}
          <div className="your-time-item">
            <FaStar className="section-icon" />
            <h2>Your benefits</h2>
            <p>
              <FaCheckCircle className="check-icon" />
              80,000+ places to choose from
            </p>
            <p>
              <FaCheckCircle className="check-icon" />
              Pay online or with cash
            </p>
            <p>
              <FaCheckCircle className="check-icon" />
              Order any time, anywhere, and on any device
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default YourTime;
