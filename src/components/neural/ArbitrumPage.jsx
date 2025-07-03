import React from 'react';
import { motion } from 'framer-motion';
import { FaGasPump, FaShieldAlt, FaRocket, FaCoins, FaLayerGroup } from 'react-icons/fa';

const ArbitrumPage = () => {
  const stats = [
    { label: 'Eventos Activos', value: '892', icon: <FaRocket /> },
    { label: 'Tickets Vendidos', value: '28,456', icon: <FaCoins /> },
    { label: 'Gas Promedio', value: '~$0.25', icon: <FaGasPump /> },
    { label: 'Uptime', value: '99.9%', icon: <FaShieldAlt /> }
  ];

  return (
    <div className="blockchain-page arbitrum">
      <motion.div className="blockchain-hero" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <div className="neural-container">
          <div className="hero-content">
            <motion.div className="chain-logo" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.8 }}>
              <div className="arbitrum-icon">◉</div>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }}>
              Arbitrum
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }}>
              Layer 2 de Ethereum con seguridad heredada. El equilibrio perfecto entre costo y confiabilidad.
            </motion.p>
          </div>
        </div>
      </motion.div>

      <section className="blockchain-stats">
        <div className="neural-container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <motion.div key={index} className="stat-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1, duration: 0.6 }} whileHover={{ scale: 1.05, y: -5 }}>
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="blockchain-cta">
        <div className="neural-container">
          <div className="cta-content">
            <h2>¿Listo para crear tu evento en Arbitrum?</h2>
            <p>Disfruta de la seguridad de Ethereum con costos reducidos</p>
            <motion.button className="cta-button arbitrum-button" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              ◉ Crear Evento en Arbitrum
            </motion.button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ArbitrumPage; 