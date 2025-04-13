import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'auth_ui',
      filename: 'remoteEntry.js',
      exposes: {
        './Auth': './src/Auth.jsx',
        './authRoutes': './src/routes.jsx',
        './apolloClient': './src/apollo.js'
      },
      shared: ['react', 'react-dom', 'react-router-dom', '@apollo/client', 'graphql', 'react-bootstrap', 'bootstrap']
    })
  ],
  server: {
     port: 5001, 
  },
  preview: {
      port: 5001,
  },
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  }
});
