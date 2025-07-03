import { useState, useEffect } from 'react';
import { useAccount, useConnect, useDisconnect, useBalance, useEnsName, useEnsAvatar, useChainId } from 'wagmi';
import { useConnectModal, useAccountModal, useChainModal } from '@rainbow-me/rainbowkit';
import { trackWalletEvent, getChainById, isChainSupported } from '../utils/rainbowkit-config.js';

/**
 * Hook personalizado para gestionar la conexión de wallet
 * Proporciona una interfaz simplificada y optimizada para la aplicación
 */
export const useWallet = () => {
  // Hooks de wagmi
  const { address, isConnected, isConnecting, isDisconnected } = useAccount();
  const { connect, connectors, error: connectError } = useConnect();
  const { disconnect } = useDisconnect();
  const chainId = useChainId();
  
  // Hooks de RainbowKit para modales
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const { openChainModal } = useChainModal();

  // Hook para obtener balance
  const { data: balance, isLoading: isLoadingBalance } = useBalance({
    address,
    enabled: !!address,
  });

  // Hook para ENS
  const { data: ensName } = useEnsName({
    address,
    enabled: !!address,
  });

  const { data: ensAvatar } = useEnsAvatar({
    name: ensName,
    enabled: !!ensName,
  });

  // ========================================
  // FUNCIONES DE CONEXIÓN
  // ========================================

  /**
   * Conectar wallet con tracking de eventos
   */
  const connectWallet = async (connectorId) => {
    try {
      trackWalletEvent('connect_attempt', { connector: connectorId });
      
      const connector = connectors.find(c => c.id === connectorId);
      if (!connector) {
        throw new Error(`Connector ${connectorId} no encontrado`);
      }

      await connect({ connector });
      trackWalletEvent('connect_success', { connector: connectorId });
    } catch (error) {
      console.error('Error conectando wallet:', error);
      trackWalletEvent('connect_error', { 
        connector: connectorId, 
        error: error.message 
      });
      throw error;
    }
  };

  /**
   * Desconectar wallet con tracking
   */
  const disconnectWallet = async () => {
    try {
      trackWalletEvent('disconnect_attempt');
      await disconnect();
      trackWalletEvent('disconnect_success');
    } catch (error) {
      console.error('Error desconectando wallet:', error);
      trackWalletEvent('disconnect_error', { error: error.message });
      throw error;
    }
  };

  // ========================================
  // FUNCIONES DE UTILIDAD
  // ========================================

  /**
   * Formatear dirección para mostrar
   */
  const formatAddress = (addr = address, startLength = 6, endLength = 4) => {
    if (!addr) return '';
    return `${addr.slice(0, startLength)}...${addr.slice(-endLength)}`;
  };

  /**
   * Formatear balance para mostrar
   */
  const formatBalance = (bal = balance, decimals = 4) => {
    if (!bal) return '0';
    return parseFloat(bal.formatted).toFixed(decimals);
  };

  /**
   * Verificar si la chain actual está soportada
   */
  const isCurrentChainSupported = () => {
    if (!address) return true; // Si no está conectado, no hay problema
    return isChainSupported(chainId);
  };

  /**
   * Obtener información de la chain actual
   */
  const getCurrentChainInfo = () => {
    if (!chainId) return null;
    return getChainById(chainId);
  };

  // ========================================
  // ESTADO DERIVADO
  // ========================================

  const displayName = ensName || formatAddress();
  const hasBalance = balance && parseFloat(balance.formatted) > 0;

  const walletInfo = {
    address,
    ensName,
    ensAvatar,
    displayName,
    balance,
    formattedBalance: formatBalance(),
    hasBalance,
    isLoadingBalance,
  };

  const connectionState = {
    isConnected,
    isConnecting,
    isDisconnected,
    hasError: !!connectError,
    error: connectError,
  };

  const chainInfo = {
    isSupported: isCurrentChainSupported(),
    current: getCurrentChainInfo(),
  };

  // ========================================
  // FUNCIONES DE MODAL
  // ========================================

  const modals = {
    openConnect: () => {
      trackWalletEvent('modal_open', { type: 'connect' });
      openConnectModal?.();
    },
    openAccount: () => {
      trackWalletEvent('modal_open', { type: 'account' });
      openAccountModal?.();
    },
    openChain: () => {
      trackWalletEvent('modal_open', { type: 'chain' });
      openChainModal?.();
    },
  };

  // ========================================
  // RETURN DEL HOOK
  // ========================================

  return {
    // Estado de la wallet
    ...walletInfo,
    ...connectionState,
    ...chainInfo,

    // Funciones de conexión
    connect: connectWallet,
    disconnect: disconnectWallet,

    // Modales
    modals,

    // Utilidades
    formatAddress,
    formatBalance,

    // Datos avanzados
    connectors,
    rawBalance: balance,
    rawError: connectError,
  };
};

/**
 * Hook para detectar cambios en la wallet
 */
export const useWalletEvents = () => {
  const { address, isConnected } = useAccount();
  const [previousAddress, setPreviousAddress] = useState(address);
  const [previousConnection, setPreviousConnection] = useState(isConnected);

  useEffect(() => {
    // Detectar cambio de cuenta
    if (address !== previousAddress) {
      if (address) {
        trackWalletEvent('account_changed', { 
          from: previousAddress, 
          to: address 
        });
      }
      setPreviousAddress(address);
    }

    // Detectar cambio de conexión
    if (isConnected !== previousConnection) {
      trackWalletEvent(isConnected ? 'connected' : 'disconnected');
      setPreviousConnection(isConnected);
    }
  }, [address, isConnected, previousAddress, previousConnection]);

  return {
    hasAccountChanged: address !== previousAddress,
    hasConnectionChanged: isConnected !== previousConnection,
  };
};

/**
 * Hook para estado de la transacción
 */
export const useTransactionState = () => {
  const [transactions, setTransactions] = useState([]);
  const [isTransacting, setIsTransacting] = useState(false);

  const addTransaction = (tx) => {
    setTransactions(prev => [
      { ...tx, timestamp: Date.now() },
      ...prev.slice(0, 9) // Mantener solo las últimas 10
    ]);
    trackWalletEvent('transaction_started', { hash: tx.hash });
  };

  const updateTransaction = (hash, updates) => {
    setTransactions(prev =>
      prev.map(tx =>
        tx.hash === hash ? { ...tx, ...updates } : tx
      )
    );
  };

  const clearTransactions = () => {
    setTransactions([]);
  };

  return {
    transactions,
    isTransacting,
    setIsTransacting,
    addTransaction,
    updateTransaction,
    clearTransactions,
  };
};

export default useWallet; 