import React from 'react';
import PostList from './components/PostList';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/posts" element={<PostList />} />
      <Route path="/posts/news" element={<PostList category="news" />} />
      <Route path="/posts/discussion" element={<PostList category="discussion" />} />
      <Route path="/" element={<div>Community UI Home</div>} />
    </Routes>
  );
}

export default AppRoutes;

import HelpRequestList from './components/HelpRequestList';
import CreatePost from './components/CreatePost';
import CreateHelpRequest from './components/CreateHelpRequest';

const communityRoutes = [
    { path: 'news', element: <PostList category="news" /> },
    { path: 'discussions', element: <PostList category="discussion" /> },
    { path: 'help-requests', element: <HelpRequestList /> },
    { path: 'create-post', element: <CreatePost />, requiresAuth: true },
    { path: 'create-help-request', element: <CreateHelpRequest />, requiresAuth: true },
];

export default communityRoutes;