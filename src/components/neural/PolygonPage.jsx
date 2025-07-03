import React from 'react';
import { motion } from 'framer-motion';
import { FaGasPump, FaShieldAlt, FaRocket, FaCoins, FaLeaf } from 'react-icons/fa';

const PolygonPage = () => {
  const stats = [
    { label: 'Eventos Activos', value: '1,234', icon: <FaRocket /> },
    { label: 'Tickets Vendidos', value: '45,678', icon: <FaCoins /> },
    { label: 'Gas Promedio', value: '~$0.01', icon: <FaGasPump /> },
    { label: 'Uptime', value: '99.9%', icon: <FaShieldAlt /> }
  ];

  const features = [
    {
      title: 'Gas Ultra Bajo',
      description: 'Transacciones por centavos, ideal para eventos masivos',
      icon: <FaGasPump />
    },
    {
      title: 'Eco-Friendly',
      description: 'Proof of Stake consume 99.95% menos energía',
      icon: <FaLeaf />
    },
    {
      title: 'Velocidad Extrema',
      description: 'Confirmaciones en 2 segundos',
      icon: <FaRocket />
    }
  ];

  return (
    <div className="blockchain-page polygon">
      <motion.div className="blockchain-hero" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <div className="neural-container">
          <div className="hero-content">
            <motion.div className="chain-logo" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.8 }}>
              <div className="polygon-icon">⬣</div>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }}>
              Polygon
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }}>
              La solución escalable de Ethereum. Ideal para eventos masivos con gas mínimo y velocidad máxima.
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

      <section className="blockchain-features">
        <div className="neural-container">
          <h2>¿Por qué elegir Polygon?</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <motion.div key={index} className="feature-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1, duration: 0.6 }} whileHover={{ scale: 1.02, y: -5 }}>
                <div className="feature-icon polygon-gradient">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="blockchain-cta">
        <div className="neural-container">
          <div className="cta-content">
            <h2>¿Listo para crear tu evento en Polygon?</h2>
            <p>Aprovecha la velocidad y bajo costo de la red escalable</p>
            <motion.button className="cta-button polygon-button" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              ⬣ Crear Evento en Polygon
            </motion.button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PolygonPage; 