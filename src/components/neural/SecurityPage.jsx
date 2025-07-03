import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaShieldAlt, 
  FaLock, 
  FaKey, 
  FaExclamationTriangle,
  FaWallet,
  FaEye,
  FaUserSecret,
  FaServer,
  FaBug,
  FaCheckCircle
} from 'react-icons/fa';
import { IoShieldCheckmark, IoWarning, IoKey, IoLaptop, IoTime, IoAlertCircle, IoMail, IoBug, IoLockClosed, IoEye, IoServer, IoApps, IoShield, IoRefresh, IoGlobe, IoHardwareChip } from 'react-icons/io5';
import '../../styles/security.css';

const SecurityPage = () => {
  const securityFeatures = [
    {
      icon: <FaLock />,
      title: 'Cifrado End-to-End',
      description: 'Todas las comunicaciones están protegidas con cifrado SSL/TLS'
    },
    {
      icon: <FaWallet />,
      title: 'Wallets No Custodiales',
      description: 'Mantienes control total de tus claves privadas y fondos'
    },
    {
      icon: <FaEye />,
      title: 'Auditorías Externas',
      description: 'Contratos inteligentes auditados por firmas de seguridad reconocidas'
    },
    {
      icon: <FaServer />,
      title: 'Infraestructura Segura',
      description: 'Servidores protegidos con múltiples capas de seguridad'
    }
  ];

  const bestPractices = [
    {
      title: 'Protege tu Frase de Recuperación',
      description: 'Nunca compartas tu seed phrase. Guárdala offline en un lugar seguro.',
      critical: true
    },
    {
      title: 'Verifica URLs',
      description: 'Siempre verifica que estés en ticketsafer.com antes de conectar tu wallet.',
      critical: true
    },
    {
      title: 'Usa Wallets Hardware',
      description: 'Para mayor seguridad, considera usar Ledger o Trezor para almacenar tus NFTs.',
      critical: false
    },
    {
      title: 'Mantén Software Actualizado',
      description: 'Actualiza regularmente tu wallet y navegador a las últimas versiones.',
      critical: false
    }
  ];

  return (
    <div className="security-page">
      <motion.div 
        className="security-hero"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="neural-container">
          <div className="hero-content">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <FaShieldAlt className="hero-icon" />
              Seguridad
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Tu seguridad es nuestra prioridad. Conoce cómo protegemos tu información y tus assets.
            </motion.p>
          </div>
        </div>
      </motion.div>

      <div className="security-container">
        <section className="security-measures">
          <h2 className="measures-title">Nuestras Medidas de Seguridad</h2>
          <div className="measures-grid">
            <div className="measure-card">
              <IoLockClosed className="measure-icon" />
              <h3 className="measure-title">Cifrado End-to-End</h3>
              <p className="measure-description">
                Todas las comunicaciones están protegidas con cifrado SSL/TLS
              </p>
            </div>

            <div className="measure-card">
              <IoEye className="measure-icon" />
              <h3 className="measure-title">Wallets No Custodiales</h3>
              <p className="measure-description">
                Mantén el control total de tus activos digitales
              </p>
            </div>

            <div className="measure-card">
              <IoServer className="measure-icon" />
              <h3 className="measure-title">Auditorías Externas</h3>
              <p className="measure-description">
                Contratos inteligentes auditados por firmas de seguridad
              </p>
            </div>

            <div className="measure-card">
              <IoApps className="measure-icon" />
              <h3 className="measure-title">Infraestructura Segura</h3>
              <p className="measure-description">
                Servidores monitoreados 24/7 con respaldo automático
              </p>
            </div>
          </div>
        </section>

        <section className="security-best-practices">
          <div className="best-practices-header">
            <h2 className="best-practices-title">Mejores Prácticas de Seguridad</h2>
            <p className="best-practices-subtitle">
              Sigue estas recomendaciones para mantener tus assets seguros
            </p>
          </div>
          
          <div className="best-practices-grid">
            <div className="practice-item">
              <div className="practice-header">
                <IoKey className="practice-icon" />
                <h3 className="practice-title">Protege tu Frase de Recuperación</h3>
                <span className="practice-severity severity-critical">Crítico</span>
              </div>
              <p className="practice-description">
                Nunca compartas tu seed phrase. Guárdala offline en un lugar seguro.
              </p>
            </div>

            <div className="practice-item">
              <div className="practice-header">
                <IoGlobe className="practice-icon" />
                <h3 className="practice-title">Verifica URLs</h3>
                <span className="practice-severity severity-critical">Crítico</span>
              </div>
              <p className="practice-description">
                Siempre verifica que estés en ticketsafer.com antes de conectar tu wallet.
              </p>
            </div>

            <div className="practice-item">
              <div className="practice-header">
                <IoHardwareChip className="practice-icon" />
                <h3 className="practice-title">Usa Wallets Hardware</h3>
                <span className="practice-severity severity-critical">Crítico</span>
              </div>
              <p className="practice-description">
                Para mayor seguridad, considera usar Ledger o Trezor para almacenar tus NFTs.
              </p>
            </div>

            <div className="practice-item">
              <div className="practice-header">
                <IoRefresh className="practice-icon" />
                <h3 className="practice-title">Mantén Software Actualizado</h3>
                <span className="practice-severity severity-critical">Crítico</span>
              </div>
              <p className="practice-description">
                Actualiza regularmente tu wallet y navegador a las últimas versiones.
              </p>
            </div>
          </div>
        </section>

        <section className="security-audits">
          <h2 className="section-title">Auditorías de Seguridad</h2>
          <div className="audit-list">
            <div className="audit-item">
              <FaCheckCircle className="audit-check" />
              <span className="audit-text">Contratos principales auditados por CertiK</span>
            </div>
            <div className="audit-item">
              <FaCheckCircle className="audit-check" />
              <span className="audit-text">Marketplace auditado por OpenZeppelin</span>
            </div>
            <div className="audit-item">
              <FaCheckCircle className="audit-check" />
              <span className="audit-text">Auditorías regulares cada 6 meses</span>
            </div>
            <div className="audit-item">
              <FaCheckCircle className="audit-check" />
              <span className="audit-text">Bug bounty program activo - Hasta $50,000</span>
            </div>
          </div>
        </section>

        <section className="incident-response">
          <h2 className="section-title">Respuesta a Incidentes</h2>
          <div className="response-grid">
            <div className="response-item">
              <h3 className="response-title">
                <IoTime /> Detección
              </h3>
              <p className="response-description">
                Monitoreo 24/7 de todos nuestros sistemas y contratos inteligentes
              </p>
            </div>

            <div className="response-item">
              <h3 className="response-title">
                <IoAlertCircle /> Respuesta
              </h3>
              <p className="response-description">
                Equipo de respuesta rápida disponible para actuar en menos de 15 minutos
              </p>
            </div>

            <div className="response-item">
              <h3 className="response-title">
                <IoWarning /> Comunicación
              </h3>
              <p className="response-description">
                Notificación inmediata a usuarios afectados a través de todos los canales
              </p>
            </div>

            <div className="response-item">
              <h3 className="response-title">
                <IoShieldCheckmark /> Recuperación
              </h3>
              <p className="response-description">
                Procedimientos establecidos para restaurar operaciones y mitigar impactos
              </p>
            </div>
          </div>
        </section>

        <section className="vulnerability-report">
          <h2 className="section-title">¿Encontraste un problema de seguridad?</h2>
          <p className="section-description">
            Si has identificado una vulnerabilidad de seguridad, por favor repórtala responsablemente a través de nuestro programa de bug bounty.
          </p>
          
          <div className="report-options">
            <div className="report-option">
              <h3>Reporte Confidencial</h3>
              <p>security@ticketsafer.com</p>
            </div>
            
            <div className="report-option">
              <h3>Bug Bounty</h3>
              <p>bounty@ticketsafer.com</p>
            </div>
          </div>

          <button className="report-button">
            <IoBug className="button-icon" />
            Reportar Vulnerabilidad
          </button>
        </section>
      </div>

      {/* Security Features */}
      <section className="security-features">
        <div className="neural-container">
          <h2>Nuestras Medidas de Seguridad</h2>
          <div className="features-grid">
            {securityFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className="feature-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section className="best-practices">
        <div className="neural-container">
          <h2>Mejores Prácticas de Seguridad</h2>
          <p className="section-description">
            Sigue estas recomendaciones para mantener tus assets seguros
          </p>
          
          <div className="practices-list">
            {bestPractices.map((practice, index) => (
              <motion.div
                key={index}
                className={`practice-item ${practice.critical ? 'critical' : ''}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <div className="practice-header">
                  {practice.critical && <FaExclamationTriangle className="critical-icon" />}
                  <h3>{practice.title}</h3>
                  {practice.critical && <span className="critical-badge">Crítico</span>}
                </div>
                <p>{practice.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Security */}
      <section className="security-contact">
        <div className="neural-container">
          <div className="contact-content">
            <h2>¿Encontraste un problema de seguridad?</h2>
            <p>
              Si has identificado una vulnerabilidad de seguridad, por favor repórtala 
              responsablemente a través de nuestro programa de bug bounty.
            </p>
            <div className="contact-methods">
              <div className="contact-method">
                <FaUserSecret className="contact-icon" />
                <div>
                  <h4>Reporte Confidencial</h4>
                  <p>security@ticketsafer.com</p>
                </div>
              </div>
              <div className="contact-method">
                <FaBug className="contact-icon" />
                <div>
                  <h4>Bug Bounty</h4>
                  <p>bounty@ticketsafer.com</p>
                </div>
              </div>
            </div>
            <motion.button
              className="report-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Reportar Vulnerabilidad
            </motion.button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SecurityPage; 