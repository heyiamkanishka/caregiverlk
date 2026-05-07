import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5180, // Unique port for Admin
    proxy: {
      '/api/caregivers': {
        target: 'http://localhost:5001',
        changeOrigin: true,
      },
      '/api/agencies': {
        target: 'http://localhost:5001',
        changeOrigin: true,
      },
      '/api/reviews': {
        target: 'http://localhost:5002',
        changeOrigin: true,
      },
    },
  },
})
