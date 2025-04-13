import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_HELP_REQUESTS } from '../graphql/queries';
import { VOLUNTEER_FOR_REQUEST, RESOLVE_HELP_REQUEST } from '../graphql/mutations';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import ListGroup from 'react-bootstrap/ListGroup';
import { jwtDecode } from 'jwt-decode';

// Added Help RequestList Story
function HelpRequestList() {
  const { loading, error, data, refetch } = useQuery(GET_HELP_REQUESTS, {
      variables: { isResolved: false }, 
      fetchPolicy: "network-only"
  });
  const [volunteerMutation] = useMutation(VOLUNTEER_FOR_REQUEST);
  const [resolveMutation] = useMutation(RESOLVE_HELP_REQUEST);

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


  const handleVolunteer = async (requestId) => {
      if (!currentUserId) {
          alert("You must be logged in to volunteer.");
          return;
      }
      try {
          await volunteerMutation({ variables: { requestId, volunteerId: currentUserId } });
          refetch();
      } catch (err) {
          console.error("Error volunteering:", err);
          alert(`Failed to volunteer: ${err.message}`);
      }
  };

  const handleResolve = async (requestId) => {
       if (!currentUserId) {
          alert("Authentication error.");
          return;
      }
       try {
          await resolveMutation({ variables: { id: requestId } });
          refetch(); 
      } catch (err) {
          console.error("Error resolving:", err);
          alert(`Failed to resolve: ${err.message}`);
      }
  };


  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">Error loading help requests: {error.message}</Alert>;

  const requests = data?.getHelpRequests || [];

  return (
    <div>
      <h3>Active Help Requests</h3>
      {requests.length === 0 ? (
        <p>No active help requests found.</p>
      ) : (
        requests.map(req => (
          <Card key={req.id} className="mb-3">
            <Card.Body>
              <Card.Title>Help Needed!</Card.Title>
              <Card.Text>{req.description}</Card.Text>
               {req.location && <Card.Subtitle className="mb-2 text-muted">Location: {req.location}</Card.Subtitle>}
               <ListGroup variant="flush">
                 <ListGroup.Item>Volunteers: {req.volunteers?.length || 0}</ListGroup.Item>
               </ListGroup>
               <div className="mt-2">
                 {!req.volunteers?.includes(currentUserId) && currentUserId && 
                     <Button variant="success" size="sm" className="me-2" onClick={() => handleVolunteer(req.id)}>Volunteer</Button>
                 }
                 {currentUserId &&
                    <Button variant="warning" size="sm" onClick={() => handleResolve(req.id)}>Mark as Resolved</Button>
                 }
               </div>
            </Card.Body>
             <Card.Footer className="text-muted">
               Posted on: {new Date(req.createdAt).toLocaleDateString()}
            </Card.Footer>
          </Card>
        ))
      )}
    </div>
  );
}

export default HelpRequestList;