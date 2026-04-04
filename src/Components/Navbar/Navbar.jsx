import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [click, setClick] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const handleClick = () => setClick(!click);

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
  };

  useEffect(() => {
    const token = sessionStorage.getItem("auth-token");

    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));

        console.log("Decoded payload:", payload);

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
  }, []);

  return (
    <nav className="navbar">
  {/* LEFT */}
  <div className="nav__logo">
    <Link to="/">
      StayHealthy <i style={{ color: "#2190FF" }} className="fa fa-user-md"></i>
    </Link>
    <span>.</span>
  </div>

  {/* CENTER */}
  <ul className="nav__links">
    <li className="link"><Link to="/">Home</Link></li>
    <li className="link"><Link to="/search/doctors">Appointments</Link></li>
    <li className="link"><Link to="/healthblog">Health Blog</Link></li>
    <li className="link"><Link to="/reviews">Reviews</Link></li>
  </ul>

  {/* RIGHT */}
  <div className="nav__auth">
    {isLoggedIn ? (
      <>
        <span>Welcome, {username} 👋</span>
        <button className="btn2" onClick={handleLogout}>Logout</button>
      </>
    ) : (
      <>
        <Link to="/signup"><button className="btn1">Sign Up</button></Link>
        <Link to="/login"><button className="btn1">Login</button></Link>
      </>
    )}
  </div>
</nav>
  );
};

export default Navbar;
