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

  input CreatePostInput {
    author: ObjectId!
    title: String!
    content: String!
    category: String!
  }

  type Query {
    getPosts(category: String): [CommunityPost] # <-- Add this line
  }

  type Mutation {
    createPost(input: CreatePostInput!): CommunityPost!
  }
`;

export default typeDefs;
