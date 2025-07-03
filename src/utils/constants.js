import { 
  FaTheaterMasks, FaMusic, FaFutbol, 
  FaPalette, FaUtensils, FaLaptop, 
  FaGraduationCap, FaHeartbeat, FaGamepad, 
  FaHandshake, FaTools, FaUsers, FaStar,
  FaGlassCheers, FaTicketAlt
} from 'react-icons/fa';

// ========================================
// CONSTANTES GLOBALES - TICKETSAFER
// ========================================

// ========================================
// CONFIGURACIÓN DE LA APLICACIÓN
// ========================================
export const APP_CONFIG = {
  name: import.meta.env.VITE_APP_NAME || 'TicketSafer',
  version: import.meta.env.VITE_APP_VERSION || '1.0.0',
  description: import.meta.env.VITE_APP_DESCRIPTION || 'La primera plataforma multichain de tickets NFT',
  url: import.meta.env.VITE_APP_URL || 'https://ticketsafer.com',
  
  // URLs importantes
  urls: {
    api: import.meta.env.VITE_API_URL || 'http://localhost:8000',
    cdn: import.meta.env.VITE_ASSETS_CDN_URL || '',
    images: import.meta.env.VITE_IMAGES_CDN_URL || 'https://images.unsplash.com',
    docs: 'https://docs.ticketsafer.com',
    support: 'https://support.ticketsafer.com',
    twitter: 'https://twitter.com/ticketsafer',
    discord: 'https://discord.gg/ticketsafer',
    github: 'https://github.com/ticketsafer'
  },

  // Feature flags
  features: {
    pwa: import.meta.env.VITE_ENABLE_PWA === 'true',
    web3: import.meta.env.VITE_ENABLE_WEB3_FEATURES === 'true',
    analytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
    experimental: import.meta.env.VITE_ENABLE_EXPERIMENTAL_FEATURES === 'true'
  }
};

// ========================================
// CONFIGURACIÓN WEB3
// ========================================
export const WEB3_CONFIG = {
  walletConnect: {
    projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || '705647bd297da3c2ea969a7940191475'
  },
  
  // Contratos principales
  contracts: {
    ethereum: import.meta.env.VITE_CONTRACT_ADDRESS_ETHEREUM,
    polygon: import.meta.env.VITE_CONTRACT_ADDRESS_POLYGON,
    arbitrum: import.meta.env.VITE_CONTRACT_ADDRESS_ARBITRUM,
    optimism: import.meta.env.VITE_CONTRACT_ADDRESS_OPTIMISM
  },

  // Chain IDs
  chainIds: {
    ethereum: 1,
    polygon: 137,
    arbitrum: 42161,
    optimism: 10,
    // Testnets
    sepolia: 11155111,
    polygonAmoy: 80002,
    arbitrumSepolia: 421614,
    optimismSepolia: 11155420,
    baseSepolia: 84532,
    avalancheFuji: 43113
  }
};

// ========================================
// CATEGORÍAS DE EVENTOS
// ========================================
export const EVENT_CATEGORIES = [
  {
    id: 'all',
    label: 'Todos',
    icon: FaTicketAlt,
    count: 156,
    description: 'Todos los eventos'
  },
  {
    id: 'music',
    label: 'Música',
    icon: FaMusic,
    count: 89,
    description: 'Conciertos y eventos musicales'
  },
  {
    id: 'sports',
    label: 'Deportes',
    icon: FaFutbol,
    count: 34,
    description: 'Eventos deportivos'
  },
  {
    id: 'theater',
    label: 'Teatro',
    icon: FaTheaterMasks,
    count: 23,
    description: 'Obras de teatro y espectáculos'
  },
  {
    id: 'festivals',
    label: 'Festivales',
    icon: FaGlassCheers,
    count: 12,
    description: 'Festivales y eventos especiales'
  },
  {
    id: 'concerts',
    label: 'Conciertos',
    icon: FaMusic,
    count: 45,
    description: 'Conciertos en vivo'
  },
  {
    id: 'corporate',
    label: 'Corporativos',
    icon: FaUsers,
    count: 28,
    description: 'Eventos corporativos y empresariales'
  },
  {
    id: 'conferences',
    label: 'Conferencias',
    icon: FaUsers,
    count: 35,
    description: 'Conferencias y seminarios'
  },
  {
    id: 'exhibitions',
    label: 'Exposiciones',
    icon: FaPalette,
    count: 19,
    description: 'Exposiciones y galerías'
  },
  {
    id: 'gastronomy',
    label: 'Gastronomía',
    icon: FaUtensils,
    count: 22,
    description: 'Eventos gastronómicos'
  },
  {
    id: 'technology',
    label: 'Tecnología',
    icon: FaLaptop,
    count: 31,
    description: 'Eventos de tecnología'
  },
  {
    id: 'education',
    label: 'Educación',
    icon: FaGraduationCap,
    count: 26,
    description: 'Eventos educativos'
  },
  {
    id: 'art',
    label: 'Arte y Cultura',
    icon: FaPalette,
    count: 33,
    description: 'Eventos culturales y artísticos'
  },
  {
    id: 'health',
    label: 'Salud',
    icon: FaHeartbeat,
    count: 17,
    description: 'Eventos de salud y bienestar'
  },
  {
    id: 'gaming',
    label: 'Gaming',
    icon: FaGamepad,
    count: 24,
    description: 'Eventos de videojuegos y eSports'
  },
  {
    id: 'networking',
    label: 'Networking',
    icon: FaHandshake,
    count: 29,
    description: 'Eventos de networking'
  },
  {
    id: 'workshops',
    label: 'Talleres',
    icon: FaTools,
    count: 21,
    description: 'Talleres y workshops'
  }
];

// ========================================
// UBICACIONES
// ========================================
export const LOCATIONS = [
  { 
    id: 'all', 
    label: 'Todas las ubicaciones', 
    icon: '🌍',
    description: 'Eventos en todas las ciudades'
  },
  { 
    id: 'cdmx', 
    label: 'Ciudad de México', 
    icon: '🏙️', 
    count: 78,
    coordinates: { lat: 19.4326, lng: -99.1332 }
  },
  { 
    id: 'guadalajara', 
    label: 'Guadalajara', 
    icon: '🌮', 
    count: 32,
    coordinates: { lat: 20.6597, lng: -103.3496 }
  },
  { 
    id: 'monterrey', 
    label: 'Monterrey', 
    icon: '🏔️', 
    count: 24,
    coordinates: { lat: 25.6866, lng: -100.3161 }
  },
  { 
    id: 'puebla', 
    label: 'Puebla', 
    icon: '⛪', 
    count: 15,
    coordinates: { lat: 19.0414, lng: -98.2063 }
  },
  { 
    id: 'cancun', 
    label: 'Cancún', 
    icon: '🏖️', 
    count: 7,
    coordinates: { lat: 21.1619, lng: -86.8515 }
  }
];

// ========================================
// RANGOS DE FECHAS
// ========================================
export const DATE_RANGES = [
  { 
    id: 'all', 
    label: 'Cualquier fecha', 
    icon: '📅',
    description: 'Eventos en cualquier fecha'
  },
  { 
    id: 'today', 
    label: 'Hoy', 
    icon: '🔥', 
    count: 5,
    description: 'Eventos que suceden hoy'
  },
  { 
    id: 'tomorrow', 
    label: 'Mañana', 
    icon: '⭐', 
    count: 8,
    description: 'Eventos de mañana'
  },
  { 
    id: 'this-week', 
    label: 'Esta semana', 
    icon: '📆', 
    count: 23,
    description: 'Eventos de esta semana'
  },
  { 
    id: 'this-weekend', 
    label: 'Este fin de semana', 
    icon: '🎉', 
    count: 12,
    description: 'Eventos del fin de semana'
  },
  { 
    id: 'next-week', 
    label: 'Próxima semana', 
    icon: '➡️', 
    count: 18,
    description: 'Eventos de la próxima semana'
  },
  { 
    id: 'this-month', 
    label: 'Este mes', 
    icon: '🗓️', 
    count: 67,
    description: 'Eventos de este mes'
  }
];

// ========================================
// RANGOS DE PRECIO
// ========================================
export const PRICE_RANGES = [
  { 
    id: 'all', 
    label: 'Cualquier precio', 
    icon: '💰',
    description: 'Eventos de cualquier precio'
  },
  { 
    id: 'free', 
    label: 'Gratis', 
    icon: '🆓', 
    count: 12,
    min: 0,
    max: 0,
    description: 'Eventos gratuitos'
  },
  { 
    id: '0-0.3', 
    label: '0 - 0.3 ETH', 
    icon: 'Ξ', 
    count: 34,
    min: 0,
    max: 0.3,
    description: 'Eventos económicos'
  },
  { 
    id: '0.3-0.7', 
    label: '0.3 - 0.7 ETH', 
    icon: 'Ξ', 
    count: 56,
    min: 0.3,
    max: 0.7,
    description: 'Precio medio'
  },
  { 
    id: '0.7-1.2', 
    label: '0.7 - 1.2 ETH', 
    icon: 'Ξ', 
    count: 32,
    min: 0.7,
    max: 1.2,
    description: 'Eventos premium'
  },
  { 
    id: '1.2+', 
    label: '1.2+ ETH', 
    icon: '💎', 
    count: 22,
    min: 1.2,
    max: null,
    description: 'Eventos de lujo'
  }
];

// ========================================
// OPCIONES DE ORDENAMIENTO
// ========================================
export const SORT_OPTIONS = [
  { 
    id: 'date', 
    label: 'Fecha', 
    icon: '📅', 
    desc: 'Más próximos primero',
    field: 'startDate',
    direction: 'asc'
  },
  { 
    id: 'price', 
    label: 'Precio', 
    icon: '💰', 
    desc: 'Menor a mayor',
    field: 'price',
    direction: 'asc'
  },
  { 
    id: 'popularity', 
    label: 'Popularidad', 
    icon: '❤️', 
    desc: 'Más populares',
    field: 'popularity',
    direction: 'desc'
  },
  { 
    id: 'name', 
    label: 'Nombre A-Z', 
    icon: '🔤', 
    desc: 'Orden alfabético',
    field: 'name',
    direction: 'asc'
  },
  { 
    id: 'distance', 
    label: 'Distancia', 
    icon: '📍', 
    desc: 'Más cercanos',
    field: 'distance',
    direction: 'asc'
  }
];

// ========================================
// CONFIGURACIÓN DE REDES SOCIALES
// ========================================
export const SOCIAL_NETWORKS = [
  {
    name: 'Twitter',
    icon: '🐦',
    url: 'https://twitter.com/ticketsafer',
    color: '#1DA1F2'
  },
  {
    name: 'Discord',
    icon: '💬',
    url: 'https://discord.gg/ticketsafer',
    color: '#5865F2'
  },
  {
    name: 'GitHub',
    icon: '🐙',
    url: 'https://github.com/ticketsafer',
    color: '#181717'
  },
  {
    name: 'Medium',
    icon: '📝',
    url: 'https://medium.com/@ticketsafer',
    color: '#00AB6C'
  }
];

// ========================================
// CONFIGURACIÓN DE PERFORMANCE
// ========================================
export const PERFORMANCE_CONFIG = {
  // Configuración de cache
  cache: {
    defaultStaleTime: 5 * 60 * 1000, // 5 minutos
    defaultCacheTime: 10 * 60 * 1000, // 10 minutos
    retryAttempts: 2
  },

  // Configuración de lazy loading
  lazyLoading: {
    rootMargin: '50px',
    threshold: 0.1
  },

  // Configuración de paginación
  pagination: {
    defaultPageSize: 12,
    maxPageSize: 50
  }
};

// ========================================
// MENSAJES DE ERROR Y ÉXITO
// ========================================
export const MESSAGES = {
  errors: {
    network: 'Error de conexión. Por favor, intenta de nuevo.',
    wallet: 'Error al conectar con la wallet. Verifica tu conexión.',
    transaction: 'Error en la transacción. Verifica los detalles.',
    notFound: 'No se encontraron resultados.',
    generic: 'Ha ocurrido un error inesperado.',
    validation: 'Por favor, verifica los datos ingresados.'
  },
  
  success: {
    walletConnected: '¡Wallet conectada exitosamente!',
    transactionSent: 'Transacción enviada correctamente.',
    ticketPurchased: '¡Ticket comprado exitosamente!',
    filterApplied: 'Filtros aplicados correctamente.',
    dataSaved: 'Datos guardados exitosamente.'
  },

  info: {
    connecting: 'Conectando...',
    loading: 'Cargando...',
    processing: 'Procesando...',
    searching: 'Buscando eventos...',
    noResults: 'No se encontraron eventos con los filtros seleccionados.'
  }
};

// ========================================
// CONSTANTES DE DESARROLLO
// ========================================
export const DEV_CONFIG = {
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
  debugMode: import.meta.env.VITE_DEBUG_MODE === 'true',
  
  // URLs de desarrollo
  devUrls: {
    api: 'http://localhost:8000',
    frontend: 'http://localhost:3000'
  }
};

// ========================================
// UTILIDADES DE FECHA
// ========================================
export const DATE_FORMATS = {
  shortDate: 'DD/MM/YYYY',
  longDate: 'dddd, DD [de] MMMM [de] YYYY',
  dateTime: 'DD/MM/YYYY HH:mm',
  time: 'HH:mm',
  iso: 'YYYY-MM-DDTHH:mm:ss.SSS[Z]'
};

// ========================================
// CONFIGURACIÓN DE ANALYTICS
// ========================================
export const ANALYTICS_CONFIG = {
  googleAnalytics: {
    trackingId: import.meta.env.VITE_GA_TRACKING_ID
  },
  hotjar: {
    siteId: import.meta.env.VITE_HOTJAR_ID
  },
  events: {
    pageView: 'page_view',
    search: 'search',
    filterApplied: 'filter_applied',
    ticketView: 'ticket_view',
    ticketPurchase: 'ticket_purchase',
    walletConnect: 'wallet_connect'
  }
};

// Exportar todo como default también para flexibilidad
export default {
  APP_CONFIG,
  WEB3_CONFIG,
  EVENT_CATEGORIES,
  LOCATIONS,
  DATE_RANGES,
  PRICE_RANGES,
  SORT_OPTIONS,
  SOCIAL_NETWORKS,
  PERFORMANCE_CONFIG,
  MESSAGES,
  DEV_CONFIG,
  DATE_FORMATS,
  ANALYTICS_CONFIG
}; 