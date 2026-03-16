import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';
import './signup.css';

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
    setError('');

    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        sessionStorage.setItem('auth-token', data.authtoken);
        navigate('/');
      } else {
        const errorMsg = data.error || (data.errors && data.errors.map(e => e.msg).join(', '));
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
    <div className="container" style={{ marginTop: '5%' }}>
      <div className="signup-grid">
        <div className="signup-text">
          <h1>Sign Up</h1>
        </div>
        <div className="signup-text1" style={{ textAlign: 'left' }}>
          Already a member? <span><Link to="/login" style={{ color: '#2190FF' }}>Login</Link></span>
        </div>
        <div className="signup-form">
          {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="role">Role</label>
              <select className="role" name="role" id="role" value={formData.role} onChange={handleChange}>
                <option value="doctor">Doctor</option>
                <option value="patient">Patient</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" name="name" id="name" required className="form-control" placeholder="Enter your name" value={formData.name} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input type="tel" name="phone" id="phone" required className="form-control" placeholder="Enter your phone number" value={formData.phone} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" required className="form-control" placeholder="Enter your email" value={formData.email} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" id="password" required className="form-control" placeholder="Enter your password" value={formData.password} onChange={handleChange} />
            </div>
            <div className="btn-group">
              <button type="submit" className="btn btn-primary">Submit</button>
              <button type="button" className="btn btn-danger" onClick={handleReset}>Reset</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
