import express, { json } from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import { createServer } from 'http';
import connectDB from './config/db.js';
import typeDefs from './graphql/typeDefs.js';
import resolvers from './graphql/resolvers.js';
import dotenv from 'dotenv';
dotenv.config();

async function startServer() {
  const app = express();
  const httpServer = createServer(app);

  connectDB();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use(cors());
  app.use(json());
  app.use('/graphql', expressMiddleware(server));

  const PORT = process.env.PORT || 4001;
  httpServer.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Auth Service running on http://localhost:${PORT}/graphql`);
  });
}

startServer();