import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_HELP_REQUEST } from '../graphql/mutations';
import { GET_HELP_REQUESTS } from '../graphql/queries';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { jwtDecode } from 'jwt-decode';

function CreateHelpRequest() {
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [createHelpRequest, { loading, error }] = useMutation(CREATE_HELP_REQUEST, {
       refetchQueries: [{ query: GET_HELP_REQUESTS, variables: { isResolved: false } }],
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
         setMessage("You must be logged in to create a help request.");
         return;
    }

    try {
      await createHelpRequest({ variables: { input: { description, location, author: currentUserId } } });
      setMessage('Help request created successfully!');
      setDescription('');
      setLocation('');
    } catch (err) {
       console.error("Error creating help request:", err);
       setMessage(`Failed to create request: ${err.message}`);
    }
  };

   if (!currentUserId) {
     return <Alert variant="warning">Please log in to create help requests.</Alert>;
   }


  return (
    <div>
      <h3>Create Help Request</h3>
      {message && <Alert variant={error ? 'danger' : 'success'}>{message}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Location (Optional)</Form.Label>
          <Form.Control type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Request Help'}
        </Button>
      </Form>
    </div>
  );
}

export default CreateHelpRequest;