import React from 'react';
import { ConnectButton as RainbowConnectButton } from '@rainbow-me/rainbowkit';
import { 
  ArbitrumIcon, 
  EthereumIcon, 
  OptimismIcon, 
  BaseIcon, 
  PolygonIcon,
  AvalancheIcon 
} from './NetworkIcons';
import '../../styles/connect-button.css';

const getNetworkIcon = (chain) => {
  if (!chain) return <span className="default-chain-icon">⟐</span>;
  
  // Mainnet chains
  if (chain.id === 1) return <EthereumIcon />;
  if (chain.id === 137) return <PolygonIcon />;
  if (chain.id === 10) return <OptimismIcon />;
  if (chain.id === 42161) return <ArbitrumIcon />;
  if (chain.id === 8453) return <BaseIcon />;
  
  // Testnet chains
  switch (chain.id) {
    case 11155111: // Sepolia
      return <EthereumIcon />;
    case 421614: // Arbitrum Sepolia
      return <ArbitrumIcon />;
    case 11155420: // Optimism Sepolia
      return <OptimismIcon />;
    case 84532: // Base Sepolia
      return <BaseIcon />;
    case 80002: // Polygon Amoy
      return <PolygonIcon />;
    case 43113: // Avalanche Fuji
      return <AvalancheIcon />;
    default:
      return chain.iconUrl ? (
        <img 
          src={chain.iconUrl} 
          alt={chain.name} 
          className="chain-icon-image"
          width="20"
          height="20"
        />
      ) : (
        <span className="default-chain-icon">⟐</span>
      );
  }
};

const ConnectButton = () => {
  return (
    <RainbowConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Mejorado: incluir authenticationStatus para mejor UX
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === 'authenticated');

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              // Estado: Desconectado
              if (!connected) {
                return (
                  <button 
                    onClick={openConnectModal} 
                    className="connect-button"
                    aria-label="Conectar wallet"
                  >
                    <span className="connect-icon">🔗</span>
                    <span>Conectar Wallet</span>
                  </button>
                );
              }

              // Estado: Red no soportada
              if (chain.unsupported) {
                return (
                  <button 
                    onClick={openChainModal} 
                    className="connect-button wrong-network"
                    aria-label="Cambiar a red soportada"
                  >
                    <span className="error-icon">⚠️</span>
                    <span>Red No Soportada</span>
                  </button>
                );
              }

              // Estado: Conectado correctamente
              return (
                <div className="connected-container">
                  <button 
                    onClick={openChainModal} 
                    className="chain-button"
                    title={`Conectado a ${chain.name}`}
                    aria-label={`Cambiar de ${chain.name}`}
                  >
                    {getNetworkIcon(chain)}
                    <div className="chain-info">
                      <span className="chain-name">{chain.name}</span>
                      <span className="address">{account.displayName}</span>
                    </div>
                    <span className="dropdown-icon">▼</span>
                  </button>
                  
                  <button 
                    onClick={openAccountModal} 
                    className="balance-button"
                    title="Ver detalles de la cuenta"
                    aria-label="Abrir detalles de cuenta"
                  >
                    <div className="balance-content">
                      <span className="balance-amount">{account.displayBalance}</span>
                      {account.ensName && (
                        <span className="ens-name">{account.ensName}</span>
                      )}
                    </div>
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </RainbowConnectButton.Custom>
  );
};

export default ConnectButton; 