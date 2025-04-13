import React from 'react';
import PostList from './components/PostList';
import HelpRequestList from './components/HelpRequestList';
import CreatePost from './components/CreatePost';
import CreateHelpRequest from './components/CreateHelpRequest';

const communityNavItems = [
    { path: 'news', label: 'News', element: <PostList category="news" /> },
    { path: 'discussions', label: 'Discussions', element: <PostList category="discussion" /> },
    { path: 'help-requests', label: 'Help Requests', element: <HelpRequestList /> },
    { path: 'create-post', label: 'Create Post', element: <CreatePost />, requiresAuth: true },
    { path: 'create-help-request', label: 'Request Help', element: <CreateHelpRequest />, requiresAuth: true },
];

export default communityNavItems;