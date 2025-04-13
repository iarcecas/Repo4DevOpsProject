import { gql } from '@apollo/client';

export const GET_POSTS = gql`
  query GetPosts($category: String) {
    getPosts(category: $category) {
      id
      author
      title
      content
      category
      createdAt
    }
  }
`;

export const GET_HELP_REQUESTS = gql`
  query GetHelpRequests($isResolved: Boolean) {
    getHelpRequests(isResolved: $isResolved) {
      id
      author
      description
      location
      isResolved
      volunteers
      createdAt
    }
  }
`;