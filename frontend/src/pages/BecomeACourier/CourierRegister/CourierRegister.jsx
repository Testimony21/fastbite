import React from "react";
import "./CourierRegister.css";
import { FaSearch } from "react-icons/fa";
import courierImage from "../../../assets/Images/fastbite-courier-login.jpg";

const statesInNigeria = [
    "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue",
    "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT - Abuja",
    "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara",
    "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau",
    "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara"
];

const RegisterForm = () => {
    const [searchTerm, setSearchTerm] = React.useState("");
    return (
        <div className="register-container">
            {/* Right side image */}
            <div className="register-image">
                <img src={courierImage} alt="Courier" />
            </div>

            {/* Left side form */}
            <div className="register-form">
                <h1 className="logo">🚚 Start your Journey</h1>

                <form>
                    <div className="form-group">
                        <label>First Name</label>
                        <input type="text" placeholder="Enter your first name" />
                    </div>

                    <div className="form-group">
                        <label>Last Name</label>
                        <input type="text" placeholder="Enter your last name" />
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" placeholder="Enter your email" />
                    </div>

                    <div className="form-group">
                        <label>Mobile Number</label>
                        <input type="tel" placeholder="Enter your mobile phone number" />
                    </div>

                    <div className="form-group">
                        <label>Select city or town</label>
                        <div className="search-input">
                            <FaSearch className="search-icon" />
                            <input
                                type="text"
                                placeholder="Search state..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            {searchTerm && (
                                <ul className="search-dropdown">
                                    {statesInNigeria
                                        .filter((state) =>
                                            state.toLowerCase().includes(searchTerm.toLowerCase())
                                        )
                                        .map((state, index) => (
                                            <li
                                                key={index}
                                                onClick={() => {
                                                    setSearchTerm(state);
                                                }}
                                            >
                                                {state}
                                            </li>
                                        ))}
                                </ul>
                            )}
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" placeholder="Enter your password" />
                    </div>

                    <div className="form-check">
                        <input type="checkbox" id="agreement" />
                        <label htmlFor="agreement">
                            Tick this box to confirm you have read and agree to comply with
                            the <a href="#">Courier Agreement</a>.
                        </label>
                    </div>

                    <button type="submit" className="btn-submit">
                        Create Account
                    </button>

                    <p className="login-text">
                        Already have an account? <a href="/login">Login here</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;
