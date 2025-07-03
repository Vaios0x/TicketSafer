import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaUser, FaPaperPlane, FaTimes, FaMicrophone, FaStar } from 'react-icons/fa';

const AIChat = ({ isOpen, onClose, userProfile }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: `¡Hola! Soy tu asistente IA personalizado para el perfil de ${userProfile}. ¿En qué puedo ayudarte hoy?`,
      timestamp: new Date(),
      suggestions: [
        'Mostrar resumen de actividad',
        'Analizar tendencias',
        'Recomendaciones personalizadas'
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const predefinedResponses = {
    asistente: {
      'resumen': '📊 Esta semana has guardado 3 eventos nuevos y tienes 2 tickets para eventos próximos. Tu evento más esperado es el "Festival de Jazz" este sábado.',
      'tendencias': '📈 Los eventos de música electrónica están en tendencia en tu área. También hay un aumento del 40% en eventos gastronómicos.',
      'recomendaciones': '🎯 Basado en tu historial, te recomiendo: "Concierto Acústico" (85% match), "Feria de Arte Contemporáneo" (78% match), y "Workshop de Cocina" (72% match).'
    },
    organizador: {
      'resumen': '💼 Tienes 4 eventos activos con 1,247 tickets vendidos. Ingresos de $12,450 este mes (+15%). Tu evento "Rock Fest" tiene el mejor rendimiento.',
      'tendencias': '📊 Las ventas de tickets aumentan 23% los viernes por la tarde. Los eventos de fin de semana tienen 67% más engagement.',
      'recomendaciones': '🚀 Sugerencias: Lanza promoción flash para "Jazz Night", programa posts en redes para las 7PM, y considera evento matutino para familias.'
    },
    admin: {
      'resumen': '⚡ La plataforma tiene 28,459 usuarios activos (+5.2%). 342 eventos registrados con 15,678 transacciones. Índice de seguridad: 99.8%.',
      'tendencias': '📈 Crecimiento sostenido en nuevos usuarios. Pico de actividad los miércoles. Eventos musicales generan 45% más transacciones.',
      'recomendaciones': '🔧 Optimizar servidor para picos de tráfico, implementar cache avanzado, y revisar métricas de retención de usuarios.'
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simular respuesta de IA
    setTimeout(() => {
      const responseKey = Object.keys(predefinedResponses[userProfile]).find(key => 
        inputValue.toLowerCase().includes(key)
      );
      
      const aiResponse = {
        id: Date.now() + 1,
        type: 'ai',
        content: responseKey 
          ? predefinedResponses[userProfile][responseKey]
          : `Entiendo tu consulta sobre "${inputValue}". Como asistente especializado en ${userProfile}, estoy procesando esta información y pronto tendré insights personalizados para ti. 🤖✨`,
        timestamp: new Date(),
        suggestions: responseKey ? [] : [
          'Ver más detalles',
          'Generar reporte',
          'Configurar alerta'
        ]
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    handleSendMessage();
  };

  const handleVoiceInput = () => {
    setIsListening(!isListening);
    // Simular reconocimiento de voz
    if (!isListening) {
      setTimeout(() => {
        setInputValue('Muéstrame el resumen de esta semana');
        setIsListening(false);
      }, 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="ai-chat-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="ai-chat-container"
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header del Chat */}
          <div className="chat-header">
            <div className="chat-avatar">
              <FaRobot />
              <div className="avatar-pulse"></div>
            </div>
            <div className="chat-info">
              <h3>Asistente IA Neural</h3>
              <p>Especializado en {userProfile}</p>
            </div>
            <button className="chat-close" onClick={onClose}>
              <FaTimes />
            </button>
          </div>

          {/* Mensajes */}
          <div className="chat-messages">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                className={`message ${message.type}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="message-avatar">
                  {message.type === 'ai' ? <FaRobot /> : <FaUser />}
                </div>
                <div className="message-content">
                                     <div className="message-bubble">
                     {message.content}
                     {message.type === 'ai' && <FaStar className="ai-sparkle" />}
                   </div>
                  <div className="message-time">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                  
                  {/* Sugerencias */}
                  {message.suggestions && message.suggestions.length > 0 && (
                    <div className="message-suggestions">
                      {message.suggestions.map((suggestion, index) => (
                        <motion.button
                          key={index}
                          className="suggestion-chip"
                          onClick={() => handleSuggestionClick(suggestion)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {suggestion}
                        </motion.button>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
            
            {/* Indicador de escritura */}
            {isTyping && (
              <motion.div
                className="message ai"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="message-avatar">
                  <FaRobot />
                </div>
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="chat-input">
            <div className="input-wrapper">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Escribe tu mensaje o pregunta..."
                className="chat-input-field"
              />
              <motion.button
                className={`voice-btn ${isListening ? 'listening' : ''}`}
                onClick={handleVoiceInput}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaMicrophone />
              </motion.button>
              <motion.button
                className="send-btn"
                onClick={handleSendMessage}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                disabled={!inputValue.trim()}
              >
                <FaPaperPlane />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AIChat; 