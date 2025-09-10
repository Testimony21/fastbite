import './HowToOrder.css';
import { FaMapMarkerAlt, FaUtensils, FaBell } from 'react-icons/fa';

function HowToOrder() {
  return (
    <section className="how-to-order">
      <h2>How to order</h2>
      <h1>It's as easy as this.</h1>

      <div className="steps">
        {/* Step 1 */}
        <div className="step">
          <FaMapMarkerAlt className="step-icon" />
          <p className="step-title">Tell us where you are</p>
          <p className="step-desc">We'll show you restaurants nearby<br />you can order from.</p>
        </div>

        {/* Step 2 */}
        <div className="step">
          <FaUtensils className="step-icon" />
          <p className="step-title">Find what you want</p>
          <p className="step-desc">Search for your favourite,<br />dishes.</p>
        </div>

        {/* Step 3 */}
        <div className="step">
          <FaBell className="step-icon" />
          <p className="step-title">Order for delivery or collection</p>
          <p className="step-desc">We'll update you on your<br />order's progress.</p>
        </div>
      </div>
    </section>
  );
}

export default HowToOrder;
