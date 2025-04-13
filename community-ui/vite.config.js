import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
      react(),
      federation({
          name: "community_ui",
          filename: "remoteEntry.js",
          exposes: {

  './Community': './src/Community.jsx',
  './communityRoutes': './src/routes.jsx',
  './apolloClient': './src/apollo.js',
},
          remotes: {              
              auth_ui: "http://localhost:5001/assets/remoteEntry.js",

          },
          shared: ['react', 'react-dom', 'react-router-dom', '@apollo/client', 'graphql', 'react-bootstrap', 'bootstrap']
      })
  ],
  server: {
     port: 5002,
  },
  preview: {
      port: 5002,
  },
  build: {
      modulePreload: false,
      target: 'esnext',
      minify: false,
      cssCodeSplit: false
  }
})
