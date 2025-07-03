import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaShieldAlt, 
  FaChartLine, 
  FaUserShield, 
  FaHandshake,
  FaNetworkWired,
  FaGasPump,
  FaExchangeAlt,
  FaLock
} from 'react-icons/fa';
import '../../styles/neural-about.css';

const NeuralAbout = () => {
  const features = [
    {
      icon: <FaShieldAlt />,
      title: "Seguridad Multichain",
      description: "Máxima seguridad al operar en múltiples cadenas: Ethereum, Arbitrum, Optimism y Polygon"
    },
    {
      icon: <FaGasPump />,
      title: "Costos Optimizados",
      description: "Aprovecha las bajas tarifas de gas en L2s como Arbitrum y Optimism para transacciones más económicas"
    },
    {
      icon: <FaNetworkWired />,
      title: "Interoperabilidad Total",
      description: "Conectividad perfecta entre redes permitiendo transferir tickets NFT entre cualquier blockchain"
    },
    {
      icon: <FaChartLine />,
      title: "Escalabilidad Masiva", 
      description: "Capacidad de procesar miles de transacciones por segundo combinando la velocidad de múltiples redes"
    },
    {
      icon: <FaExchangeAlt />,
      title: "Liquidez Unificada",
      description: "Accede a la liquidez de múltiples cadenas para comprar y vender tickets de forma instantánea"
    },
    {
      icon: <FaLock />,
      title: "Verificación Avanzada",
      description: "Sistema de validación cruzada entre cadenas para prevenir fraudes y duplicados"
    },
    {
      icon: <FaUserShield />,
      title: "Identidad Verificada",
      description: "Proceso de verificación seguro para compradores y vendedores en todas las redes"
    },
    {
      icon: <FaHandshake />,
      title: "Respaldo Garantizado",
      description: "Transacciones respaldadas por la seguridad de múltiples blockchains"
    }
  ];

  const stats = [
    {
      value: "4",
      label: "Blockchains Integradas",
      description: "Ethereum, Arbitrum, Optimism y Polygon"
    },
    {
      value: "10,000+",
      label: "TPS",
      description: "Transacciones por segundo combinadas"
    },
    {
      value: "99.9%",
      label: "Uptime",
      description: "Disponibilidad del sistema"
    },
    {
      value: "<$0.1",
      label: "Gas Promedio",
      description: "En redes L2"
    }
  ];

  return (
    <div className="neural-about">
      <div className="neural-about-hero">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          La Primera Plataforma de Tickets NFT Multichain
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Revolucionando la venta de tickets con tecnología blockchain de última generación
        </motion.p>
      </div>

      <div className="neural-about-features">
        <h2>Beneficios Multichain</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="feature-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="neural-about-stats">
        <h2>Nuestro Impacto</h2>
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="stat-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3>{stat.value}</h3>
              <h4>{stat.label}</h4>
              <p>{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="neural-about-mission">
        <motion.div
          className="mission-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2>Nuestra Misión</h2>
          <p>
            Crear un ecosistema de tickets digitales seguro, eficiente y accesible 
            que aproveche lo mejor de cada blockchain. Mediante la integración de 
            múltiples redes, ofrecemos una experiencia sin fricciones para compradores 
            y vendedores, eliminando intermediarios y garantizando la autenticidad 
            de cada ticket.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default NeuralAbout; 