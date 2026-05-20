import React from "react"; // Importing the necessary modules from React library
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Login from "../login/login";
import Signup from "../signup/signup";
import "./LandingPage.css"; // Importing the CSS styles for the Landing_Page component

// Defining the Function component Landing_Page
const Landing_Page = () => {
  return (
<section className="hero-section">
  <div className="container hero-content">

    <div className="hero-left">

      <span className="hero-badge">
        Modern Healthcare Platform
      </span>

      <h1>
        Healthcare
        <span className="text-gradient">
          Simplified
        </span>
      </h1>

      <p>
        Book appointments, connect with doctors,
        and manage your healthcare experience
        in one modern platform.
      </p>

      <div className="hero-buttons">
        <Link to="/find-doctor">
          <button className="primary-btn">
            Get Started
          </button>
        </Link>

        <button className="secondary-btn">
          Learn More
        </button>
      </div>

    </div>

    <div className="hero-right">

      <div className="hero-card">
        <h3>24/7 Consultation</h3>
        <p>Instant healthcare assistance anytime.</p>

        <div className="hero-buttons-left">
        <Link to="/instant-consultation">
          <button className="primary-btn">
            Urgent Attention
          </button>
        </Link>
        </div>


      </div>

    </div>

  </div>
</section>
  );
};

export default Landing_Page; // E
