import {
  getDefaultConfig,
  midnightTheme,
  darkTheme,
  lightTheme
} from '@rainbow-me/rainbowkit';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  sepolia,
  arbitrumSepolia,
  optimismSepolia,
  baseSepolia,
  polygonAmoy,
  avalancheFuji
} from 'wagmi/chains';

// ========================================
// CONFIGURACIÓN DE CHAINS
// ========================================

// Configuración de chains para desarrollo
const developmentChains = [
  sepolia,
  arbitrumSepolia,
  optimismSepolia,
  baseSepolia,
  polygonAmoy,
  avalancheFuji
];

// Configuración de chains para producción
const productionChains = [
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base
];

// Chains principales según el entorno
export const getChains = () => {
  const isProduction = import.meta.env.PROD;
  return isProduction ? productionChains : developmentChains;
};

// ========================================
// CONFIGURACIÓN DE WALLETS
// ========================================

export const walletConfig = [
  {
    groupName: 'Recomendadas',
    wallets: ['rainbow', 'metamask', 'coinbase', 'walletconnect'],
  },
  {
    groupName: 'Móviles',
    wallets: ['trust', 'metamask', 'coinbase'],
  },
  {
    groupName: 'Hardware',
    wallets: ['ledger', 'trezor'],
  },
  {
    groupName: 'Otras',
    wallets: ['argent', 'imtoken', 'omni', 'frame'],
  },
];

// ========================================
// CONFIGURACIÓN DE THEMES
// ========================================

const themeConfig = {
  accentColor: '#667eea',
  accentColorForeground: 'white',
  borderRadius: 'large',
  fontStack: 'system',
  overlayBlur: 'small'
};

export const customMidnightTheme = midnightTheme(themeConfig);
export const customDarkTheme = darkTheme(themeConfig);
export const customLightTheme = lightTheme(themeConfig);

// Detectar tema del sistema
export const getSystemTheme = () => {
  if (typeof window !== 'undefined') {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? customDarkTheme : customLightTheme;
  }
  return customMidnightTheme;
};

// ========================================
// CONFIGURACIÓN PRINCIPAL DE RAINBOWKIT
// ========================================

export const createRainbowKitConfig = () => {
  return getDefaultConfig({
    appName: 'TicketSafer NFT Platform',
    projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || '705647bd297da3c2ea969a7940191475',
    chains: getChains(),
    ssr: false,
    
    // Metadatos de la aplicación
    appDescription: 'La primera plataforma multichain de tickets NFT con soporte para Ethereum, Polygon, Arbitrum y Optimism',
    appUrl: import.meta.env.VITE_APP_URL || 'https://ticketsafer.com',
    appIcon: '/ticket.svg',
    
    // Nota: La configuración de wallets se maneja automáticamente en getDefaultConfig
    
    // Configuración avanzada
    batch: {
      multicall: true,
    },
    
    // Configuración de WalletConnect
    walletConnectProjectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID,
    
    // Configuración de transports personalizados si es necesario
    transports: {
      // Se puede personalizar el RPC aquí si es necesario
    }
  });
};

// ========================================
// CONFIGURACIÓN DEL PROVIDER
// ========================================

// Función helper para crear la configuración del provider
export const createRainbowKitProviderConfig = () => ({
  theme: getSystemTheme(),
  coolMode: import.meta.env.DEV,
  showRecentTransactions: true,
  modalSize: 'compact',
  locale: 'es-ES',
  appInfo: {
    appName: 'TicketSafer',
    appDescription: 'La primera plataforma multichain de tickets NFT',
    appUrl: 'https://ticketsafer.com',
    appIcon: '/ticket.svg',
    learnMoreUrl: 'https://ticketsafer.com/about',
  },
});

// Configuración básica del provider (sin disclaimer)
export const rainbowKitProviderConfig = createRainbowKitProviderConfig();

// ========================================
// UTILIDADES
// ========================================

// Obtener información de la chain por ID
export const getChainById = (chainId) => {
  const allChains = [...productionChains, ...developmentChains];
  return allChains.find(chain => chain.id === chainId);
};

// Verificar si una chain está soportada
export const isChainSupported = (chainId) => {
  const supportedChains = getChains();
  return supportedChains.some(chain => chain.id === chainId);
};

// Obtener el explorador de bloques de una chain
export const getChainExplorer = (chainId) => {
  const chain = getChainById(chainId);
  return chain?.blockExplorers?.default?.url || 'https://etherscan.io';
};

// Configuración de chains personalizadas (si es necesario)
export const customChains = {
  // Aquí se pueden agregar chains personalizadas en el futuro
  // ejemplo: {
  //   id: 999999,
  //   name: 'Custom Network',
  //   network: 'custom',
  //   nativeCurrency: {
  //     decimals: 18,
  //     name: 'Custom Token',
  //     symbol: 'CTK',
  //   },
  //   rpcUrls: {
  //     default: { http: ['https://rpc.custom.network'] },
  //     public: { http: ['https://rpc.custom.network'] },
  //   },
  //   blockExplorers: {
  //     default: { name: 'CustomScan', url: 'https://scan.custom.network' },
  //   },
  // }
};

// ========================================
// CONFIGURACIÓN DE EVENTOS
// ========================================

// Event listeners para cambios de wallet/chain
export const setupWalletListeners = () => {
  if (typeof window !== 'undefined' && window.ethereum) {
    // Listener para cambios de cuenta
    window.ethereum.on('accountsChanged', (accounts) => {
      console.log('Cuentas cambiadas:', accounts);
      // Aquí se puede agregar lógica adicional
    });

    // Listener para cambios de chain
    window.ethereum.on('chainChanged', (chainId) => {
      console.log('Chain cambiada:', chainId);
      // Aquí se puede agregar lógica adicional
    });

    // Listener para desconexión
    window.ethereum.on('disconnect', (error) => {
      console.log('Wallet desconectada:', error);
      // Aquí se puede agregar lógica adicional
    });
  }
};

// ========================================
// CONFIGURACIÓN DE ANALYTICS
// ========================================

// Tracking de eventos de wallet
export const trackWalletEvent = (eventName, data = {}) => {
  if (import.meta.env.PROD && typeof window !== 'undefined') {
    // Integrar con analytics (Google Analytics, Mixpanel, etc.)
    console.log(`Wallet Event: ${eventName}`, data);
    
    // Ejemplo con Google Analytics
    if (window.gtag) {
      window.gtag('event', eventName, {
        category: 'Wallet',
        ...data
      });
    }
  }
};

export default {
  createRainbowKitConfig,
  createRainbowKitProviderConfig,
  rainbowKitProviderConfig,
  getChains,
  getSystemTheme,
  customMidnightTheme,
  customDarkTheme,
  customLightTheme,
  getChainById,
  isChainSupported,
  getChainExplorer,
  setupWalletListeners,
  trackWalletEvent
}; 