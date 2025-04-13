import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import client from './apollo';
import Signup from './components/Signup';
import Login from './components/Login';
import Logout from './components/Logout';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function AuthMicrofrontend() {
    const isLoggedIn = !!localStorage.getItem('authToken');

    return (
        <ApolloProvider client={client}>
             <Container>
                 <Navbar bg="light" expand="lg" className="mb-3">
                     <Container>
                         <Navbar.Brand href="#home">Auth Module</Navbar.Brand>
                         <Nav className="me-auto">
                            {!isLoggedIn && <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>}
                            {!isLoggedIn && <Nav.Link as={Link} to="/login">Login</Nav.Link>}
                         </Nav>
                         {isLoggedIn && <Logout />}
                     </Container>
                 </Navbar>

                <Routes>
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
             </Container>
        </ApolloProvider>
    );
}


export default AuthMicrofrontend; 