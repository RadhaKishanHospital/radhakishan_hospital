import { defineConfig, loadEnv } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { expressApiPlugin } from './server/apiPlugin'

export default defineConfig(({ mode }) => {
  // Vite only exposes VITE_* variables to browser code by default, and does
  // not add .env values to process.env while this config is being evaluated.
  // The API plugin runs in Node, so explicitly load MONGODB_URI for local
  // development without exposing it to the client bundle.
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''))

  return {
    plugins: [
      expressApiPlugin(),
      react(),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        // Alias @ to the src directory
        '@': path.resolve(__dirname, './src'),
      },
    },

    build: {
      sourcemap: true,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router'],
            ui: ['@mui/material', '@mui/icons-material'],
          },
        },
      },
    },

    // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
    assetsInclude: ['**/*.svg', '**/*.csv'],
  }
})
