import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<div>Auth UI Home - Please Login or Signup</div>} />
    </Routes>
  );
}

export default AppRoutes;
