import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import http from 'http';
import connectDB from './config/db.js';
import typeDefs from './graphql/typeDefs.js';
import resolvers from './graphql/resolvers.js';
import dotenv from 'dotenv';

dotenv.config();

const customResolvers = {
  ...resolvers,
};

async function startServer() {
  const app = express();
  const httpServer = http.createServer(app);

  connectDB();

  const server = new ApolloServer({
    typeDefs,
    resolvers: customResolvers,
  });

  await server.start();

  app.use(cors());
  app.use(express.json());
  app.use('/graphql', expressMiddleware(server));

  const PORT = process.env.PORT || 4002;
  httpServer.listen(PORT, () => {
    console.log(`Community Service running on http://localhost:${PORT}/graphql`);
  });
}

startServer();