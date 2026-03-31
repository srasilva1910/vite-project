import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./Navbar.css";



const Navbar = () => {
    const [click, setClick] = useState(false);

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const[email,setEmail]=useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const handleClick = () => setClick(!click);

    
    const handleLogout = () => {
        sessionStorage.removeItem("auth-token");
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("phone");
        // remove email phone
        localStorage.removeItem("doctorData");
        setIsLoggedIn(false);
        // setUsername("");
       
        // Remove the reviewFormData from local storage
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key.startsWith("reviewFormData_")) {
            localStorage.removeItem(key);
          }
        }
        setEmail('');
        window.location.reload();
    }
    const handleDropdown = () => {
      setShowDropdown(!showDropdown);
    }

    
   useEffect(() => { 
  const token = sessionStorage.getItem("auth-token");

  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1])); 
      console.log("Decoded payload:", payload); // depuración
      setUsername(
  payload.user?.name || payload.name || payload.user?.email || payload.email || "Invitado"
);
setEmail(
  payload.user?.email || payload.email || ""
);
      setIsLoggedIn(true);
    } catch (err) {
      console.error("Error decoding token", err);
      setIsLoggedIn(false);
    }
  }
}, []);

  return (
    <nav>
      <div className="nav__logo">
        <Link to="/">
        StayHealthy <i style={{color:'#2190FF'}} className="fa fa-user-md"></i></Link>
        <span>.</span>
      </div>
      <div className="nav__icon" onClick={handleClick}>
        <i className={click ? "fa fa-times" : "fa fa-bars"}></i>
      </div>
      <ul className={click ? 'nav__links active' : 'nav__links'}>
        <li className="link">
          <Link to="/">Home</Link>
        </li>
        <li className="link">
          <Link to="/search/doctors">Appointments</Link>
        </li>
        <li className="link">
          <Link to="/healthblog">Health Blog</Link>
        </li>
        <li className="link">
         <Link to="/reviews">Reviews</Link>
        </li>
        {isLoggedIn ? (
  <>
    <li className="link">
      <span>Welcome, {username}!</span>
    </li>
    <li className="link">
      <button className="btn2" onClick={handleLogout}>
        Logout
      </button>
    </li>
  </>
) : (
  <>
    <li className="link">
      <Link to="/signup">
        <button className="btn1">Sign Up</button>
      </Link>
    </li>
    <li className="link">
      <Link to="/login">
        <button className="btn1">Login</button>
      </Link>
    </li>
  </>
)}

      </ul>
    </nav>
  );
};

export default Navbar;

