import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Register from './components/Register';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
    <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;
