import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PostList from './components/PostList';
import CreatePost from './components/CreatePost';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/posts" element={<PostList />} />
      <Route path="/posts/news" element={<PostList category="news" />} />
      <Route path="/posts/discussion" element={<PostList category="discussion" />} />
      <Route path="/post/create-post" element={<CreatePost />} />
      <Route path="/" element={<div>Community UI Home</div>} />
    </Routes>
  );
}

export default AppRoutes;
