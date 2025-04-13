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

   input UpdatePostInput {
    title: String
    content: String
    category: String
  }

  input CreateHelpRequestInput {
    author: ObjectId!
    description: String!
    location: String
  }

   input UpdateHelpRequestInput {
     description: String
     location: String
     isResolved: Boolean
   }

  type Query {
    getPosts(category: String): [CommunityPost]
    getPost(id: ID!): CommunityPost
    getHelpRequests(isResolved: Boolean): [HelpRequest]
    getHelpRequest(id: ID!): HelpRequest
  }

  type Mutation {
    createPost(input: CreatePostInput!): CommunityPost!
    updatePost(id: ID!, input: UpdatePostInput!): CommunityPost
    deletePost(id: ID!): String

    createHelpRequest(input: CreateHelpRequestInput!): HelpRequest!
    updateHelpRequest(id: ID!, input: UpdateHelpRequestInput!): HelpRequest
    volunteerForRequest(requestId: ID!, volunteerId: ObjectId!): HelpRequest
    resolveHelpRequest(id: ID!): HelpRequest
    deleteHelpRequest(id: ID!): String

  }
`;

export default typeDefs;