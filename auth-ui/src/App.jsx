import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthMicrofrontend from './Auth'; // Import the main component
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
     <Router>
        <AuthMicrofrontend />
    </Router>
  );
}

export default App;