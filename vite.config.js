import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Optimización adicional para React
      include: "**/*.{jsx,tsx}",
      babel: {
        plugins: [
          // Plugin para optimizar re-renders
          ["@babel/plugin-transform-react-jsx-development", { development: false }]
        ]
      }
    }),
    legacy({
      targets: ['defaults', 'not IE 11'],
      // Mejorar polyfills para mejor compatibilidad
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
      renderLegacyChunks: true,
      polyfills: [
        'es.symbol',
        'es.array.filter',
        'es.promise',
        'es.promise.finally'
      ]
    }),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg,gif,webp}'],
        // Mejorar estrategia de cache
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/images\.unsplash\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'unsplash-images',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 año
              }
            }
          }
        ]
      },
      manifest: {
        name: 'TicketSafer - NFT Tickets Platform',
        short_name: 'TicketSafer',
        description: 'La primera plataforma multichain de tickets NFT',
        theme_color: '#667eea',
        background_color: '#0f172a',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: '/ticket.svg',
            sizes: '192x192',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          },
          {
            src: '/ticket.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          }
        ],
        // Capacidades adicionales PWA
        categories: ['finance', 'entertainment', 'utilities'],
        lang: 'es',
        dir: 'ltr'
      }
    })
  ],
  // Configuración de resolución mejorada
  resolve: {
    alias: {
      '@': new URL('./src', import.meta.url).pathname,
      '@components': new URL('./src/components', import.meta.url).pathname,
      '@styles': new URL('./src/styles', import.meta.url).pathname,
      '@assets': new URL('./src/assets', import.meta.url).pathname
    }
  },
  build: {
    // Target moderno para mejor optimización
    target: 'esnext',
    // Optimización para chunks más pequeños
    rollupOptions: {
      output: {
        manualChunks: {
          // Separar las librerías grandes en chunks propios
          'react-vendor': ['react', 'react-dom'],
          'motion-vendor': ['framer-motion'],
          'icons-vendor': ['react-icons'],
          'router-vendor': ['react-router-dom'],
          'web3-vendor': ['@rainbow-me/rainbowkit', 'wagmi', 'viem'],
          'query-vendor': ['@tanstack/react-query']
        }
      }
    },
    // Límite de warning para chunks grandes
    chunkSizeWarningLimit: 1000,
    // Optimización de CSS
    cssCodeSplit: true,
    // Sourcemaps para debugging en producción
    sourcemap: false,
    // Minificación mejorada
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  server: {
    // Puerto personalizado para desarrollo
    port: 3000,
    // Abrir automáticamente en el navegador
    open: true,
    // Hot Module Replacement mejorado
    hmr: {
      overlay: true,
      port: 24678
    },
    // CORS configurado para Web3
    cors: true,
    // Proxy para APIs si es necesario
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  preview: {
    port: 4173,
    open: true,
    cors: true
  },
  // Optimizar dependencias
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'framer-motion',
      'react-icons',
      'react-router-dom',
      '@rainbow-me/rainbowkit',
      'wagmi',
      'viem',
      '@tanstack/react-query'
    ],
    // Excluir dependencias problemáticas
    exclude: ['@vite/client', '@vite/env']
  },
  // Configuración CSS mejorada
  css: {
    devSourcemap: true,
    preprocessorOptions: {
      css: {
        charset: false
      }
    }
  },
  // Variables de entorno
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    __BUILD_TIME__: JSON.stringify(new Date().toISOString())
  },
  // Configuración de performance
  esbuild: {
    // Optimización para desarrollo
    logOverride: { 'this-is-undefined-in-esm': 'silent' }
  }
}) 