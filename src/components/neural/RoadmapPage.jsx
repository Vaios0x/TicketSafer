import React from 'react';
import { motion } from 'framer-motion';
import '../../styles/neural-roadmap.css';

const RoadmapPage = () => {
  const milestones = [
    {
      date: "Q3 2025",
      title: "Lanzamiento Inicial",
      status: "pending",
      items: [
        "Implementación de contratos inteligentes multichain",
        "Soporte para Ethereum y Arbitrum",
        "Sistema básico de emisión de tickets NFT",
        "Interfaz de usuario neural"
      ]
    },
    {
      date: "Q4 2025",
      title: "Expansión Cross-Chain",
      status: "pending",
      items: [
        "Integración con Optimism y Base",
        "Sistema de verificación de tickets en tiempo real",
        "Marketplace secundario con precios dinámicos",
        "Dashboard para organizadores de eventos"
      ]
    },
    {
      date: "Q1 2026",
      title: "Características Premium",
      status: "pending",
      items: [
        "Sistema de membresías NFT",
        "Integración con Polygon y Avalanche",
        "Análisis avanzado de datos para organizadores",
        "Sistema de recompensas para usuarios frecuentes"
      ]
    },
    {
      date: "Q2 2026",
      title: "Innovación Social",
      status: "pending",
      items: [
        "Sistema de gobernanza DAO",
        "Tokenización de experiencias VIP",
        "Integración con redes sociales Web3",
        "Programa de embajadores de marca"
      ]
    },
    {
      date: "Q3 2026",
      title: "Expansión Tecnológica",
      status: "pending",
      items: [
        "Metaverso TicketSafer para eventos virtuales",
        "Sistema de staking para holders de tickets",
        "Expansión a nuevas cadenas Layer 2",
        "API pública para desarrolladores"
      ]
    },
    {
      date: "Q4 2026",
      title: "Visión Futura",
      status: "pending",
      items: [
        "Implementación de zkRollups propios",
        "Sistema de identidad descentralizada",
        "Integración con venues físicos mediante IoT",
        "Expansión global con soporte multiidioma"
      ]
    }
  ];

  return (
    <div className="neural-roadmap-container">
      <motion.div 
        className="roadmap-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1>Roadmap</h1>
        <p>Nuestra visión para revolucionar la industria de tickets</p>
        <div className="roadmap-legend">
          <span className="legend-item completed">
            <span className="legend-dot"></span>
            Completado
          </span>
          <span className="legend-item in-progress">
            <span className="legend-dot"></span>
            En Progreso
          </span>
          <span className="legend-item pending">
            <span className="legend-dot"></span>
            Próximamente
          </span>
        </div>
      </motion.div>

      <div className="roadmap-timeline">
        {milestones.map((milestone, index) => (
          <motion.div
            key={milestone.date}
            className={`roadmap-milestone ${milestone.status}`}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
          >
            <div className="milestone-content">
              <div className="milestone-header">
                <span className="milestone-date">{milestone.date}</span>
                <h3>{milestone.title}</h3>
              </div>
              <ul className="milestone-items">
                {milestone.items.map((item, itemIndex) => (
                  <motion.li
                    key={itemIndex}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: (index * 0.2) + (itemIndex * 0.1) }}
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
            <div className="milestone-connector">
              <div className="connector-line"></div>
              <div className="connector-dot"></div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div 
        className="roadmap-future"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <div className="future-glow"></div>
        <h2>El Futuro es Descentralizado</h2>
        <p>Continuamos innovando y expandiendo las posibilidades de los tickets NFT</p>
      </motion.div>
    </div>
  );
};

export default RoadmapPage; 