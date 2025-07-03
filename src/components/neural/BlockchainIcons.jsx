import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const BlockchainIcons = () => {
  const navigate = useNavigate();

  const blockchains = [
    {
      name: 'Ethereum',
      className: 'ethereum',
      chainFilter: 'ethereum',
      icon: (
        <svg className="blockchain-icon-svg" viewBox="0 0 256 417" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M127.961 0L125.164 9.5L125.164 285.168L127.961 287.958L255.922 212.32L127.961 0Z" fill="#627EEA"/>
          <path d="M127.961 0L0 212.32L127.961 287.958L127.961 154.158L127.961 0Z" fill="#627EEA" fillOpacity="0.6"/>
          <path d="M127.961 312.187L126.386 314.106L126.386 415.319L127.961 416.616L255.922 237.176L127.961 312.187Z" fill="#627EEA"/>
          <path d="M127.961 416.616L127.961 312.187L0 237.176L127.961 416.616Z" fill="#627EEA" fillOpacity="0.6"/>
          <path d="M127.961 287.958L255.922 212.32L127.961 154.158L127.961 287.958Z" fill="#627EEA" fillOpacity="0.2"/>
          <path d="M0 212.32L127.961 287.958L127.961 154.158L0 212.32Z" fill="#627EEA" fillOpacity="0.4"/>
        </svg>
      )
    },
    {
      name: 'Arbitrum',
      className: 'arbitrum',
      chainFilter: 'arbitrum',
      icon: (
        <svg className="blockchain-icon-svg" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="128" cy="128" r="128" fill="#28A0F0"/>
          <path d="M208 128L128 48L48 128L128 208L208 128Z" fill="white"/>
          <path d="M128 80L176 128L128 176L80 128L128 80Z" fill="#28A0F0"/>
          <path d="M128 104L152 128L128 152L104 128L128 104Z" fill="white"/>
        </svg>
      )
    },
    {
      name: 'Optimism',
      className: 'optimism',
      chainFilter: 'optimism',
      icon: (
        <svg className="blockchain-icon-svg" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="128" cy="128" r="128" fill="#FF0420"/>
          <ellipse cx="96" cy="128" rx="32" ry="48" fill="white"/>
          <ellipse cx="160" cy="128" rx="32" ry="48" fill="white"/>
          <path d="M80 128C80 110.3 87.2 96 96 96C104.8 96 112 110.3 112 128C112 145.7 104.8 160 96 160C87.2 160 80 145.7 80 128Z" fill="#FF0420"/>
          <path d="M144 128C144 110.3 151.2 96 160 96C168.8 96 176 110.3 176 128C176 145.7 168.8 160 160 160C151.2 160 144 145.7 144 128Z" fill="#FF0420"/>
        </svg>
      )
    },
    {
      name: 'Polygon',
      className: 'polygon',
      chainFilter: 'polygon',
      icon: (
        <svg className="blockchain-icon-svg" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="256" height="256" rx="128" fill="#8247E5"/>
          <path d="M128 64L80 88V136L128 160L176 136V88L128 64Z" fill="white"/>
          <path d="M128 96L96 112V144L128 160L160 144V112L128 96Z" fill="#8247E5"/>
          <path d="M128 112L112 120V136L128 144L144 136V120L128 112Z" fill="white"/>
          <path d="M80 152L48 168V200L80 216L112 200V168L80 152Z" fill="white"/>
          <path d="M176 152L144 168V200L176 216L208 200V168L176 152Z" fill="white"/>
        </svg>
      )
    }
  ];

  const handleBlockchainClick = (chainFilter) => {
    // Navegamos a la página de eventos con el filtro de blockchain específico
    navigate(`/eventos?chain=${chainFilter}`);
  };

  return (
    <motion.div 
      className="blockchain-icons-section"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
    >
      {blockchains.map((blockchain, index) => (
        <motion.div
          key={blockchain.name}
          className={`blockchain-icon ${blockchain.className}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
          whileHover={{ 
            scale: 1.05,
            y: -5,
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleBlockchainClick(blockchain.chainFilter)}
          style={{ cursor: 'pointer' }}
          title={`Ver eventos en ${blockchain.name}`}
        >
          {blockchain.icon}
          <span className="blockchain-icon-name">{blockchain.name}</span>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default BlockchainIcons; 