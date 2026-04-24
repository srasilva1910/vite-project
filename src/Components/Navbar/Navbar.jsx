import React, { useEffect, useState, useRef } from "react";

import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [click, setClick] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  const handleClick = () => setClick(!click);
  
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("auth-token");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("phone");

    localStorage.removeItem("doctorData");

    // limpiar datos dinámicos
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("reviewFormData_")) {
        localStorage.removeItem(key);
      }
    });

    // 👇 actualizar estado SIN recargar
    setIsLoggedIn(false);
    setUsername("");
    setEmail("");
    
    navigate("/");

  };

useEffect(() => {
  const loadUser = () => {
    const token = sessionStorage.getItem("auth-token");

    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));

        const name =
          payload.user?.name ||
          payload.name ||
          payload.user?.email ||
          payload.email ||
          "Invitado";

        const userEmail =
          payload.user?.email ||
          payload.email ||
          "";

        setUsername(name);
        setEmail(userEmail);
        setIsLoggedIn(true);
      } catch (err) {
        console.error("Error decoding token", err);
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }
  };

  loadUser();

  // 👇 escuchar cambios (login/logout en otras partes)
  window.addEventListener("storage", loadUser);

  return () => {
    window.removeEventListener("storage", loadUser);
  };
}, []);

useEffect(() => {
  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);


  return (
    <nav className="navbar">
  {/* LEFT */}
  <div className="nav__logo">
    <Link to="/">
      StayHealthy <i style={{ color: "#2190FF" }} className="fa fa-user-md"></i>
    </Link>
  </div>

  {/* CENTER */}
  <ul className="nav__links">
    <li className="link"><Link to="/">Home</Link></li>
    <li className="link"><Link to="/instant-consultation">Instant Consultation</Link></li>
    <li className="link"><Link to="/find-doctor">Appointments</Link></li>
    <li className="link"><Link to="/healthblog">Health Blog</Link></li>
    <li className="link"><Link to="/reviewspage">Reviews</Link></li>
  </ul>

  {/* RIGHT */}
<div className="nav__auth">
  {isLoggedIn ? (
<div className="profile-menu" ref={menuRef}>
    <span className="welcome" onClick={() => setOpen(!open)}>
    👤 <strong>{username}</strong>
  </span>

  {open && (
    <div className="dropdown">
      <Link to="/profile">
        <div>👤 Profile</div>
      </Link>

      <Link to="/reports">
        <div>📄 My Reports</div>
      </Link>

      <div className="divider"></div>

      <div onClick={handleLogout}>
        🚪 Logout
      </div>
    </div>
  )}    
  </div>
  ) : (
    <>
      <Link to="/signup">
        <button className="btn1">Sign Up</button>
      </Link>
      <Link to="/login">
        <button className="btn1">Login</button>
      </Link>
    </>
  )}
</div>
</nav>
  );
};

export default Navbar;
