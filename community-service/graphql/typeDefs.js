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
    dummyCommunityQuery: String
  }

  type Mutation {
    createPost(input: CreatePostInput!): CommunityPost!
  }
`;

export default typeDefs;
