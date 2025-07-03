import React from 'react';
import { motion } from 'framer-motion';
import { FaGavel, FaShieldAlt, FaExclamationTriangle } from 'react-icons/fa';

const TermsPage = () => {
  return (
    <div className="legal-page">
      <motion.div 
        className="legal-hero"
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
              <FaGavel className="hero-icon" />
              Términos y Condiciones
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Última actualización: 15 de enero de 2025
            </motion.p>
          </div>
        </div>
      </motion.div>

      <div className="legal-content">
        <div className="neural-container">
          <motion.div
            className="content-wrapper"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <section className="legal-section">
              <h2>1. Aceptación de los Términos</h2>
              <p>
                Al acceder y utilizar TicketSafer, usted acepta estar sujeto a estos Términos y Condiciones 
                y a todas las leyes y regulaciones aplicables. Si no está de acuerdo con alguno de estos 
                términos, se le prohíbe utilizar o acceder a este sitio.
              </p>
            </section>

            <section className="legal-section">
              <h2>2. Definiciones</h2>
              <ul>
                <li><strong>Plataforma:</strong> Se refiere a TicketSafer y todos sus servicios relacionados</li>
                <li><strong>NFT:</strong> Token No Fungible que representa un ticket digital único</li>
                <li><strong>Usuario:</strong> Cualquier persona que accede o utiliza la plataforma</li>
                <li><strong>Organizador:</strong> Persona o entidad que crea eventos en la plataforma</li>
                <li><strong>Marketplace:</strong> Sección de la plataforma para compra/venta de tickets</li>
              </ul>
            </section>

            <section className="legal-section">
              <h2>3. Servicios de la Plataforma</h2>
              <p>TicketSafer proporciona:</p>
              <ul>
                <li>Una plataforma para crear, mintear y gestionar tickets NFT</li>
                <li>Un marketplace para la compra/venta de tickets</li>
                <li>Servicios de verificación de autenticidad</li>
                <li>Herramientas de gestión de eventos</li>
                <li>APIs y SDKs para desarrolladores</li>
              </ul>
            </section>

            <section className="legal-section">
              <h2>4. Responsabilidades del Usuario</h2>
              <h3>4.1 Cuenta y Seguridad</h3>
              <ul>
                <li>Mantener la seguridad de su wallet y claves privadas</li>
                <li>Proporcionar información veraz y actualizada</li>
                <li>No compartir credenciales de acceso</li>
                <li>Notificar inmediatamente cualquier uso no autorizado</li>
              </ul>

              <h3>4.2 Uso Aceptable</h3>
              <ul>
                <li>No crear eventos fraudulentos o engañosos</li>
                <li>No violar derechos de propiedad intelectual</li>
                <li>No participar en actividades ilegales</li>
                <li>Cumplir con todas las leyes locales aplicables</li>
              </ul>
            </section>

            <section className="legal-section">
              <h2>5. Política de Pagos y Reembolsos</h2>
              <h3>5.1 Pagos</h3>
              <p>
                Todos los pagos se procesan en criptomonedas a través de contratos inteligentes. 
                Las transacciones son irreversibles una vez confirmadas en la blockchain.
              </p>

              <h3>5.2 Comisiones</h3>
              <ul>
                <li>Comisión por venta: 2.5% del precio del ticket</li>
                <li>Comisión por reventa: 1% del precio de reventa</li>
                <li>Gas fees: Pagados por el usuario según la red blockchain</li>
              </ul>

              <h3>5.3 Reembolsos</h3>
              <p>
                Los reembolsos están sujetos a la política del organizador del evento. 
                TicketSafer no es responsable de reembolsos por eventos cancelados o reprogramados.
              </p>
            </section>

            <section className="legal-section">
              <h2>6. Propiedad Intelectual</h2>
              <p>
                Todo el contenido de la plataforma, incluyendo pero no limitado a textos, gráficos, 
                logos, iconos, imágenes, clips de audio y software, es propiedad de TicketSafer o 
                sus licenciatarios y está protegido por leyes de derechos de autor.
              </p>
            </section>

            <section className="legal-section">
              <h2>7. Limitación de Responsabilidad</h2>
              <div className="warning-box">
                <FaExclamationTriangle className="warning-icon" />
                <p>
                  <strong>IMPORTANTE:</strong> TicketSafer proporciona la plataforma "tal como está" 
                  sin garantías de ningún tipo. No somos responsables de pérdidas financieras, 
                  eventos cancelados, problemas técnicos de blockchain, o pérdida de acceso a wallets.
                </p>
              </div>
            </section>

            <section className="legal-section">
              <h2>8. Modificaciones</h2>
              <p>
                Nos reservamos el derecho de modificar estos términos en cualquier momento. 
                Los cambios entrarán en vigor inmediatamente después de su publicación en la plataforma. 
                El uso continuado de la plataforma constituye la aceptación de los términos modificados.
              </p>
            </section>

            <section className="legal-section">
              <h2>9. Terminación</h2>
              <p>
                Podemos suspender o terminar su acceso a la plataforma en cualquier momento, 
                sin previo aviso, por violación de estos términos o por cualquier razón que 
                consideremos apropiada a nuestra sola discreción.
              </p>
            </section>

            <section className="legal-section">
              <h2>10. Ley Aplicable</h2>
              <p>
                Estos términos se regirán e interpretarán de acuerdo con las leyes del país 
                de registro de TicketSafer. Cualquier disputa será resuelta en los tribunales 
                competentes de dicha jurisdicción.
              </p>
            </section>

            <section className="legal-section">
              <h2>11. Contacto</h2>
              <p>
                Para preguntas sobre estos Términos y Condiciones, puede contactarnos en:
              </p>
              <ul>
                <li>Email: legal@ticketsafer.com</li>
                <li>Dirección: [Dirección de la empresa]</li>
                <li>Teléfono: +1 (555) 123-4567</li>
              </ul>
            </section>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage; 