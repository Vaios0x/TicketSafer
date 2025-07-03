import React from 'react';
import { motion } from 'framer-motion';
import { FaEthereum, FaGasPump, FaShieldAlt, FaRocket, FaCoins } from 'react-icons/fa';

const EthereumPage = () => {
  const stats = [
    { label: 'Eventos Activos', value: '2,456', icon: <FaRocket /> },
    { label: 'Tickets Vendidos', value: '78,923', icon: <FaCoins /> },
    { label: 'Gas Promedio', value: '~$5', icon: <FaGasPump /> },
    { label: 'Uptime', value: '99.9%', icon: <FaShieldAlt /> }
  ];

  const features = [
    {
      title: 'Seguridad Máxima',
      description: 'La red más segura y descentralizada para tus tickets NFT',
      icon: <FaShieldAlt />
    },
    {
      title: 'Liquidez Instantánea',
      description: 'Acceso inmediato a exchanges y marketplaces globales',
      icon: <FaCoins />
    },
    {
      title: 'Compatibilidad Total',
      description: 'Funciona con todos los wallets y dApps del ecosistema',
      icon: <FaRocket />
    }
  ];

  return (
    <div className="blockchain-page ethereum">
      <motion.div 
        className="blockchain-hero"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="neural-container">
          <div className="hero-content">
            <motion.div
              className="chain-logo"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <FaEthereum className="chain-icon ethereum-icon" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Ethereum
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              La blockchain más confiable para tickets NFT premium. Máxima seguridad y compatibilidad universal.
            </motion.p>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <section className="blockchain-stats">
        <div className="neural-container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="stat-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="blockchain-features">
        <div className="neural-container">
          <h2>¿Por qué elegir Ethereum?</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="feature-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="feature-icon ethereum-gradient">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Use */}
      <section className="how-to-use">
        <div className="neural-container">
          <h2>Cómo usar Ethereum en TicketSafer</h2>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <h3>Conecta tu Wallet</h3>
              <p>Usa MetaMask, WalletConnect o cualquier wallet compatible con Ethereum</p>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <h3>Selecciona Ethereum</h3>
              <p>Elige Ethereum mainnet al crear eventos o comprar tickets</p>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <h3>Confirma Transacción</h3>
              <p>Paga el gas fee y confirma la transacción en tu wallet</p>
            </div>
            <div className="step-card">
              <div className="step-number">4</div>
              <h3>¡Listo!</h3>
              <p>Tu ticket NFT estará disponible en tu wallet en minutos</p>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Info */}
      <section className="technical-info">
        <div className="neural-container">
          <h2>Información Técnica</h2>
          <div className="tech-grid">
            <div className="tech-card">
              <h4>Estándar de Token</h4>
              <p>ERC-721 (NFT) y ERC-1155 (Multi-token)</p>
            </div>
            <div className="tech-card">
              <h4>Tiempo de Confirmación</h4>
              <p>~15 segundos por bloque</p>
            </div>
            <div className="tech-card">
              <h4>Gas Fees</h4>
              <p>Variable según demanda de red</p>
            </div>
            <div className="tech-card">
              <h4>Block Explorer</h4>
              <p>etherscan.io</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="blockchain-cta">
        <div className="neural-container">
          <div className="cta-content">
            <h2>¿Listo para crear tu evento en Ethereum?</h2>
            <p>Aprovecha la seguridad y confiabilidad de la red más robusta</p>
            <motion.button
              className="cta-button ethereum-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaEthereum />
              Crear Evento en Ethereum
            </motion.button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EthereumPage; 