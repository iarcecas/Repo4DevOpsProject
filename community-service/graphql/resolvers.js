import CommunityPost from '../models/CommunityPost.js';
import mongoose from 'mongoose';
import { GraphQLScalarType, Kind } from 'graphql';

const resolvers = {
  ObjectId: new GraphQLScalarType({
    name: 'ObjectId',
    description: 'MongoDB ObjectId scalar type',
    parseValue(value) {
      return new mongoose.Types.ObjectId(value);
    },
    serialize(value) {
      return value.toString();
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.STRING) {
        return new mongoose.Types.ObjectId(ast.value);
      }
      return null;
    },
  }),

  Query: {
    getPosts: async (_, { category }) => {
      const filter = category ? { category } : {};
      return await CommunityPost.find(filter).sort({ createdAt: -1 });
    },
  },
  Mutation: {
    createPost: async (_, { input }) => {
      if (!input || !input.author || !input.title || !input.content || !input.category) {
          throw new Error("Missing required fields for creating a post.");
      }
      if (!['news', 'discussion'].includes(input.category)) {
          throw new Error("Invalid category specified for post.");
      }
      const newPost = new CommunityPost(input);
      await newPost.save();
      return newPost;
    },
  },
};

export default resolvers;
