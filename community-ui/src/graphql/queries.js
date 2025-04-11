import { gql } from '@apollo/client';

export const GET_POSTS = gql`
  query GetPosts($category: String) {
    getPosts(category: $category) {
      id
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
      description
      location
      isResolved
      createdAt
    }
  }
`;
