import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaQuestionCircle, 
  FaSearch, 
  FaBook, 
  FaTicketAlt,
  FaWallet,
  FaShieldAlt,
  FaCreditCard,
  FaHeadset,
  FaEnvelope,
  FaPhone,
  FaComments,
  FaThumbsUp,
  FaThumbsDown
} from 'react-icons/fa';
import '../../styles/help.css';
import { IoDocumentText, IoShieldCheckmark, IoHelpCircle } from 'react-icons/io5';

const HelpPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'Todas', icon: <FaBook /> },
    { id: 'tickets', label: 'Tickets', icon: <FaTicketAlt /> },
    { id: 'wallet', label: 'Wallet', icon: <FaWallet /> },
    { id: 'security', label: 'Seguridad', icon: <FaShieldAlt /> },
    { id: 'payments', label: 'Pagos', icon: <FaCreditCard /> }
  ];

  const faqItems = [
    {
      id: 1,
      category: 'tickets',
      question: '¿Cómo compro un ticket NFT?',
      answer: 'Para comprar un ticket NFT, conecta tu wallet, selecciona el evento deseado, elige la cantidad de tickets y confirma la transacción. El ticket se transferirá automáticamente a tu wallet.',
      helpful: 95
    },
    {
      id: 2,
      category: 'wallet',
      question: '¿Qué wallets son compatibles?',
      answer: 'Soportamos MetaMask, WalletConnect, Coinbase Wallet y Trust Wallet. También cualquier wallet compatible con WalletConnect.',
      helpful: 92
    },
    {
      id: 3,
      category: 'security',
      question: '¿Cómo verifico la autenticidad de un ticket?',
      answer: 'Cada ticket NFT tiene un hash único en la blockchain. Puedes verificarlo en nuestro verificador o directamente en el explorador de blockchain.',
      helpful: 98
    },
    {
      id: 4,
      category: 'payments',
      question: '¿Qué métodos de pago aceptan?',
      answer: 'Aceptamos criptomonedas (ETH, MATIC, etc.) y próximamente tarjetas de crédito/débito a través de nuestro procesador de pagos.',
      helpful: 88
    },
    {
      id: 5,
      category: 'tickets',
      question: '¿Puedo revender mi ticket?',
      answer: 'Sí, si el organizador habilitó la reventa para ese evento. Puedes listar tu ticket en nuestro marketplace integrado.',
      helpful: 91
    },
    {
      id: 6,
      category: 'security',
      question: '¿Qué pasa si pierdo acceso a mi wallet?',
      answer: 'Los tickets NFT están en tu wallet, no en nuestros servidores. Si pierdes acceso, necesitarás usar tu frase de recuperación. Te recomendamos hacer backup.',
      helpful: 85
    }
  ];

  const contactMethods = [
    {
      icon: <FaComments />,
      title: 'Chat en Vivo',
      description: 'Respuesta inmediata 24/7',
      action: 'Iniciar Chat',
      available: true
    },
    {
      icon: <FaEnvelope />,
      title: 'Email',
      description: 'Respuesta en 2-4 horas',
      action: 'help@ticketsafer.com',
      available: true
    },
    {
      icon: <FaPhone />,
      title: 'Teléfono',
      description: 'Lun-Vie 9AM-6PM',
      action: '+1 (555) 123-4567',
      available: false
    }
  ];

  const filteredFAQs = faqItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="help-page">
      <div className="help-container">
        <section className="help-contact">
          <h2 className="help-contact-title">Nuestro equipo de soporte está aquí para ayudarte</h2>
          <div className="help-contact-options">
            <div className="contact-option">
              <div className="contact-option-title">
                <FaComments />
                Chat en Vivo
              </div>
              <p className="contact-option-description">Respuesta inmediata 24/7</p>
              <a href="#" className="contact-option-action">Iniciar Chat →</a>
            </div>

            <div className="contact-option">
              <div className="contact-option-title">
                <FaEnvelope />
                Email
              </div>
              <p className="contact-option-description">Respuesta en 2-4 horas</p>
              <a href="mailto:help@ticketsafer.com" className="contact-option-action">help@ticketsafer.com →</a>
            </div>

            <div className="contact-option">
              <div className="contact-option-title">
                <FaPhone />
                Teléfono
              </div>
              <p className="contact-option-description">Lun-Vie 9AM-6PM</p>
              <a href="tel:+1555123456" className="contact-option-action">+1 (555) 123-456 →</a>
            </div>
          </div>
        </section>

        <section className="help-resources">
          <h2 className="help-resources-title">Recursos Adicionales</h2>
          <div className="resources-list">
            <a href="/docs" className="resource-item">
              <div className="resource-title">
                <IoDocumentText /> Documentación
              </div>
              <p className="resource-description">Guías técnicas y API docs para desarrolladores</p>
            </a>

            <a href="/faq" className="resource-item">
              <div className="resource-title">
                <IoHelpCircle /> FAQ Completo
              </div>
              <p className="resource-description">Todas las preguntas frecuentes organizadas por tema</p>
            </a>

            <a href="/security" className="resource-item">
              <div className="resource-title">
                <IoShieldCheckmark /> Seguridad
              </div>
              <p className="resource-description">Mejores prácticas para proteger tus assets</p>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HelpPage; 