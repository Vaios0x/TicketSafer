import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  FaTicketAlt, 
  FaLock, 
  FaChartLine, 
  FaUsers, 
  FaNetworkWired,
  FaGasPump,
  FaExchangeAlt,
  FaShieldAlt 
} from 'react-icons/fa';
import EventsGrid from './EventsGrid';
import HeroSearch from './HeroSearch';
import BlockchainIcons from './BlockchainIcons';
import AnimatedSubtitle from './AnimatedSubtitle';
import FeaturedEventsCarousel from './FeaturedEventsCarousel';
import UpcomingEventsBanner from './UpcomingEventsBanner';
import RealTimeStats from './RealTimeStats';
import TestimonialsCarousel from './TestimonialsCarousel';
import '../../styles/event-card.css';

// Datos de ejemplo para los componentes
const featuredEvents = [
  {
    id: 1,
    title: "Concierto de Rock en Vivo",
    date: "2024-07-15",
    location: "Arena Ciudad de México",
    price: "0.1 ETH",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: 2,
    title: "Festival de Arte Digital",
    date: "2024-08-20",
    location: "Centro Cultural Digital",
    price: "0.05 ETH",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: 3,
    title: "Conferencia Blockchain 2024",
    date: "2024-09-10",
    location: "Centro de Convenciones",
    price: "0.15 ETH",
    image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&w=2070&q=80"
  }
];

const upcomingEvents = [
  {
    id: 1,
    title: "ETH México 2024",
    date: "15 Jul",
    time: "10:00 AM",
    location: "CDMX"
  },
  {
    id: 2,
    title: "NFT Art Gallery",
    date: "20 Jul",
    time: "6:00 PM",
    location: "Galería Digital"
  },
  {
    id: 3,
    title: "Hackathon Web3",
    date: "25 Jul",
    time: "9:00 AM",
    location: "Tech Hub"
  }
];

const testimonials = [
  {
    id: 1,
    text: "TicketSafer ha revolucionado la forma en que compro entradas. La seguridad blockchain y la facilidad de uso son increíbles.",
    name: "María González",
    role: "Organizadora de Eventos",
    rating: 5,
    avatar: "/assets/testimonials/maria.jpg"
  },
  {
    id: 2,
    text: "Como artista, me encanta la transparencia y la protección contra la reventa que ofrece la plataforma.",
    name: "Carlos Ruiz",
    role: "Músico Independiente",
    rating: 5,
    avatar: "/assets/testimonials/carlos.jpg"
  },
  {
    id: 3,
    text: "La integración multichain es brillante. Puedo usar la red que prefiera con tarifas mínimas.",
    name: "Ana Martínez",
    role: "Crypto Entusiasta",
    rating: 5,
    avatar: "/assets/testimonials/ana.jpg"
  }
];

const NeuralHome = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: 'all',
    location: 'all',
    date: '',
    dateRange: 'all',
    chain: 'all',
    type: 'destacados',
    currency: 'all',
    priceRange: 'all',
    venue: 'all'
  });

  const handleSearch = (searchData) => {
    if (searchData.query) {
      setSearchTerm(searchData.query);
    }
    if (searchData.filters) {
      setFilters(prev => ({
        ...prev,
        ...searchData.filters
      }));
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters
    }));
  };

  return (
    <div className="neural-home">
      {/* Hero Section */}
      <section className="neural-hero particle-field-neural">
        <div className="neural-hero-content">
          <motion.h1 
            className="neon-hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Encuentra tu <span className="neon-highlight-word highlight-multichain">próxima</span> <span className="neon-highlight-word highlight-tickets">experiencia</span>
          </motion.h1>
          
          <motion.p 
            className="neural-hero-subtitle-enhanced"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Descubre eventos únicos, artistas increíbles y momentos inolvidables
          </motion.p>
          
          <BlockchainIcons />
          
          <motion.div 
            className="neural-hero-cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.button 
              className="neural-button primary"
              onClick={() => navigate('/eventos')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explorar Eventos
              <div className="button-glow" />
            </motion.button>
            <motion.button 
              className="neural-button secondary"
              onClick={() => navigate('/crear-evento')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Crear Evento
              <div className="button-glow" />
            </motion.button>
          </motion.div>
        </div>
        <div className="ai-scan-line" />
      </section>

      {/* Hero Search Section */}
      <section className="hero-search-section">
        <div className="neural-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <HeroSearch 
              onSearch={handleSearch}
              onFilterChange={handleFilterChange}
            />
          </motion.div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="neural-featured-events">
        <div className="neural-container">
          <FeaturedEventsCarousel events={featuredEvents} />
        </div>
      </section>

      {/* Upcoming Events Banner */}
      <section className="neural-upcoming-events">
        <div className="neural-container">
          <UpcomingEventsBanner events={upcomingEvents} />
        </div>
      </section>

      {/* Real-time Stats Section */}
      <section className="neural-stats-section">
        <div className="neural-container">
          <RealTimeStats />
        </div>
      </section>

      {/* Características Section */}
      <section className="neural-features">
        <div className="neural-container">
          <motion.h2 
            className="section-title gradient-text-neural"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Ventajas Multichain
          </motion.h2>
          
          <div className="features-grid">
            {[
              {
                icon: <FaNetworkWired />,
                title: 'Interoperabilidad Total',
                description: 'Opera sin problemas entre Ethereum, Arbitrum, Optimism y Polygon'
              },
              {
                icon: <FaGasPump />,
                title: 'Costos Optimizados',
                description: 'Aprovecha las bajas tarifas de gas en L2s'
              },
              {
                icon: <FaExchangeAlt />,
                title: 'Liquidez Unificada',
                description: 'Acceso instantáneo a la liquidez de múltiples cadenas'
              },
              {
                icon: <FaShieldAlt />,
                title: 'Seguridad Multicapa',
                description: 'Máxima protección respaldada por múltiples blockchains'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="feature-card neural-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="neural-testimonials">
        <div className="neural-container">
          <TestimonialsCarousel testimonials={testimonials} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="neural-cta">
        <div className="neural-container">
          <motion.div 
            className="cta-content neural-glass"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="gradient-text-neural">Únete a la Revolución Multichain</h2>
            <p>Experimenta el futuro de los tickets digitales con la seguridad y eficiencia de múltiples blockchains</p>
            <button className="neural-button primary">
              Comenzar Ahora
              <div className="button-glow" />
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default NeuralHome; 