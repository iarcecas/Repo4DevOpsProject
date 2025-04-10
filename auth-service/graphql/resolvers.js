import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const resolvers = {
  Query: {
     dummyAuthQuery: () => "Auth service dummy query successful."
  },
  Mutation: {
    signup: async (_, { username, email, password, role }) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error('User already exists with that email.');
      }
       const existingUsername = await User.findOne({ username });
       if (existingUsername) {
         throw new Error('Username is already taken.');
       }
      if (!['resident', 'business_owner', 'community_organizer'].includes(role)) {
         throw new Error('Invalid role specified.');
      }
      const user = new User({ username, email, password, role });
      await user.save();
      const token = jwt.sign(
        { userId: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
      return { token, user };
    },

    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('Invalid credentials.');
      }

      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        throw new Error('Invalid credentials.');
      }

      const token = jwt.sign(
        { userId: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      return { token, user };
    },    

    // --- logout resolver will be added later ---

  },
};

export default resolvers;
