import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaTwitter, 
  FaDiscord, 
  FaTelegram, 
  FaGithub,
  FaRocket,
  FaHeart,
  FaCode,
  FaStar,
  FaGem,
  FaShieldAlt,
  FaNetworkWired,
  FaGasPump,
  FaExchangeAlt
} from 'react-icons/fa';
import '../../styles/neural-footer.css';

const NeuralFooter = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Plataforma",
      icon: <FaRocket />,
      links: [
        { name: "Explorar Eventos", href: "/eventos" },
        { name: "Crear Evento", href: "/crear-evento" },
        { name: "Marketplace", href: "/marketplace" },
        { name: "Docs API", href: "/docs" }
      ]
    },
    {
      title: "Blockchains",
      icon: <FaNetworkWired />,
      links: [
        { name: "Ethereum", href: "/ethereum", icon: "Ξ" },
        { name: "Polygon", href: "/polygon", icon: "⬣" },
        { name: "Arbitrum", href: "/arbitrum", icon: "◉" },
        { name: "Optimism", href: "/optimism", icon: "🔴" }
      ]
    },
    {
      title: "Recursos",
      icon: <FaShieldAlt />,
      links: [
        { name: "Centro de Ayuda", href: "/ayuda" },
        { name: "Términos", href: "/terminos" },
        { name: "Privacidad", href: "/privacidad" },
        { name: "Seguridad", href: "/seguridad" }
      ]
    },
    {
      title: "Comunidad",
      icon: <FaHeart />,
      links: [
        { name: "Discord", href: "https://discord.gg/ticketsafer", icon: <FaDiscord /> },
        { name: "Twitter", href: "https://twitter.com/ticketsafer", icon: <FaTwitter /> },
        { name: "Telegram", href: "https://t.me/ticketsafer", icon: <FaTelegram /> },
        { name: "GitHub", href: "https://github.com/ticketsafer", icon: <FaGithub /> }
      ]
    }
  ];

  const stats = [
    { value: "10K+", label: "Eventos Vendidos", icon: <FaGem /> },
    { value: "99.9%", label: "Uptime", icon: <FaShieldAlt /> },
    { value: "4", label: "Blockchains", icon: <FaNetworkWired /> },
    { value: "<$0.1", label: "Gas Promedio", icon: <FaGasPump /> }
  ];

  return (
    <footer className="neural-footer">
      {/* Animated Background */}
      <div className="footer-background">
        <div className="neural-grid"></div>
        <div className="floating-particles">
          {[...Array(20)].map((_, i) => (
          <motion.div 
              key={i}
              className="particle"
              initial={{ opacity: 0, scale: 0 }}
                animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                y: [-20, -100],
                x: Math.random() * 50 - 25
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
              style={{
                left: `${Math.random() * 100}%`,
                bottom: 0
              }}
            />
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <motion.div 
        className="footer-stats"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="neural-container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="stat-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
          </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Main Footer Content */}
      <div className="footer-content">
        <div className="neural-container">
          <div className="footer-grid">
            {/* Brand Section */}
            <motion.div 
              className="footer-brand"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="brand-logo">
                <div className="logo-icon">
                  <FaGem className="gem-icon" />
                  <div className="logo-glow"></div>
                </div>
                <h3 className="brand-title">TicketSafer</h3>
              </div>
              <p className="brand-description">
                La primera plataforma multichain de tickets NFT que revoluciona 
                la forma de comprar, vender y verificar entradas para eventos.
              </p>
              <div className="brand-features">
                <div className="feature-item">
                  <FaShieldAlt className="feature-icon" />
                  <span>100% Seguro</span>
                </div>
                <div className="feature-item">
                  <FaNetworkWired className="feature-icon" />
                  <span>Multichain</span>
                </div>
                <div className="feature-item">
                  <FaExchangeAlt className="feature-icon" />
                  <span>Sin Intermediarios</span>
                </div>
              </div>
            </motion.div>

            {/* Footer Sections */}
            {footerSections.map((section, index) => (
            <motion.div
                key={index}
              className="footer-section"
              initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              >
                <div className="section-header">
                  <div className="section-icon">{section.icon}</div>
                  <h4 className="section-title">{section.title}</h4>
                </div>
                <ul className="section-links">
                {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <motion.a
                        href={link.href}
                        className="footer-link"
                        whileHover={{ x: 5, color: '#667eea' }}
                        transition={{ duration: 0.2 }}
                      >
                        {link.icon && <span className="link-icon">{link.icon}</span>}
                        {link.name}
                      </motion.a>
                    </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        </div>
      </div>

      {/* Bottom Section */}
      <motion.div 
        className="footer-bottom"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div className="neural-container">
          <div className="bottom-content">
            <div className="copyright-section">
              <div className="copyright-text">
                <FaGem className="copyright-icon" />
                <span>© {currentYear} TicketSafer. Todos los derechos reservados.</span>
              </div>
              <div className="powered-by">
                <span className="powered-text">Powered by Web3 Technology</span>
                <div className="blockchain-badges">
                  <span className="blockchain-badge eth">Ξ</span>
                  <span className="blockchain-badge matic">⬣</span>
                  <span className="blockchain-badge arb">◉</span>
                  <span className="blockchain-badge op">🔴</span>
                </div>
              </div>
            </div>

            {/* Development Credits */}
            <motion.div 
              className="development-credits"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="credits-content">
                <FaCode className="code-icon" />
                <span className="credits-text">Development by</span>
                <div className="dev-team">
                  <motion.span 
                    className="dev-name ggt"
                    whileHover={{ scale: 1.1, color: '#667eea' }}
                  >
                    GGT
                  </motion.span>
                  <span className="dev-separator">&</span>
                  <motion.a
                    href="https://t.me/Vai0sx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="dev-link vai0sx"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaTelegram className="telegram-icon" />
                    <span className="dev-name">@Vai0sx</span>
                  </motion.a>
                </div>
                <div className="credits-glow"></div>
              </div>
            </motion.div>

            {/* Social Links */}
            <div className="social-section">
              <span className="social-text">Síguenos</span>
          <div className="social-links">
                {[
                  { icon: <FaTwitter />, href: "#twitter", color: "#1DA1F2" },
                  { icon: <FaDiscord />, href: "#discord", color: "#5865F2" },
                  { icon: <FaTelegram />, href: "#telegram", color: "#0088CC" },
                  { icon: <FaGithub />, href: "#github", color: "#333" }
                ].map((social, index) => (
              <motion.a
                    key={index}
                    href={social.href}
                    className="social-link"
                    whileHover={{ 
                      scale: 1.2, 
                      backgroundColor: social.color,
                      y: -3
                    }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    style={{ '--hover-color': social.color }}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scroll to Top Button */}
      <motion.button
        className="scroll-top-btn"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <FaRocket className="rocket-icon" />
        <div className="btn-glow"></div>
      </motion.button>
    </footer>
  );
};

export default NeuralFooter; 