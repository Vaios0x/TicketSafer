import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy'
import { VitePWA } from 'vite-plugin-pwa'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  // Cargar variables de entorno según el modo
  const env = loadEnv(mode, process.cwd(), '')
  
  // Configuración base
  const config = {
    plugins: [
      // Plugin React optimizado con SWC para mejor performance
      react({
        // Habilitar SWC en desarrollo para HMR más rápido
        jsxRuntime: 'automatic',
        // Optimización para grandes componentes
        babel: {
          plugins: mode === 'development' ? [] : [
            ['@babel/plugin-transform-react-jsx', {
              runtime: 'automatic'
            }]
          ]
        }
      }),
      
      // Soporte para navegadores legacy
      legacy({
        targets: ['defaults', 'not IE 11', 'not op_mini all'],
        modernPolyfills: true,
        renderLegacyChunks: true
      }),
      
      // PWA optimizado para mejor caching
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg,gif,webp,woff,woff2}'],
          // Estrategias de cache optimizadas
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'google-fonts-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365 // 365 días
                }
              }
            },
            {
              urlPattern: /^https:\/\/images\.unsplash\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'images-cache',
                expiration: {
                  maxEntries: 60,
                  maxAgeSeconds: 60 * 60 * 24 * 30 // 30 días
                }
              }
            }
          ]
        },
        manifest: {
          name: 'TicketSafer - NFT Tickets Platform',
          short_name: 'TicketSafer',
          description: 'La primera plataforma multichain de tickets NFT con soporte para Ethereum, Polygon, Arbitrum y Optimism',
          theme_color: '#667eea',
          background_color: '#0f172a',
          display: 'standalone',
          orientation: 'portrait-primary',
          scope: '/',
          start_url: '/?utm_source=pwa',
          categories: ['entertainment', 'finance', 'business'],
          screenshots: [
            {
              src: '/assets/screenshot-wide.jpg',
              sizes: '1280x720',
              type: 'image/jpeg',
              form_factor: 'wide',
              label: 'TicketSafer Desktop View'
            },
            {
              src: '/assets/screenshot-narrow.jpg',
              sizes: '640x1136',
              type: 'image/jpeg',
              form_factor: 'narrow',
              label: 'TicketSafer Mobile View'
            }
          ],
          icons: [
            {
              src: '/ticket.svg',
              sizes: '192x192',
              type: 'image/svg+xml',
              purpose: 'any'
            },
            {
              src: '/ticket.svg',
              sizes: '512x512',
              type: 'image/svg+xml',
              purpose: 'any'
            },
            {
              src: '/ticket.svg',
              sizes: '192x192',
              type: 'image/svg+xml',
              purpose: 'maskable'
            }
          ]
        }
      })
    ],

    // Configuración de resolución de paths
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '@components': resolve(__dirname, 'src/components'),
        '@styles': resolve(__dirname, 'src/styles'),
        '@assets': resolve(__dirname, 'src/assets'),
        '@utils': resolve(__dirname, 'src/utils'),
        '@types': resolve(__dirname, 'src/types'),
        '@context': resolve(__dirname, 'src/context'),
        '@contracts': resolve(__dirname, 'src/contracts'),
        '@data': resolve(__dirname, 'src/data')
      }
    },

    // Configuración de build optimizada
    build: {
      // Target ES2022 para mejor tree-shaking
      target: 'es2022',
      
      // Optimización de chunks más granular
      rollupOptions: {
        output: {
          // Estrategia de chunking más eficiente
          manualChunks: (_id) => {
            // Separar node_modules por grupos lógicos
            if (_id.includes('node_modules')) {
              if (_id.includes('react') || _id.includes('react-dom')) {
                return 'react-vendor'
              }
              if (_id.includes('framer-motion')) {
                return 'animation-vendor'
              }
              if (_id.includes('react-icons')) {
                return 'icons-vendor'
              }
              if (_id.includes('react-router')) {
                return 'router-vendor'
              }
              if (_id.includes('@rainbow-me') || _id.includes('wagmi') || _id.includes('viem')) {
                return 'web3-vendor'
              }
              if (_id.includes('@tanstack')) {
                return 'query-vendor'
              }
              // Otros paquetes de node_modules
              return 'vendor'
            }
            
            // Separar componentes grandes por tipo
            if (_id.includes('/components/neural/')) {
              return 'neural-components'
            }
          },
          
          // Nombres de archivos con hash para cache busting
          assetFileNames: (assetInfo) => {
            const info = assetInfo.name.split('.')
            const ext = info[info.length - 1]
            if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(assetInfo.name)) {
              return `assets/images/[name]-[hash][extname]`
            }
            if (/\.(woff2?|eot|ttf|otf)$/i.test(assetInfo.name)) {
              return `assets/fonts/[name]-[hash][extname]`
            }
            if (ext === 'css') {
              return `assets/styles/[name]-[hash][extname]`
            }
            return `assets/[name]-[hash][extname]`
          },
          
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js'
        },
        
        // Optimizaciones adicionales
        external: (_id) => {
          // No externalizar nada para un bundle completo
          return false
        }
      },
      
      // Configuración de minificación
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: command === 'build' && mode === 'production',
          drop_debugger: true,
          pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.trace']
        },
        format: {
          comments: false
        }
      },
      
      // Configuración de sourcemaps
      sourcemap: mode === 'development' ? true : false,
      
      // Límites de warning ajustados
      chunkSizeWarningLimit: 1000,
      
      // Optimización de CSS
      cssCodeSplit: true,
      cssMinify: true
    },

    // Configuración del servidor de desarrollo
    server: {
      port: 3000,
      host: '0.0.0.0',
      open: true,
      strictPort: false,
      
      // HMR optimizado
      hmr: {
        overlay: true,
        port: 3001
      },
      
      // Proxy para APIs si es necesario
      proxy: {
        '/api': {
          target: env.VITE_API_URL || 'http://localhost:8000',
          changeOrigin: true,
          secure: false
        }
      },
      
      // Headers optimizados para Web3 y Coinbase Wallet
      headers: {
        'Cross-Origin-Embedder-Policy': 'credentialless',
        'Cross-Origin-Opener-Policy': 'same-origin-allow-popups'
      }
    },

    // Configuración de preview
    preview: {
      port: 4173,
      host: '0.0.0.0',
      open: true,
      strictPort: false
    },

    // Optimización de dependencias
    optimizeDeps: {
      esbuildOptions: {
        target: 'es2020'
      },
      include: [
        'react-map-gl',
        'mapbox-gl'
      ]
    },

    // Configuración de CSS
    css: {
      devSourcemap: true,
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/styles/variables.scss";`
        }
      }
    },

    // Variables de entorno para el cliente
    define: {
      __DEV__: mode === 'development',
      __PROD__: mode === 'production',
      'process.env.NODE_ENV': JSON.stringify(mode)
    },

    // Configuración experimental para mejor performance
    experimental: {
      // Habilitar características experimentales de Vite 6
      renderBuiltUrl: (filename, { hostType }) => {
        if (hostType === 'js') {
          return { js: `/${filename}` }
        } else {
          return `/${filename}`
        }
      }
    }
  }

  // Configuraciones específicas por modo
  if (command === 'serve') {
    // Configuración para desarrollo
    config.define = {
      ...config.define,
      global: 'globalThis'
    }
  } else {
    // Configuración para producción
    config.build.emptyOutDir = true
  }

  return config
})
