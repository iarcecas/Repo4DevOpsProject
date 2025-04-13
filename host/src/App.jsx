import React, { Suspense, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ApolloProvider } from '@apollo/client';

const authRoutesPromise = import('auth_ui/authRoutes');
const authApolloClientPromise = import('auth_ui/apolloClient');

const communityRoutesPromise = import('community_ui/communityRoutes');
const communityApolloClientPromise = import('community_ui/apolloClient');

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = !!localStorage.getItem('authToken');
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
};


function App() {
    const [authRoutesList, setAuthRoutesList] = useState([]);
    const [communityRoutesList, setCommunityRoutesList] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('authToken'));
    const [authClientInstance, setAuthClientInstance] = useState(null);
    const [communityClientInstance, setCommunityClientInstance] = useState(null);

     useEffect(() => {
         const checkLoginStatus = () => {
             setIsLoggedIn(!!localStorage.getItem('authToken'));
         };
         checkLoginStatus();
         window.addEventListener('storage', checkLoginStatus);
         const interval = setInterval(checkLoginStatus, 3000);

         return () => {
             window.removeEventListener('storage', checkLoginStatus);
             clearInterval(interval);
         };
     }, []);


     useEffect(() => {
      authRoutesPromise
        .then(module => setAuthRoutesList(module.default || []))
        .catch(err => console.error("Failed to load auth routes:", err));
      communityRoutesPromise
        .then(module => setCommunityRoutesList(module.default || []))
        .catch(err => console.error("Failed to load community routes:", err));

      authApolloClientPromise
          .then(module => setAuthClientInstance(module.default))
          .catch(err => console.error("Failed to load auth apollo client:", err));

      communityApolloClientPromise
          .then(module => setCommunityClientInstance(module.default))
          .catch(err => console.error("Failed to load community apollo client:", err));
     }, []);

   const handleLogout = () => {
        localStorage.removeItem('authToken');
        setIsLoggedIn(false);
        window.location.href = '/login';
   };

   if (!authClientInstance || !communityClientInstance) {
    return (
       <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
           <Spinner animation="border" role="status">
               <span className="visually-hidden">Loading Providers...</span>
           </Spinner>
       </div>
    );
   }

  return (
    <Router>
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand as={Link} to="/">Community Hub (Host)</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/community/">Community</Nav.Link>
            </Nav>
            <Nav>
              {!isLoggedIn && <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>}
              {!isLoggedIn && <Nav.Link as={Link} to="/login">Login</Nav.Link>}
              {isLoggedIn && <Nav.Link onClick={handleLogout} style={{color: 'rgba(255,255,255,.55)', cursor: 'pointer'}}>Logout</Nav.Link>}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
            <Suspense fallback={<Spinner animation="border" role="status"><span className="visually-hidden">Loading Module Routes...</span></Spinner>}>
                <Routes>
                    <Route index element={<div><h2>Welcome to the Community Hub!</h2><p>Select a section from the navigation.</p></div>} />

                    {authRoutesList.map(route => (
                        <Route
                            key={`auth-${route.path}`}
                            path={route.path} 
                            element={
                                <ApolloProvider client={authClientInstance}>
                                    {route.element}
                                </ApolloProvider>
                            }
                        />
                    ))}

                    {communityRoutesList.map(route => {
                        const Element = route.element;
                        const path = `/community${route.path === '/' ? '' : route.path}`;
                        return (
                            <Route
                                key={`community-${path}`}
                                path={path}
                                element={
                                    <ApolloProvider client={communityClientInstance}>
                                        {route.requiresAuth ? (
                                            <ProtectedRoute>{Element}</ProtectedRoute>
                                        ) : (
                                            Element
                                        )}
                                    </ApolloProvider>
                                }
                            />
                        );
                    })}
                    <Route path="*" element={<Alert variant="warning">Page Not Found in Host</Alert>} />
                </Routes>
            </Suspense>
        </Container>
    </Router>
  );
}

export default App;
