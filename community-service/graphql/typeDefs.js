import gql from 'graphql-tag';

const typeDefs = gql`
  scalar Date
  scalar ObjectId

  type CommunityPost {
    id: ID!
    author: ObjectId!
    title: String!
    content: String!
    category: String!
    aiSummary: String
    createdAt: Date!
    updatedAt: Date!
  }

  type HelpRequest {
    id: ID!
    author: ObjectId!
    description: String!
    location: String
    isResolved: Boolean!
    volunteers: [ObjectId]
    createdAt: Date!
    updatedAt: Date!
  }

  input CreatePostInput {
    author: ObjectId!
    title: String!
    content: String!
    category: String!
  }

  input CreateHelpRequestInput {
    author: ObjectId!
    description: String!
    location: String
  }

  type Query {
    getPosts(category: String): [CommunityPost]
  }

  type Mutation {
    createPost(input: CreatePostInput!): CommunityPost!
    createHelpRequest(input: CreateHelpRequestInput!): HelpRequest!
  }
`;

export default typeDefs;
