import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import '../../styles/custom-connect-button.css';

const CustomConnectButton = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Mostrar loading mientras monta el componente
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus ||
            authenticationStatus === 'authenticated');

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
                    className="custom-connect-btn"
                  >
                    <span className="connect-icon">🔗</span>
                    <span className="connect-text">Conectar Wallet</span>
                    <div className="connect-glow"></div>
                  </button>
                );
              }

              // Estado: Conectado pero red incorrecta
              if (chain.unsupported) {
                return (
                  <button
                    onClick={openChainModal}
                    className="custom-connect-btn error"
                  >
                    <span className="error-icon">⚠️</span>
                    <span className="connect-text">Red No Soportada</span>
                  </button>
                );
              }

              // Estado: Conectado correctamente
              return (
                <div className="connected-wallet-container">
                  {/* Botón de Chain */}
                  <button
                    onClick={openChainModal}
                    className="chain-button"
                    title={`Conectado a ${chain.name}`}
                  >
                    <div className="chain-info">
                      {chain.hasIcon && (
                        <div className="chain-icon-wrapper">
                          <img
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                            className="chain-icon"
                          />
                        </div>
                      )}
                      {!chain.hasIcon && (
                        <span className="chain-icon-fallback">⟐</span>
                      )}
                      <span className="chain-name">{chain.name}</span>
                    </div>
                    <span className="dropdown-icon">▼</span>
                  </button>

                  {/* Botón de Account */}
                  <button
                    onClick={openAccountModal}
                    className="account-button"
                  >
                    <div className="account-info">
                      <div className="account-avatar">
                        {account.ensAvatar ? (
                          <img
                            alt={account.ensName ?? account.address}
                            src={account.ensAvatar}
                            className="avatar-image"
                          />
                        ) : (
                          <div className="avatar-placeholder">
                            👤
                          </div>
                        )}
                      </div>
                      
                      <div className="account-details">
                        <div className="account-name">
                          {account.ensName || `${account.address.slice(0, 6)}...${account.address.slice(-4)}`}
                        </div>
                        {account.displayBalance && (
                          <div className="account-balance">
                            {account.displayBalance}
                          </div>
                        )}
                      </div>
                    </div>
                    <span className="dropdown-icon">▼</span>
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

// Componente para mostrar información de la wallet en el modal
export const WalletInfo = ({ account, chain }) => {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // Aquí podrías agregar una notificación de "copiado"
  };

  const openEtherscan = () => {
    const baseUrl = chain?.blockExplorers?.default?.url || 'https://etherscan.io';
    window.open(`${baseUrl}/address/${account.address}`, '_blank');
  };

  return (
    <div className="wallet-info-panel">
      <div className="wallet-header">
        <div className="wallet-avatar">
          {account.ensAvatar ? (
            <img
              alt={account.ensName ?? account.address}
              src={account.ensAvatar}
              className="avatar-image-large"
            />
          ) : (
            <div className="avatar-placeholder-large">
              👤
            </div>
          )}
        </div>
        <div className="wallet-details">
          <h3 className="wallet-name">
            {account.ensName || 'Wallet'}
          </h3>
          <div className="wallet-address">
            {account.address}
          </div>
        </div>
      </div>

      <div className="wallet-actions">
        <button
          onClick={() => copyToClipboard(account.address)}
          className="wallet-action-btn"
        >
          <span>📋</span>
          <span>Copiar Dirección</span>
        </button>
        
        <button
          onClick={openEtherscan}
          className="wallet-action-btn"
        >
          <span>🔗</span>
          <span>Ver en Explorer</span>
        </button>
      </div>

      {account.displayBalance && (
        <div className="wallet-balance-section">
          <div className="balance-label">Balance</div>
          <div className="balance-amount">
            {account.displayBalance}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomConnectButton; 