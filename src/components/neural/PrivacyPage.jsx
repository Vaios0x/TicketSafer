import React from 'react';
import { motion } from 'framer-motion';
import { FaUserShield, FaDatabase, FaCookie, FaEye } from 'react-icons/fa';

const PrivacyPage = () => {
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
              <FaUserShield className="hero-icon" />
              Política de Privacidad
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
              <h2>1. Información que Recopilamos</h2>
              
              <h3>1.1 Información Personal</h3>
              <ul>
                <li>Dirección de wallet (pública en blockchain)</li>
                <li>Dirección de email (opcional)</li>
                <li>Información de perfil (nombre de usuario, avatar)</li>
                <li>Historial de transacciones</li>
              </ul>

              <h3>1.2 Información Técnica</h3>
              <ul>
                <li>Dirección IP y ubicación general</li>
                <li>Tipo de navegador y dispositivo</li>
                <li>Páginas visitadas y tiempo de permanencia</li>
                <li>Cookies y tecnologías similares</li>
              </ul>
            </section>

            <section className="legal-section">
              <h2>2. Cómo Utilizamos su Información</h2>
              <ul>
                <li>Procesar transacciones y mantener registros</li>
                <li>Proporcionar soporte al cliente</li>
                <li>Mejorar nuestros servicios y experiencia de usuario</li>
                <li>Cumplir con requisitos legales y regulatorios</li>
                <li>Prevenir fraude y actividades maliciosas</li>
                <li>Enviar notificaciones importantes sobre el servicio</li>
              </ul>
            </section>

            <section className="legal-section">
              <h2>3. Compartir Información</h2>
              <p>No vendemos ni alquilamos su información personal. Podemos compartir información en los siguientes casos:</p>
              
              <h3>3.1 Información Pública en Blockchain</h3>
              <p>
                Las transacciones de blockchain son públicas por naturaleza. Su dirección de wallet 
                y historial de transacciones son visibles en exploradores de blockchain.
              </p>

              <h3>3.2 Proveedores de Servicios</h3>
              <ul>
                <li>Servicios de análisis web (Google Analytics)</li>
                <li>Proveedores de infraestructura cloud</li>
                <li>Servicios de soporte al cliente</li>
                <li>Procesadores de pagos fiat</li>
              </ul>

              <h3>3.3 Requisitos Legales</h3>
              <p>
                Podemos divulgar información cuando sea requerido por ley, orden judicial, 
                o para proteger nuestros derechos, propiedad o seguridad.
              </p>
            </section>

            <section className="legal-section">
              <h2>4. Cookies y Tecnologías de Seguimiento</h2>
              
              <div className="info-box">
                <FaCookie className="info-icon" />
                <div>
                  <h4>Tipos de Cookies que Utilizamos</h4>
                  <ul>
                    <li><strong>Esenciales:</strong> Necesarias para el funcionamiento del sitio</li>
                    <li><strong>Análisis:</strong> Para entender cómo los usuarios interactúan</li>
                    <li><strong>Funcionales:</strong> Para recordar preferencias</li>
                    <li><strong>Marketing:</strong> Para personalizar contenido (con su consentimiento)</li>
                  </ul>
                </div>
              </div>

              <p>
                Puede controlar las cookies a través de la configuración de su navegador, 
                pero esto puede afectar la funcionalidad del sitio.
              </p>
            </section>

            <section className="legal-section">
              <h2>5. Seguridad de Datos</h2>
              <p>Implementamos múltiples medidas de seguridad:</p>
              <ul>
                <li>Cifrado SSL/TLS para todas las comunicaciones</li>
                <li>Almacenamiento seguro de datos con cifrado en reposo</li>
                <li>Acceso limitado a información personal</li>
                <li>Auditorías de seguridad regulares</li>
                <li>Protección contra ataques DDoS y malware</li>
              </ul>
            </section>

            <section className="legal-section">
              <h2>6. Sus Derechos de Privacidad</h2>
              
              <h3>6.1 Derechos GDPR (si aplica)</h3>
              <ul>
                <li><strong>Acceso:</strong> Solicitar una copia de sus datos</li>
                <li><strong>Rectificación:</strong> Corregir datos incorrectos</li>
                <li><strong>Eliminación:</strong> Solicitar borrado de datos</li>
                <li><strong>Portabilidad:</strong> Obtener datos en formato estructurado</li>
                <li><strong>Objeción:</strong> Oponerse al procesamiento</li>
              </ul>

              <h3>6.2 Limitaciones de Blockchain</h3>
              <p>
                Debido a la naturaleza inmutable de la blockchain, no podemos eliminar 
                o modificar transacciones ya registradas en la cadena de bloques.
              </p>
            </section>

            <section className="legal-section">
              <h2>7. Retención de Datos</h2>
              <ul>
                <li><strong>Datos de cuenta:</strong> Mientras mantenga su cuenta activa</li>
                <li><strong>Transacciones:</strong> Permanentemente (registros blockchain)</li>
                <li><strong>Logs de servidor:</strong> 12 meses</li>
                <li><strong>Cookies de análisis:</strong> 24 meses</li>
                <li><strong>Soporte al cliente:</strong> 3 años</li>
              </ul>
            </section>

            <section className="legal-section">
              <h2>8. Menores de Edad</h2>
              <p>
                Nuestro servicio no está dirigido a menores de 18 años. No recopilamos 
                conscientemente información personal de menores. Si descubrimos que hemos 
                recopilado información de un menor, la eliminaremos inmediatamente.
              </p>
            </section>

            <section className="legal-section">
              <h2>9. Transferencias Internacionales</h2>
              <p>
                Sus datos pueden ser transferidos y procesados en países fuera de su ubicación, 
                incluyendo países que pueden tener diferentes leyes de protección de datos. 
                Tomamos medidas apropiadas para garantizar un nivel adecuado de protección.
              </p>
            </section>

            <section className="legal-section">
              <h2>10. Cambios en esta Política</h2>
              <p>
                Podemos actualizar esta Política de Privacidad ocasionalmente. Le notificaremos 
                sobre cambios significativos publicando la nueva política en nuestro sitio web 
                y actualizando la fecha de "última actualización".
              </p>
            </section>

            <section className="legal-section">
              <h2>11. Contacto sobre Privacidad</h2>
              <p>
                Para ejercer sus derechos de privacidad o hacer preguntas sobre esta política:
              </p>
              <ul>
                <li>Email: privacy@ticketsafer.com</li>
                <li>DPO (Data Protection Officer): dpo@ticketsafer.com</li>
                <li>Dirección postal: [Dirección de la empresa]</li>
              </ul>
            </section>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage; 