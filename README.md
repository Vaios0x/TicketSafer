# 🎫 TicketSafer - NFT Tickets Multichain Platform

![TicketSafer Banner](https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=400&fit=crop&auto=format&q=80)

[![Vite](https://img.shields.io/badge/Vite-6.3.5-646CFF?style=for-the-badge&logo=vite)](https://vite.dev/)
[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.3-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.18.1-0055FF?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)
[![RainbowKit](https://img.shields.io/badge/RainbowKit-2.2.7-FF4785?style=for-the-badge)](https://www.rainbowkit.com/)

> **La primera plataforma multichain de tickets NFT con soporte para Ethereum, Polygon, Arbitrum y Optimism**

## ✨ Características Principales

### 🚀 **Performance Optimizada**
- **Vite 6.x** - Build tool ultrarrápido con HMR mejorado
- **Code Splitting** inteligente por rutas y componentes
- **Tree Shaking** optimizado para bundles más pequeños
- **PWA** con estrategias de cache avanzadas
- **Lazy Loading** para componentes y imágenes

### 🎨 **UI/UX Moderna**
- **Diseño Glassmorphism** con efectos de blur y transparencias
- **Animaciones Fluidas** con Framer Motion
- **Responsive Design** optimizado para todos los dispositivos
- **Dark Theme** nativo con gradientes personalizados
- **Componentes Reutilizables** con system design consistente

### 🔗 **Web3 Integration**
- **RainbowKit** para conexión de wallets
- **Wagmi** para interacciones blockchain
- **Soporte Multichain**: Ethereum, Polygon, Arbitrum, Optimism
- **React Query** para gestión de estado y cache
- **TypeScript** para type safety completo

### 🛠 **Developer Experience**
- **Hot Module Replacement** ultrarrápido
- **TypeScript** con strict mode y path mapping
- **ESLint** con reglas optimizadas para React
- **Error Boundaries** para manejo robusto de errores
- **Debugging Tools** integradas para desarrollo

## 📋 Prerequisitos

Asegúrate de tener instalado:

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0 (o yarn/pnpm equivalente)
- **Git** para clonar el repositorio

## 🚀 Instalación Rápida

```bash
# Clonar el repositorio
git clone https://github.com/ticketsafer/ticketsafer-site.git
cd ticketsafer-site/ticketsafer-site

# Instalar dependencias
npm install

# Copiar variables de entorno
cp env.example .env.local

# Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

## 🔧 Scripts Disponibles

### Desarrollo
```bash
# Servidor de desarrollo estándar
npm run dev

# Servidor con debug habilitado
npm run dev:debug

# Servidor accesible desde la red
npm run dev:network
```

### Build y Producción
```bash
# Build para producción
npm run build

# Build con análisis de bundle
npm run build:analyze

# Build para staging
npm run build:staging

# Preview del build
npm run preview
```

### Calidad de Código
```bash
# Linting
npm run lint
npm run lint:fix

# Type checking
npm run type-check

# Limpiar cache y reinstalar
npm run clean:install
```

## 📁 Estructura del Proyecto

```
ticketsafer-site/
├── 📁 public/                 # Assets estáticos
│   ├── 🖼️ assets/           # Imágenes y recursos
│   ├── 📄 manifest.json      # PWA manifest
│   └── 🎫 ticket.svg         # Logo principal
├── 📁 src/
│   ├── 📁 components/         # Componentes React
│   │   └── 📁 neural/        # Componentes principales
│   ├── 📁 context/           # React Context providers
│   ├── 📁 contracts/         # Smart contracts
│   ├── 📁 data/             # Data y configuraciones
│   ├── 📁 styles/           # Estilos CSS/SCSS
│   │   ├── 🎨 variables.scss # Variables globales
│   │   ├── 🔧 utilities.css  # Clases utilitarias
│   │   └── 📱 *.css         # Estilos de componentes
│   ├── 📁 types/            # TypeScript definitions
│   ├── 📁 utils/            # Utilidades y helpers
│   │   └── 📋 constants.js   # Constantes globales
│   ├── 🚀 App.jsx           # Componente principal
│   ├── 🎯 main.jsx          # Punto de entrada
│   └── 🎨 index.css         # Estilos globales
├── 📄 env.example            # Variables de entorno ejemplo
├── ⚙️ vite.config.js        # Configuración Vite
├── 🔧 package.json          # Dependencias y scripts
└── 📚 README.md             # Este archivo
```

## ⚙️ Configuración

### Variables de Entorno

Copia `env.example` a `.env.local` y configura:

```bash
# Configuración básica
VITE_APP_NAME="TicketSafer"
VITE_APP_URL="http://localhost:3000"

# Web3
VITE_WALLETCONNECT_PROJECT_ID="tu_project_id"

# APIs externas
VITE_API_URL="http://localhost:8000"
VITE_IMAGES_CDN_URL="https://images.unsplash.com"

# Features flags
VITE_ENABLE_PWA="true"
VITE_ENABLE_WEB3_FEATURES="true"
VITE_ENABLE_ANALYTICS="false"
```

### Configuración de Vite

El proyecto usa **Vite 6.x** con optimizaciones avanzadas:

- **Code Splitting** automático por rutas
- **Tree Shaking** para eliminación de código muerto
- **Asset Optimization** con hash para cache busting
- **PWA** con service worker automático
- **TypeScript** con resolución de paths
- **SCSS** con variables globales

## 🎨 Sistema de Diseño

### Colores Principales
```scss
$primary-color: #667eea;      // Azul principal
$secondary-color: #764ba2;    // Púrpura secundario
$success-color: #22c55e;      // Verde éxito
$error-color: #ef4444;        // Rojo error
```

### Componentes Principales

- **EventSearch** - Búsqueda y filtros avanzados
- **EventCard** - Tarjetas de eventos
- **NeuralNavbar** - Navegación principal
- **ConnectButton** - Conexión de wallet
- **TicketModal** - Modal de compra de tickets

### Efectos Glassmorphism
```css
.glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
```

## 🔗 Integración Web3

### Redes Soportadas

- **Ethereum** (Mainnet & Sepolia)
- **Polygon** (Mainnet & Amoy)
- **Arbitrum** (Mainnet & Sepolia)
- **Optimism** (Mainnet & Sepolia)
- **Base** (Sepolia)
- **Avalanche** (Fuji)

### Wallets Compatibles

- MetaMask
- WalletConnect
- Coinbase Wallet
- Rainbow Wallet
- Trust Wallet
- Y más...

## 📱 PWA Features

- **Instalable** en dispositivos móviles y desktop
- **Offline Support** con cache inteligente
- **Push Notifications** (próximamente)
- **Background Sync** para transacciones
- **App-like Experience** en todos los dispositivos

## 🚀 Performance

### Métricas de Performance
- **First Contentful Paint** < 1.5s
- **Largest Contentful Paint** < 2.5s
- **Time to Interactive** < 3.5s
- **Cumulative Layout Shift** < 0.1

### Optimizaciones Implementadas
- Code splitting por rutas
- Lazy loading de componentes
- Optimización de imágenes
- Minificación de CSS/JS
- Gzip compression
- Cache HTTP optimizado

## 🧪 Testing

```bash
# Ejecutar tests (configurar según necesidades)
npm run test

# Tests con coverage
npm run test:coverage

# Tests en modo watch
npm run test:watch
```

## 📦 Build y Deploy

### Build de Producción
```bash
npm run build
```

Genera archivos optimizados en `/dist`:
- Minificación automática
- Tree shaking
- Asset optimization
- Service worker para PWA

### Deploy
Compatible con:
- **Vercel** (recomendado)
- **Netlify**
- **GitHub Pages**
- **AWS S3 + CloudFront**
- **Firebase Hosting**

## 🐛 Debugging

### Logs de Desarrollo
```javascript
// Logs automáticos en desarrollo
if (__DEV__) {
  console.log('🔥 Hot reloading enabled');
}
```

### Error Boundaries
Captura automática de errores con reporting:
```javascript
// En producción, envía errores a Sentry
if (__PROD__) {
  // Integrar con servicio de monitoring
}
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Estándares de Código
- Usar **TypeScript** para nuevos componentes
- Seguir convenciones de **ESLint**
- Agregar **JSDoc** para funciones complejas
- Escribir **tests** para nuevas features
- Mantener **responsiveness** en todos los componentes

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 🔗 Enlaces Útiles

- **Documentación**: [docs.ticketsafer.com](https://docs.ticketsafer.com)
- **Demo Live**: [ticketsafer.com](https://ticketsafer.com)
- **Support**: [support.ticketsafer.com](https://support.ticketsafer.com)
- **Discord**: [discord.gg/ticketsafer](https://discord.gg/ticketsafer)
- **Twitter**: [@ticketsafer](https://twitter.com/ticketsafer)

## 🎯 Roadmap

### Q1 2024
- [ ] Implementación de NFT minting
- [ ] Integración con OpenSea
- [ ] Sistema de recompensas
- [ ] Mobile app (React Native)

### Q2 2024
- [ ] Layer 2 optimization
- [ ] Cross-chain bridges
- [ ] DAO governance
- [ ] Analytics dashboard

---

<div align="center">

**Hecho con ❤️ por el equipo TicketSafer**

[🌐 Website](https://ticketsafer.com) • [📖 Docs](https://docs.ticketsafer.com) • [💬 Discord](https://discord.gg/ticketsafer) • [🐦 Twitter](https://twitter.com/ticketsafer)

</div>
