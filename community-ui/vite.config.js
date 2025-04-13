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
              // './Community': './src/Community.jsx',
              './communityRoutes': './src/routes',
              './apolloClient': './src/apollo'
          },
          remotes: {              
              auth_ui: "http://localhost:5001/assets/remoteEntry.js",
          },
           shared: ['react', 'react-dom', 'react-router-dom', '@apollo/client', 'graphql', 'react-bootstrap', 'bootstrap']
      })
  ],
  build: {
      modulePreload: false,
      target: 'esnext',
      minify: false,
      cssCodeSplit: false
  }
})