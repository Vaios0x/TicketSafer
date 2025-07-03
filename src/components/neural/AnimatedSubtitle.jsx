import React from 'react';
import { motion } from 'framer-motion';

const AnimatedSubtitle = () => {
  // Texto del subtítulo con palabras destacadas marcadas
  const subtitleText = "Opera en {Ethereum}, {Arbitrum}, {Optimism} y {Polygon} para máxima seguridad y eficiencia";
  
  // Mapeo de palabras destacadas a sus clases CSS
  const highlightMap = {
    'Ethereum': 'ethereum',
    'Arbitrum': 'arbitrum', 
    'Optimism': 'optimism',
    'Polygon': 'polygon'
  };

  // Función para procesar el texto y crear elementos con highlight
  const processText = (text) => {
    const parts = text.split(/(\{[^}]+\})/);
    return parts.map((part, index) => {
      if (part.startsWith('{') && part.endsWith('}')) {
        const word = part.slice(1, -1);
        const highlightClass = highlightMap[word] || '';
        return (
          <span 
            key={index} 
            className={`subtitle-highlight ${highlightClass}`}
          >
            {word}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
    >
      <p className="neural-hero-subtitle">
        {processText(subtitleText)}
      </p>
    </motion.div>
  );
};

export default AnimatedSubtitle; 