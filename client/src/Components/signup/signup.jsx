import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './signup.css';

const API_URL = "http://localhost:8181"

const Signup = () => {
  const [formData, setFormData] = useState({
    role: 'patient',
    name: '',
    phone: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    console.log("API_URL:", API_URL);

    const { name, email, password } = formData;

    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, role: formData.role, phone: formData.phone }),
});

    const data = await response.json();

    if (response.ok) {
      sessionStorage.setItem('auth-token', data.authtoken);
      sessionStorage.setItem('name', formData.name);
      sessionStorage.setItem('email', formData.email);
      navigate('/');
    } else {
      // Manejar errores que vienen como array u objeto
      let errorMsg = '';

      if (Array.isArray(data.error)) {
        errorMsg = data.error.map(e => e.msg).join(', ');
      } else if (data.error) {
        errorMsg = data.error;
      } else if (data.errors) {
        errorMsg = data.errors.map(e => e.msg).join(', ');
      }

      setError(errorMsg || 'Registration failed. Please try again.');
    }

  } catch (err) {
    setError('Unable to connect to the server. Please try again later.');
  }
};

  const handleReset = () => {
    setFormData({ role: 'patient', name: '', phone: '', email: '', password: '' });
    setError('');
  };

  return (
    <div className="auth-container">
      <div className="auth-card">

        <h2>Create Account 🚀</h2>
        <p className="auth-subtext">
          Already have an account? <Link to="/login">Login</Link>
        </p>

        {error && <p className="auth-error">{error}</p>}

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Role</label>
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="doctor">Doctor</option>
              <option value="patient">Patient</option>
            </select>
          </div>

          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input
              type="tel"
              name="phone"
              placeholder="Enter your phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

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
            Create Account
          </button>

          <button type="button" className="auth-btn secondary" onClick={handleReset}>
            Reset
          </button>

        </form>
      </div>
    </div>
  );
};

export default Signup;
