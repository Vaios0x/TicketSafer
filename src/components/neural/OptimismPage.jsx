import React from 'react';
import { motion } from 'framer-motion';
import { FaGasPump, FaShieldAlt, FaRocket, FaCoins, FaHeart } from 'react-icons/fa';

const OptimismPage = () => {
  const stats = [
    { label: 'Eventos Activos', value: '567', icon: <FaRocket /> },
    { label: 'Tickets Vendidos', value: '16,789', icon: <FaCoins /> },
    { label: 'Gas Promedio', value: '~$0.15', icon: <FaGasPump /> },
    { label: 'Uptime', value: '99.9%', icon: <FaShieldAlt /> }
  ];

  return (
    <div className="blockchain-page optimism">
      <motion.div className="blockchain-hero" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <div className="neural-container">
          <div className="hero-content">
            <motion.div className="chain-logo" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.8 }}>
              <div className="optimism-icon">🔴</div>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }}>
              Optimism
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }}>
              La Layer 2 optimista de Ethereum. Escalabilidad con un enfoque en la simplicidad y sostenibilidad.
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
            <h2>¿Listo para crear tu evento en Optimism?</h2>
            <p>Únete al futuro optimista de Ethereum</p>
            <motion.button className="cta-button optimism-button" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              🔴 Crear Evento en Optimism
            </motion.button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OptimismPage; 