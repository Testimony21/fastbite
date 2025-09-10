import React, { useState } from "react";
import { motion } from "framer-motion";
import "./BecomeRequirements.css";
import PhoneImage from "../../../assets/Images/fastbite-phone-delivery.png";

const Requirements = () => {
    const [showAlert, setShowAlert] = useState(false);

    const handleAlertToggle = () => {
        setShowAlert(!showAlert);
    };

    return (
        <section className="requirements-section">
            <div className="requirements-container">
                {/* Left Image with scroll animation */}
                <motion.div
                    className="requirements-image"
                    initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <img src={PhoneImage} alt="Delivery" />
                </motion.div>

                {/* Right Content with delayed scroll animation */}
                <motion.div
                    className="requirements-content"
                    initial={{ opacity: 0, x: 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <h2>What you'll need?</h2>
                    <ul>
                        <li>✔ Age 18+</li>
                        <li>✔ Smartphone - iOS or Android</li>
                        <li>
                            ✔ A moped, bike or car - plus licence and the correct insurance
                        </li>
                    </ul>

                    <p className="tips-link" onClick={handleAlertToggle}>
                        💡 Tips to speed up your application
                    </p>

                    <button className="apply-btn">Apply now</button>
                </motion.div>
            </div>

            {/* Alert Popup */}
            {showAlert && (
                <div className="alert-box" onClick={handleAlertToggle}>
                    <div
                        className="alert-content"
                        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
                    >
                        <span className="close-btn" onClick={handleAlertToggle}>
                            &times;
                        </span>
                        <h3>Grab these</h3>
                        <ul>
                            <li>Government-issued photo ID.</li>
                            <li>Details of your food delivery insurance.</li>
                            <li>Proof of work eligibility.</li>
                        </ul>
                        <h4>Important</h4>
                        <ul>
                            <li>
                                Enter your full name on your courier, and Sterling application, as
                                per your government ID.
                            </li>
                            <li>
                                Unfortunately, we are unable to accept your application if you have
                                a criminal record.
                            </li>
                            <li>
                                Refrain from creating duplicate accounts - doing so will result in
                                your application being cancelled.
                            </li>
                            <li>
                                By signing up to provide delivery services, you acknowledge your
                                status as an independent contractor, assuming responsibility for
                                your own tax returns and any expenses related to substitutes.
                            </li>
                        </ul>
                        <h4>Background check with Sterling</h4>
                        <ul>
                            <li>
                                Sterling run our background screening checks, look out for their
                                email - this may end up in your spam folder.
                            </li>
                            <li>
                                If you’re using your own check, ensure it's dated within the last 90
                                days.
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Requirements;
