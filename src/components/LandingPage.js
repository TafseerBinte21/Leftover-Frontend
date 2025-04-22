import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';
import axios from '../services/axios';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/login', {
        username,
        password,
      });

      // Check if login was successful
      if (response.data.msg === 'Login successful') {
        const userId = response.data.data.id;  // Assuming user data is inside 'data'

        // Store user ID in localStorage (or handle accordingly)
        localStorage.setItem('userId', userId);

        // Redirect to home/dashboard
        navigate('/home');
      } else {
        setError(response.data.msg || 'Login failed');
      }
    } catch (err) {
      console.error('Error during login:', err);
      setError('An error occurred while logging in.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-logo">Welcome to Leftover!</h1>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Log In</button>
        </form>
        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
        <p className="signup-link">
          New user?{' '}
          <span onClick={() => navigate('/signup')}>
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
