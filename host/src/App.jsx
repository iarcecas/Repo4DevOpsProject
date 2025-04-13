import React, { Suspense, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ApolloProvider } from '@apollo/client';

const AuthModule = React.lazy(() => import('auth_ui/Auth'));
const authRoutesPromise = import('auth_ui/authRoutes');
const authApolloClientPromise = import('auth_ui/apolloClient');

const CommunityModule = React.lazy(() => import('community_ui/Community'));
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
    const [authRoutes, setAuthRoutes] = useState([]);
    const [communityRoutes, setCommunityRoutes] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('authToken'));
    const [authClient, setAuthClient] = useState(null);
    const [communityClient, setCommunityClient] = useState(null);

     useEffect(() => {
         const handleStorageChange = () => {
             setIsLoggedIn(!!localStorage.getItem('authToken'));
         };
         window.addEventListener('storage', handleStorageChange);
         const interval = setInterval(() => {
            handleStorageChange();
         }, 1000);

         return () => {
             window.removeEventListener('storage', handleStorageChange);
             clearInterval(interval);
         };
     }, []);


     useEffect(() => {
      // Load Routes
      authRoutesPromise.then(module => setAuthRoutes(module.default || [])).catch(err => console.error("Failed to load auth routes", err));
      communityRoutesPromise.then(module => setCommunityRoutes(module.default || [])).catch(err => console.error("Failed to load community routes", err));

      // Load Apollo Clients
      authApolloClientPromise
          .then(module => setAuthClient(module.default))
          .catch(err => console.error("Failed to load auth apollo client", err));

      communityApolloClientPromise
          .then(module => setCommunityClient(module.default))
          .catch(err => console.error("Failed to load community apollo client", err));
  }, []);

   const handleLogout = () => {
        localStorage.removeItem('authToken');
        setIsLoggedIn(false);
         // Optional: Clear Apollo Cache if host uses Apollo too
         // client.resetStore();
        window.location.href = '/login'; 
   };

   if (!authClient || !communityClient) {
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
          <Navbar.Brand as={Link} to="/">Community Hub</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/community/news">Community</Nav.Link>
              {!isLoggedIn && <Nav.Link as={Link} to="/login">Login</Nav.Link>}
              {!isLoggedIn && <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>}
            </Nav>
            {isLoggedIn && <Nav.Link onClick={handleLogout} style={{color: 'rgba(255,255,255,.55)', cursor: 'pointer'}}>Logout</Nav.Link>}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
            <Suspense fallback={<Spinner animation="border" role="status"><span className="visually-hidden">Loading Module...</span></Spinner>}>
                <Routes>
                    <Route index element={<div><h2>Welcome to the Community Hub!</h2><p>Select a section from the navigation.</p></div>} />

                    {authRoutes.map(route => (
                        <Route
                            key={`auth-${route.path}`}
                            path={route.path}
                            element={
                                <ApolloProvider client={authClient}>
                                    {route.element}
                                </ApolloProvider>
                            }
                        />
                    ))}
                    
                    {communityRoutes.map(route => {
                        const Element = route.element;
                        const path = `/community/${route.path}`;
                        return (
                            <Route
                                key={`community-${path}`}
                                path={path}
                                element={
                                    <ApolloProvider client={communityClient}>
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
                    <Route path="*" element={<Alert variant="warning">Page Not Found</Alert>} />
                </Routes>
            </Suspense>
        </Container>
    </Router>
  );
}

export default App;