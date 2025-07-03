import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaTicketAlt, FaChartLine, FaUsers, FaQuestionCircle, FaCalendarAlt, FaChevronDown, FaRoad, FaPlus } from 'react-icons/fa';
import ConnectButton from './ConnectButton';

const menuItems = [
  {
    title: 'INICIO',
    path: '/',
    icon: <FaTicketAlt />,
    description: 'Página principal'
  },
  {
    title: 'EVENTOS',
    path: '/eventos',
    icon: <FaCalendarAlt />,
    description: 'Explora todos los eventos'
  },
  {
    title: 'CREAR EVENTO',
    path: '/crear-evento',
    icon: <FaPlus />,
    description: 'Crea tu propio evento',
    highlight: true
  },
  {
    title: 'ACERCA DE',
    path: '/acerca-de',
    icon: <FaUsers />,
    description: 'Conoce más sobre nosotros',
    hasSubmenu: true,
    submenu: [
      {
        title: 'Sobre Nosotros',
        path: '/acerca-de',
        icon: <FaUsers />,
        description: 'Información sobre TicketSafer'
      },
      {
        title: 'Roadmap',
        path: '/roadmap',
        icon: <FaRoad />,
        description: 'Plan de desarrollo y futuro'
      }
    ]
  },
  {
    title: 'FAQ',
    path: '/faq',
    icon: <FaQuestionCircle />,
    description: 'Preguntas frecuentes'
  },
  {
    title: 'PERFIL',
    path: '/perfil',
    icon: <FaChartLine />,
    description: 'Tu perfil completo con dashboard'
  }
];

const NeuralMenu = () => {
  const [activeItem, setActiveItem] = useState('/');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleClickOutside = (event) => {
      if (!event.target.closest('.has-submenu')) {
        setActiveSubmenu(null);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('click', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleSubmenuToggle = (itemTitle) => {
    const newValue = activeSubmenu === itemTitle ? null : itemTitle;
    setActiveSubmenu(newValue);
  };

  const renderMenuItem = (item) => {
    if (item.hasSubmenu) {
      return (
        <motion.div
          key={item.title}
          className={`menu-item has-submenu ${activeSubmenu === item.title ? 'active' : ''}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <button
            className={`nav-link submenu-trigger ${activeSubmenu === item.title ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleSubmenuToggle(item.title);
            }}
            style={{ 
              all: 'unset',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              width: '100%'
            }}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-text">{item.title}</span>
            <span 
              className="submenu-arrow"
              style={{ 
                transform: activeSubmenu === item.title ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s ease'
              }}
            >
              <FaChevronDown />
            </span>
          </button>
          
          <div 
            className={`submenu ${activeSubmenu === item.title ? 'submenu-visible' : ''}`}
            style={{
              display: activeSubmenu === item.title ? 'block' : 'none'
            }}
          >
            {item.submenu.map((subItem) => (
              <Link
                key={subItem.path}
                to={subItem.path}
                className="submenu-link"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '12px 16px',
                  color: '#e2e8f0',
                  textDecoration: 'none',
                  borderBottom: '1px solid rgba(255,255,255,0.1)'
                }}
                onClick={() => {
                  setActiveItem(subItem.path);
                  setActiveSubmenu(null);
                  setIsMobileMenuOpen(false);
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = 'rgba(102, 126, 234, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                }}
              >
                <span className="submenu-icon">{subItem.icon}</span>
                <span className="submenu-text">{subItem.title}</span>
              </Link>
            ))}
          </div>
          
          <div className="menu-tooltip">
            <span>{item.description}</span>
          </div>
        </motion.div>
      );
    }

    return (
      <motion.div
        key={item.path}
        className={`menu-item ${item.highlight ? 'highlight' : ''}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link
          to={item.path}
          className={`nav-link ${activeItem === item.path ? 'active' : ''} ${item.highlight ? 'highlight' : ''}`}
          onClick={() => {
            setActiveItem(item.path);
            setIsMobileMenuOpen(false);
          }}
        >
          <span className="nav-icon">{item.icon}</span>
          <span className="nav-text">{item.title}</span>
          {activeItem === item.path && (
            <motion.div
              className="nav-indicator"
              layoutId="indicator"
              initial={false}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 30
              }}
            />
          )}
        </Link>
        <div className="menu-tooltip">
          <span>{item.description}</span>
        </div>
      </motion.div>
    );
  };

  return (
    <nav className={`neural-navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="neural-logo">
          <div className="logo-icon">
            <div className="logo-ring"></div>
            <div className="logo-ring"></div>
            <div className="logo-ring"></div>
          </div>
          <span className="logo-text">TicketSafer</span>
        </Link>

        <div className={`neural-nav ${isMobileMenuOpen ? 'active' : ''}`}>
          <div className="nav-links">
            {menuItems.map(renderMenuItem)}
          </div>

          <ConnectButton />
        </div>

        <button 
          className="menu-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
};

export default NeuralMenu; 