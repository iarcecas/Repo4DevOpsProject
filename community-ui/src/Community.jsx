import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import client from './apollo';
import PostList from './components/PostList';
import HelpRequestList from './components/HelpRequestList';
import CreatePost from './components/CreatePost';
import CreateHelpRequest from './components/CreateHelpRequest';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';

function CommunityMicrofrontend() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('authToken'));

  useEffect(() => {
    console.log('Community.jsx: useEffect triggered'); 

    const checkLoginStatus = () => {
      const token = localStorage.getItem('authToken');
      console.log('Community.jsx: Checking token in interval/event. Found:', token ? 'Yes' : 'No');
      const newState = !!token;
      setIsLoggedIn(prevState => {
          if (prevState !== newState) {
              console.log(`Community.jsx: Login state changing from ${prevState} to ${newState}`);
              return newState;
          }
          return prevState;
      });
    };

    checkLoginStatus();

    window.addEventListener('storage', checkLoginStatus);

    const interval = setInterval(checkLoginStatus, 2000);

    return () => {
      console.log('Community.jsx: Cleaning up effect'); 
      window.removeEventListener('storage', checkLoginStatus);
      clearInterval(interval);
    };
  }, []); 

  console.log('Community.jsx: Rendering with isLoggedIn =', isLoggedIn);

  return (
    <ApolloProvider client={client}>
      <Container>
         <Nav variant="tabs" defaultActiveKey="/community/news" className="mb-3">
              <Nav.Item>
                <Nav.Link as={Link} to="news">News</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="discussions">Discussions</Nav.Link> 
              </Nav.Item>
               <Nav.Item>
                <Nav.Link as={Link} to="help-requests">Help Requests</Nav.Link> 
              </Nav.Item>
              {isLoggedIn && (
                 <Nav.Item>
                    <Nav.Link as={Link} to="create-post">Create Post</Nav.Link> 
                 </Nav.Item>
              )}
               {isLoggedIn && (
                 <Nav.Item>
                    <Nav.Link as={Link} to="create-help-request">Request Help</Nav.Link>
                 </Nav.Item>
              )}
            </Nav>        
        <Routes>
          <Route path="news" element={<PostList category="news" />} />
          <Route path="discussions" element={<PostList category="discussion" />} />
          <Route path="help-requests" element={<HelpRequestList />} />           
           {isLoggedIn && <Route path="create-post" element={<CreatePost />} />}
           {isLoggedIn && <Route path="create-help-request" element={<CreateHelpRequest />} />}                      
        </Routes>
      </Container>
    </ApolloProvider>
  );
}

export default CommunityMicrofrontend;