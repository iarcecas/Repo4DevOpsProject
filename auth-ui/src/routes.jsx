import React from 'react';
import Signup from './components/Signup';
import Login from './components/Login';

const authRoutes = [
    { path: '/signup', element: <Signup /> },
    { path: '/login', element: <Login /> }
];

export default authRoutes;