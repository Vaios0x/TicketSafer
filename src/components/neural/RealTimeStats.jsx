import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaTicketAlt, 
  FaUsers, 
  FaEthereum, 
  FaExchangeAlt,
  FaChartLine
} from 'react-icons/fa';
import '../../styles/real-time-stats.css';

const RealTimeStats = () => {
  const [stats, setStats] = useState({
    activeUsers: 0,
    totalTransactions: 0,
    totalVolume: 0,
    averagePrice: 0
  });

  // Simular actualizaciones en tiempo real
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        activeUsers: Math.floor(Math.random() * 1000) + 500,
        totalTransactions: prev.totalTransactions + Math.floor(Math.random() * 10),
        totalVolume: prev.totalVolume + Math.random() * 2,
        averagePrice: 0.15 + Math.random() * 0.1
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const statsConfig = [
    {
      icon: <FaUsers />,
      label: 'Usuarios Activos',
      value: stats.activeUsers.toLocaleString(),
      color: '#00ff88'
    },
    {
      icon: <FaTicketAlt />,
      label: 'Transacciones',
      value: stats.totalTransactions.toLocaleString(),
      color: '#ff00ff'
    },
    {
      icon: <FaEthereum />,
      label: 'Volumen Total',
      value: `${stats.totalVolume.toFixed(2)} ETH`,
      color: '#00ffff'
    },
    {
      icon: <FaExchangeAlt />,
      label: 'Precio Promedio',
      value: `${stats.averagePrice.toFixed(3)} ETH`,
      color: '#ffff00'
    }
  ];

  return (
    <div className="real-time-stats">
      <motion.div 
        className="stats-header"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <FaChartLine />
        <h2>Estadísticas en Tiempo Real</h2>
      </motion.div>

      <div className="stats-grid">
        {statsConfig.map((stat, index) => (
          <motion.div
            key={stat.label}
            className="stat-card neural-glass"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <div className="stat-icon" style={{ color: stat.color }}>
              {stat.icon}
            </div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={stat.value}
                className="stat-value"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {stat.value}
              </motion.div>
            </AnimatePresence>

            <div className="stat-label">{stat.label}</div>

            <div className="stat-trend">
              <motion.div
                className="trend-line"
                style={{
                  background: `linear-gradient(90deg, transparent, ${stat.color})`
                }}
                animate={{
                  opacity: [0.5, 1, 0.5],
                  scaleX: [0.8, 1.2, 0.8]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RealTimeStats; 