import React from 'react';
import { Link } from 'react-router-dom';
import AppRoutes from './routes'; 
import './App.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


function App() {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand as={Link} to="/">Auth Micro-UI</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
            </Nav>
            <Nav>
               <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
               <Nav.Link as={Link} to="/login">Login</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
         <AppRoutes />
      </Container>
    </>
  );
}

export default App;
