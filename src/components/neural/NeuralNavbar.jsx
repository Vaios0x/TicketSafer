import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../../styles/navbar.css';

const NeuralNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    {
      id: "inicio",
      title: "INICIO",
      path: "/"
    },
    {
      id: "acerca",
      title: "ACERCA DE",
      path: "/about"
    },
    {
      id: "roadmap",
      title: "ROADMAP",
      path: "/roadmap"
    },
    {
      id: "faq",
      title: "FAQ",
      path: "/faq"
    }
  ];

  return (
    <motion.nav 
      className={`neural-navbar ${isScrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="neural-navbar-container">
        {/* Logo Neural */}
        <motion.div 
          className="neural-logo"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="logo-neural-rings">
            <div className="neural-ring neural-ring-1"></div>
            <div className="neural-ring neural-ring-2"></div>
            <div className="neural-ring neural-ring-3"></div>
          </div>
          <span className="logo-symbol">🎫</span>
          <div className="logo-text-neural">
            <span className="logo-main">TicketSafer</span>
            <span className="logo-subtitle">NFT Tickets</span>
          </div>
        </motion.div>

        {/* Menu Neural */}
        <div className="neural-menu">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="neural-menu-item"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <a href={item.path} className="neural-item-button">
                <span className="item-label">{item.title}</span>
                <div className="neural-glow-indicator"></div>
              </a>
            </motion.div>
          ))}
        </div>

        {/* Wallet Connect Neural */}
        <motion.button
          className="neural-wallet-connect"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="wallet-icon">👛</span>
          <span>Conectar Wallet</span>
          <div className="neural-pulse-ring"></div>
        </motion.button>
      </div>
    </motion.nav>
  );
};

export default NeuralNavbar; 