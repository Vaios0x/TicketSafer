import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    hmr: {
      port: 3002
    }
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'es2020'
    },
    include: ['react-map-gl', 'mapbox-gl']
  },
  resolve: {
    alias: {
      'react-map-gl': 'react-map-gl/mapbox'
    }
  }
}) 