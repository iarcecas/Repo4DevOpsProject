import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_POSTS } from '../graphql/queries';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';

function PostList({ category }) {
  const { loading, error, data } = useQuery(GET_POSTS, {
    variables: { category },
    fetchPolicy: "network-only",
  });

  if (loading)
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  if (error)
    return <Alert variant="danger">Error loading posts: {error.message}</Alert>;

  const posts = data?.getPosts || [];

  return (
    <div>
      <h3>
        {category
          ? category.charAt(0).toUpperCase() + category.slice(1)
          : 'All Posts'}
      </h3>
      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        posts.map((post) => (
          <Card key={post.id} className="mb-3">
            <Card.Body>
              <Card.Title>{post.title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Category: {post.category}
              </Card.Subtitle>
              <Card.Text>{post.content}</Card.Text>
              <Card.Footer className="text-muted">
                Posted on: {new Date(post.createdAt).toLocaleDateString()}
              </Card.Footer>
            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
}

export default PostList;