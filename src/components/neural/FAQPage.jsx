import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaMinus } from 'react-icons/fa';
import '../../styles/neural-faq.css';

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      category: "General",
      questions: [
        {
          question: "¿Qué es TicketSafer?",
answer: "TicketSafer es la primera plataforma multichain de tickets NFT, diseñada para revolucionar la industria de eventos. Utilizamos tecnología blockchain para garantizar la autenticidad y seguridad de los tickets, operando en múltiples redes como Ethereum, Arbitrum, Optimism, Base, Polygon y Avalanche."
        },
        {
          question: "¿Por qué usar tickets NFT?",
          answer: "Los tickets NFT ofrecen ventajas únicas: autenticidad verificable, prevención de falsificaciones, transferencia segura, historial transparente de propiedad y posibilidad de beneficios adicionales como coleccionables digitales o acceso a experiencias exclusivas."
        },
        {
          question: "¿Necesito conocimientos técnicos para usar TicketSafer?",
          answer: "No, hemos diseñado una interfaz intuitiva y amigable. Solo necesitas una wallet compatible (como MetaMask) y seguir nuestras guías paso a paso. Nuestro soporte está disponible 24/7 para ayudarte."
        }
      ]
    },
    {
      category: "Compra y Venta",
      questions: [
        {
          question: "¿Cómo compro un ticket?",
          answer: "1. Conecta tu wallet\n2. Selecciona el evento\n3. Elige la cantidad de tickets\n4. Confirma la transacción\n5. ¡Listo! El ticket NFT aparecerá en tu wallet"
        },
        {
          question: "¿Puedo revender mis tickets?",
          answer: "Sí, ofrecemos un marketplace secundario seguro donde puedes revender tus tickets. Los precios están regulados para prevenir la especulación excesiva y garantizar un mercado justo."
        },
        {
          question: "¿Qué métodos de pago aceptan?",
          answer: "Aceptamos pagos en las criptomonedas nativas de cada red (ETH, MATIC, etc.) y stablecoins populares como USDC y USDT. Próximamente integraremos pagos con tarjeta de crédito/débito."
        }
      ]
    },
    {
      category: "Tecnología y Seguridad",
      questions: [
        {
          question: "¿Cómo garantizan la seguridad?",
          answer: "Utilizamos contratos inteligentes auditados, implementamos estándares de seguridad blockchain de última generación y mantenemos un sistema de verificación multicapa para cada transacción."
        },
        {
          question: "¿Por qué son multichain?",
          answer: "Ser multichain nos permite ofrecer:\n- Menores costos de transacción\n- Mayor velocidad\n- Mejor escalabilidad\n- Flexibilidad para usuarios y organizadores"
        },
        {
          question: "¿Qué pasa si pierdo acceso a mi wallet?",
          answer: "Recomendamos guardar tu frase semilla de forma segura. También ofrecemos un sistema de recuperación social y estamos implementando soluciones de Account Abstraction para mejorar la experiencia de usuario."
        }
      ]
    },
    {
      category: "Organizadores",
      questions: [
        {
          question: "¿Cómo puedo crear un evento?",
          answer: "Los organizadores pueden usar nuestro dashboard especializado para:\n1. Crear eventos\n2. Gestionar tickets\n3. Establecer precios y políticas\n4. Acceder a analytics\n5. Gestionar beneficios especiales"
        },
        {
          question: "¿Qué comisiones cobran?",
          answer: "Nuestra estructura de comisiones es transparente:\n- 2% por venta primaria\n- 1% por reventa\n- Sin costos ocultos\nLos gas fees varían según la red seleccionada."
        },
        {
          question: "¿Ofrecen soporte para eventos grandes?",
          answer: "Sí, tenemos un equipo dedicado para eventos de gran escala, ofreciendo:\n- Soporte prioritario\n- Herramientas personalizadas\n- Análisis avanzado\n- Gestión de accesos VIP"
        }
      ]
    }
  ];

  const toggleQuestion = (categoryIndex, questionIndex) => {
    const currentIndex = openIndex === null ? null : openIndex;
    const newIndex = currentIndex === `${categoryIndex}-${questionIndex}` ? null : `${categoryIndex}-${questionIndex}`;
    setOpenIndex(newIndex);
  };

  return (
    <div className="neural-faq-container">
      <motion.div 
        className="faq-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1>Preguntas Frecuentes</h1>
        <p>Todo lo que necesitas saber sobre TicketSafer</p>
      </motion.div>

      <div className="faq-content">
        {faqs.map((category, categoryIndex) => (
          <motion.div 
            key={category.category}
            className="faq-category"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
          >
            <h2>{category.category}</h2>
            <div className="faq-questions">
              {category.questions.map((faq, questionIndex) => (
                <motion.div
                  key={questionIndex}
                  className="faq-item"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: (categoryIndex * 0.1) + (questionIndex * 0.1) }}
                >
                  <button
                    className={`faq-question ${openIndex === `${categoryIndex}-${questionIndex}` ? 'active' : ''}`}
                    onClick={() => toggleQuestion(categoryIndex, questionIndex)}
                  >
                    <span>{faq.question}</span>
                    {openIndex === `${categoryIndex}-${questionIndex}` ? <FaMinus /> : <FaPlus />}
                  </button>
                  <AnimatePresence>
                    {openIndex === `${categoryIndex}-${questionIndex}` && (
                      <motion.div
                        className="faq-answer"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {faq.answer.split('\n').map((line, index) => (
                          <p key={index}>{line}</p>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div 
        className="faq-footer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <div className="faq-support">
          <h3>¿No encontraste lo que buscabas?</h3>
          <p>Nuestro equipo de soporte está disponible 24/7 para ayudarte</p>
          <motion.button
            className="support-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contactar Soporte
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default FAQPage; 