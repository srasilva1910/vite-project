import React from "react"; // Importing the necessary modules from React library
import Navbar from "../Navbar/Navbar";
import Login from "../login/login";
import Signup from "../signup/signup";
import "./LandingPage.css"; // Importing the CSS styles for the Landing_Page component

// Defining the Function component Landing_Page
const Landing_Page = () => {
  return (
    <section className="hero-section"> {/* Creating a section with class name 'hero-section' */}

      <div>
        <div data-aos="fade-up" className="flex-hero"> {/* Creating a div with data-aos attribute and class name 'flex-hero' */}
            
            <h1>
              Your Health<br/>

              <span className="text-gradient">
                
                Our Responsibility
              </span>
            </h1>
              <div className="blob-cont">
                  <div className="blue blob"></div>
              </div>
              <div className="blob-cont">
                  <div className="blue1 blob"></div>
              </div>
            <h4>
              Your health is your most valuable asset. StayHealthy helps you take care of it—one step at a time.
            </h4>
            <a href="/find-doctor"> {/* Creating a hyperlink to jump to the 'services' section */}
              <button className="button">Get Started</button>
            </a>
        </div>
      </div>
    </section>
  );
};

export default Landing_Page; // E
