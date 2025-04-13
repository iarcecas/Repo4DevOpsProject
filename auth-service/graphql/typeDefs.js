import { gql } from 'graphql-tag'; 

const typeDefs = gql`
  scalar Date

  type User {
    id: ID!
    username: String!
    email: String!
    role: String!
    createdAt: Date!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    dummy: String
  }

  type Mutation {
    signup(username: String!, email: String!, password: String!, role: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    logout: String
  }
`;

export default typeDefs;