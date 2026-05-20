import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';
import './login.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

          console.log("RESPUESTA:", data); // 👈

       if (response.ok && data.authtoken) {
        sessionStorage.setItem('auth-token', data.authtoken);

        // 👇 guardar datos
        sessionStorage.setItem('name', data.user.name);
        sessionStorage.setItem('email', data.user.email);

        // 👇 AVISAR AL NAVBAR
        window.dispatchEvent(new Event("storage"));

      console.log(data);
        navigate('/');
      } else {
              console.log("LOGIN ERROR"); // 👈

        setError(data.error || 'Invalid credentials. Please try again.');
      }
    } catch (err) {
      setError('Unable to connect to the server. Please try again later.');
    }
  };

  const handleReset = () => {
    setFormData({ email: '', password: '' });
    setError('');
  };

    return (
      <div className="auth-container">
        <div className="auth-card">

          <h2>Welcome Back 👋</h2>
          <p className="auth-subtext">
            New here? <Link to="/signup">Create an account</Link>
          </p>

          {error && <p className="auth-error">{error}</p>}

          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="auth-btn">
              Login
            </button>

            <button type="button" className="auth-btn secondary" onClick={handleReset}>
              Reset
            </button>

            <p className="auth-footer">Forgot password?</p>

          </form>
        </div>
      </div>
    );
};

export default Login;
