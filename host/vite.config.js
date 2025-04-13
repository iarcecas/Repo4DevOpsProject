import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'host_app',
      remotes: {
        auth_ui: 'http://localhost:5001/assets/remoteEntry.js',
        community_ui: 'http://localhost:5002/assets/remoteEntry.js', 
      },
      shared: ['react', 'react-dom', 'react-router-dom', '@apollo/client', 'graphql', 'react-bootstrap', 'bootstrap']
    })
  ],
   server: {
      port: 5000,
   },
    preview: {
        port: 5000,
    },
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  }
});