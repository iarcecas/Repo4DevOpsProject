import CommunityPost from '../models/CommunityPost.js';
import HelpRequest from '../models/HelpRequest.js';
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
    getPost: async (_, { id }) => {
      return await CommunityPost.findById(id);
    },
    getHelpRequests: async (_, { isResolved }) => {
      const filter = typeof isResolved === 'boolean' ? { isResolved } : {};
      return await HelpRequest.find(filter).sort({ createdAt: -1 });
    },
    getHelpRequest: async (_, { id }) => {
      return await HelpRequest.findById(id);
    },
  },
  Mutation: {
    createPost: async (_, { input }) => {
      const newPost = new CommunityPost(input);
      await newPost.save();
      return newPost;
    },
     updatePost: async (_, { id, input }) => {
       return await CommunityPost.findByIdAndUpdate(id, input, { new: true });
     },
     deletePost: async (_, { id }) => {
       await CommunityPost.findByIdAndDelete(id);
       return "Post deleted successfully";
     },

    createHelpRequest: async (_, { input }) => {
      const newRequest = new HelpRequest(input);
      await newRequest.save();
      return newRequest;
    },
     updateHelpRequest: async (_, { id, input }) => {
       return await HelpRequest.findByIdAndUpdate(id, input, { new: true });
     },
    volunteerForRequest: async (_, { requestId, volunteerId }) => {
       return await HelpRequest.findByIdAndUpdate(
         requestId,
         { $addToSet: { volunteers: volunteerId } }, 
         { new: true }
       );
     },
    resolveHelpRequest: async (_, { id }) => {
      return await HelpRequest.findByIdAndUpdate(id, { isResolved: true }, { new: true });
    },
     deleteHelpRequest: async (_, { id }) => {
       await HelpRequest.findByIdAndDelete(id);
       return "Help request deleted successfully";
     },
  },
};

export default resolvers;