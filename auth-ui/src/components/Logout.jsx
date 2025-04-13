import React from 'react';
import { LOGOUT_MUTATION } from '../graphql/mutations';
import Button from 'react-bootstrap/Button';
import client from '../apollo';

function Logout() {
  

  const handleLogout = async () => {
    try {
        localStorage.removeItem('authToken');
        await client.resetStore(); 
        console.log("Logged out successfully.");
         window.location.href = '/login';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <Button variant="outline-danger" onClick={handleLogout}>Logout</Button>
  );
}

export default Logout;