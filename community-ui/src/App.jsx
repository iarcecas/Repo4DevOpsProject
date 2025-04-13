import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CommunityMicrofrontend from './Community';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
     <Router>
         <Routes>
             <Route path="/community/*" element={<CommunityMicrofrontend />} />
             <Route index element={<div>Community UI Standalone Home</div>} />
         </Routes>
     </Router>
  );
}

export default App;