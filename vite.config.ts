import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import dotenv from 'dotenv';

export default defineConfig(({ mode, command }) => {
  // Load environment variables based on the current mode
  dotenv.config({ path: `.env.${mode}` });

  // Determine if the build is for production
  const isProd = command === 'build';

  return {
    // Set the base path for production; use root path for development
    base: isProd ? process.env.BASENAME || '/pokemon-poli' : '/',

    plugins: [
      react() // Enables React fast refresh and other optimizations
    ],

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"), // Simplifies import paths
      }
    },

    define: {
      'process.env.BASENAME': JSON.stringify(process.env.BASENAME || ''),
    },

    // Additional Vite configurations can be added here, e.g., server settings, build optimizations
  };
});
