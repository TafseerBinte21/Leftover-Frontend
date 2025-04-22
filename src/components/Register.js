import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/register.css'; // Reusing same style as login page
import axios from '../services/axios';

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    phone: '',
    email: '',
    address: '',
    gender: '',
    mobile: '',
    dob: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/save', formData);

      if (response.data.msg === 'User is saved successfully') {
        setSuccess('Registration successful! Redirecting...');
        setError('');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setError(response.data.msg || 'Registration failed');
        setSuccess('');
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong during signup.');
      setSuccess('');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-logo">Sign Up to Leftover!</h1>
        <form onSubmit={handleSignup}>
          <input name="firstName" placeholder="First Name" onChange={handleChange} required />
          <input name="lastName" placeholder="Last Name" onChange={handleChange} required />
          <input name="username" placeholder="Username" onChange={handleChange} required />
          <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
          <input name="phone" type="number" placeholder="Phone" onChange={handleChange} required />
          <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
          <input name="address" placeholder="Address" onChange={handleChange} required />
          <input name="gender" placeholder="Gender" onChange={handleChange} required />
          <input name="mobile" placeholder="Mobile (e.g. +880...)" onChange={handleChange} required />
          <input name="dob" type="date" placeholder="Date of Birth" onChange={handleChange} required />
          <button type="submit">Sign Up</button>
        </form>
        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
        {success && <p style={{ color: 'green', marginTop: '10px' }}>{success}</p>}
        <p className="signup-link">
          Already have an account?{' '}
          <span onClick={() => navigate('/')}>
            Log in
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
