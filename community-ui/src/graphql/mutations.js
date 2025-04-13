import { gql } from '@apollo/client';

export const CREATE_POST = gql`
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      id
      title
      category
      createdAt
    }
  }
`;

export const CREATE_HELP_REQUEST = gql`
  mutation CreateHelpRequest($input: CreateHelpRequestInput!) {
    createHelpRequest(input: $input) {
      id
      description
      location
      createdAt
    }
  }
`;

export const VOLUNTEER_FOR_REQUEST = gql`
    mutation VolunteerForRequest($requestId: ID!, $volunteerId: ObjectId!) {
        volunteerForRequest(requestId: $requestId, volunteerId: $volunteerId) {
            id
            volunteers
        }
    }
`;

export const RESOLVE_HELP_REQUEST = gql`
    mutation ResolveHelpRequest($id: ID!) {
        resolveHelpRequest(id: $id) {
            id
            isResolved
        }
    }
`;