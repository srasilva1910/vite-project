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

      if (response.ok) {
        sessionStorage.setItem('auth-token', data.authtoken);
        navigate('/');
      } else {
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
    <div className="container">
      <div className="login-grid">
        <div className="login-text">
          <h2>Login</h2>
        </div>
        <div className="login-text">
          Are you a new member? <span><Link to="/signup" style={{ color: '#2190FF' }}>Sign Up Here</Link></span>
        </div>
        <br />
        <div className="login-form">
          {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" className="form-control" placeholder="Enter your email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" id="password" className="form-control" placeholder="Enter your password" value={formData.password} onChange={handleChange} required />
            </div>
            <div className="btn-group">
              <button type="submit" className="btn btn-primary">Login</button>
              <button type="button" className="btn btn-danger" onClick={handleReset}>Reset</button>
            </div>
            <br />
            <div className="login-text">
              Forgot Password?
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
