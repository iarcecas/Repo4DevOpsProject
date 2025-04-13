import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_POST } from '../graphql/mutations';
import { GET_POSTS } from '../graphql/queries';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { jwtDecode } from 'jwt-decode';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('news'); 
  const [createPost, { loading, error }] = useMutation(CREATE_POST, {
      refetchQueries: [{ query: GET_POSTS }],
       awaitRefetchQueries: true, 
  });
  const [message, setMessage] = useState('');

   const token = localStorage.getItem('authToken');
   let currentUserId = null;
   if (token) {
       try {
           const decodedToken = jwtDecode(token);
           currentUserId = decodedToken.userId;
       } catch (e) {
           console.error("Error decoding token:", e);
       }
   }


  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!currentUserId) {
        setMessage("You must be logged in to create a post.");
        return;
    }

    try {
      await createPost({ variables: { input: { title, content, category, author: currentUserId } } });
      setMessage('Post created successfully!');
      setTitle('');
      setContent('');
      setCategory('news');
    } catch (err) {
      console.error("Error creating post:", err);
      setMessage(`Failed to create post: ${err.message}`);
    }
  };

   if (!currentUserId) {
     return <Alert variant="warning">Please log in to create posts.</Alert>;
   }

  return (
    <div>
      <h3>Create New Post</h3>
       {message && <Alert variant={error ? 'danger' : 'success'}>{message}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Content</Form.Label>
          <Form.Control as="textarea" rows={3} value={content} onChange={(e) => setContent(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="news">News</option>
            <option value="discussion">Discussion</option>
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Post'}
        </Button>
      </Form>
    </div>
  );
}

export default CreatePost;