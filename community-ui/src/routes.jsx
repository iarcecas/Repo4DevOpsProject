import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PostList from './components/PostList';
import CreatePost from './components/CreatePost';
// Working
function AppRoutes() {
  return (
    <Routes>
      <Route path="/posts" element={<PostList />} />
      <Route path="/posts/news" element={<PostList category="news" />} />
      <Route path="/posts/discussion" element={<PostList category="discussion" />} />
      <Route path="/post/create-post" element={<CreatePost />} />
      <Route path="/" element={<div>Community UI Home</div>} />
    
      {/* NEW ROUTES for AB#212 and AB#216 */}
      <Route path="/help-requests" element={<HelpRequestList />} />
      <Route path="/create-help-request" element={<CreateHelpRequest />} />
    </Routes>    
 
  );
}

export default AppRoutes;