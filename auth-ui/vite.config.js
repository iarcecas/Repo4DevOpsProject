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
        // './Auth': './src/Auth',
        './authRoutes': './src/routes',
        './apolloClient': './src/apollo'
      },
      shared: ['react', 'react-dom', 'react-router-dom', '@apollo/client', 'graphql']
    })
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  }
});