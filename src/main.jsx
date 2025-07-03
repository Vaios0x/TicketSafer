import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
  darkTheme,
  midnightTheme
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { 
  sepolia,
  arbitrumSepolia,
  optimismSepolia,
  baseSepolia,
  polygonAmoy,
  avalancheFuji
} from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error capturado por ErrorBoundary:', error, errorInfo);
    
    // En producción, enviar error a servicio de monitoring
    if (__PROD__) {
      // Integrar con Sentry, LogRocket, etc.
      console.log('Enviar error a servicio de monitoring');
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          fontFamily: 'Inter, system-ui, sans-serif',
          textAlign: 'center',
          padding: '2rem'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '20px',
            padding: '3rem',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            maxWidth: '500px'
          }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
              ⚠️ Error de Aplicación
            </h1>
            <p style={{ marginBottom: '2rem', opacity: 0.9 }}>
              Lo sentimos, algo salió mal. Por favor, recarga la página.
            </p>
            <button
              onClick={() => window.location.reload()}
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '12px',
                padding: '1rem 2rem',
                color: 'white',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '600',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.3)';
              }}
              onMouseOut={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.2)';
              }}
            >
              🔄 Recargar Página
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Loading Component mejorado
const LoadingFallback = () => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    fontFamily: 'Inter, system-ui, sans-serif'
  }}>
    <div style={{
      width: '60px',
      height: '60px',
      border: '4px solid rgba(255, 255, 255, 0.3)',
      borderTop: '4px solid #fff',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      marginBottom: '2rem'
    }}></div>
    <h2 style={{ 
      fontSize: '1.5rem', 
      fontWeight: '600',
      marginBottom: '0.5rem',
      textAlign: 'center'
    }}>
      TicketSafer
    </h2>
    <p style={{ 
      opacity: 0.8,
      textAlign: 'center',
      maxWidth: '300px'
    }}>
      Cargando la plataforma multichain de tickets NFT...
    </p>
    
    <style>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

// Configuración de Web3 optimizada
const config = getDefaultConfig({
  appName: 'TicketSafer NFT Platform',
  projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || '705647bd297da3c2ea969a7940191475',
  chains: [
    sepolia, 
    arbitrumSepolia, 
    optimismSepolia, 
    baseSepolia, 
    polygonAmoy, 
    avalancheFuji
  ],
  ssr: false,
  // Metadatos mejorados
  appDescription: 'La primera plataforma multichain de tickets NFT con soporte para Ethereum, Polygon, Arbitrum y Optimism',
  appUrl: import.meta.env.VITE_APP_URL || 'https://ticketsafer.com',
  appIcon: '/ticket.svg'
});

// Configuración de React Query optimizada
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Cache de 5 minutos por defecto
      staleTime: 1000 * 60 * 5,
      // Datos considerados frescos por 1 minuto
      cacheTime: 1000 * 60 * 10,
      // Reintentar 2 veces en caso de error
      retry: 2,
      // No refetch en window focus en desarrollo
      refetchOnWindowFocus: __PROD__,
    },
    mutations: {
      retry: 1,
    },
  },
});

// Configuración del theme de RainbowKit
const rainbowTheme = midnightTheme({
  accentColor: '#667eea',
  accentColorForeground: 'white',
  borderRadius: 'large',
  fontStack: 'system',
  overlayBlur: 'small'
});

// Función para remover el loading inicial
const removeInitialLoader = () => {
  const loader = document.getElementById('initial-loader');
  if (loader) {
    loader.style.opacity = '0';
    setTimeout(() => {
      loader.remove();
    }, 300);
  }
};

// Función principal de renderizado
const renderApp = () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  
  root.render(
    <React.StrictMode>
      <ErrorBoundary>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider 
              theme={rainbowTheme}
              coolMode={__DEV__}
              showRecentTransactions={true}
              appInfo={{
                appName: 'TicketSafer',
                learnMoreUrl: 'https://ticketsafer.com/about',
              }}
            >
              <Suspense fallback={<LoadingFallback />}>
                <App />
              </Suspense>
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </ErrorBoundary>
    </React.StrictMode>
  );

  // Remover loading inicial cuando React termine de montar
  setTimeout(removeInitialLoader, 100);
};

// Verificar si el DOM está listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderApp);
} else {
  renderApp();
}

// Hot Module Replacement para desarrollo
if (__DEV__ && import.meta.hot) {
  import.meta.hot.accept('./App', () => {
    console.log('🔥 Hot reloading App component');
  });
}
