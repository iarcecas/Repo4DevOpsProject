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
      <Navbar bg="light" variant="light" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand as={Link} to="/">Community Micro-UI</Navbar.Brand>
          <Navbar.Toggle aria-controls="community-navbar-nav" />
          <Navbar.Collapse id="community-navbar-nav">
            <Nav className="me-auto">
               <Nav.Link as={Link} to="/posts">All Posts</Nav.Link>
               <Nav.Link as={Link} to="/posts/news">News</Nav.Link>
               <Nav.Link as={Link} to="/posts/discussion">Discussion</Nav.Link>
               <Nav.Link as={Link} to="/create-help-request">Create Help Request</Nav.Link>
                <Nav.Link as={Link} to="/help-requests">Help Requests</Nav.Link>

            </Nav>
            <Nav>
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
