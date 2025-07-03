import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaSearch, 
  FaMicrophone, 
  FaCamera, 
  FaTimes, 
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaFilter,
  FaFire,
  FaMusic,
  FaStar,
  FaArrowRight,
  FaHistory,
  FaChartLine,
  FaLocationArrow,
  FaGlobe
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { eventsData } from '../../data/events.js';

const HeroSearch = ({ onSearch: _onSearch, onFilterChange: _onFilterChange }) => {
  const [isActive, setIsActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [showVoiceSearch, setShowVoiceSearch] = useState(false);
  const [recentSearches, setRecentSearches] = useState([
    'Bad Bunny Mexico', 'Taylor Swift Eras Tour', 'Conciertos CDMX'
  ]);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // Premium categories with enhanced styling
  const categories = [
    { id: 'all', label: 'Todo', icon: '🎭', gradient: 'from-purple-500 to-pink-500' },
    { id: 'musica', label: 'Música', icon: '🎵', gradient: 'from-blue-500 to-cyan-500' },
    { id: 'deportes', label: 'Deportes', icon: '⚽', gradient: 'from-green-500 to-emerald-500' },
    { id: 'teatro', label: 'Teatro', icon: '🎪', gradient: 'from-amber-500 to-orange-500' },
    { id: 'comedia', label: 'Comedia', icon: '😂', gradient: 'from-red-500 to-pink-500' },
    { id: 'festival', label: 'Festivales', icon: '🎉', gradient: 'from-indigo-500 to-purple-500' },
    { id: 'conciertos', label: 'Conciertos', icon: '🎤', gradient: 'from-purple-600 to-blue-600' },
    { id: 'eventos-corporativos', label: 'Corporativos', icon: '💼', gradient: 'from-gray-600 to-blue-700' },
    { id: 'conferencias', label: 'Conferencias', icon: '🎯', gradient: 'from-teal-500 to-green-600' },
    { id: 'exposiciones', label: 'Exposiciones', icon: '🖼️', gradient: 'from-orange-500 to-red-600' },
    { id: 'gastronomia', label: 'Gastronomía', icon: '🍽️', gradient: 'from-yellow-500 to-orange-600' },
    { id: 'tecnologia', label: 'Tecnología', icon: '💻', gradient: 'from-cyan-500 to-blue-700' },
    { id: 'educacion', label: 'Educación', icon: '🎓', gradient: 'from-indigo-600 to-purple-700' },
    { id: 'arte-cultura', label: 'Arte y Cultura', icon: '🎨', gradient: 'from-pink-500 to-purple-600' },
    { id: 'salud-bienestar', label: 'Salud', icon: '🧘', gradient: 'from-green-400 to-teal-600' },
    { id: 'gaming-esports', label: 'Gaming', icon: '🎮', gradient: 'from-violet-500 to-purple-700' },
    { id: 'networking', label: 'Networking', icon: '🤝', gradient: 'from-blue-600 to-indigo-700' },
    { id: 'talleres', label: 'Talleres', icon: '🔧', gradient: 'from-amber-600 to-orange-700' }
  ];

  // Premium locations
  const locations = [
    { id: 'cdmx', label: 'Ciudad de México', icon: '🏙️' },
    { id: 'guadalajara', label: 'Guadalajara', icon: '🌮' },
    { id: 'monterrey', label: 'Monterrey', icon: '🏔️' },
    { id: 'puebla', label: 'Puebla', icon: '⛪' },
    { id: 'cancun', label: 'Cancún', icon: '🏖️' }
  ];

  const handleSearch = () => {
    // Add to recent searches
    if (searchQuery.trim()) {
      setRecentSearches(prev => [
        searchQuery,
        ...prev.filter(search => search !== searchQuery).slice(0, 4)
      ]);
    }
    
    // Preparar los parámetros de búsqueda
    const searchParams = new URLSearchParams();
    
    if (searchQuery.trim()) {
      searchParams.set('q', searchQuery.trim());
    }
    
    if (selectedCategory && selectedCategory !== 'all') {
      searchParams.set('category', selectedCategory);
    }
    
    if (selectedLocation && selectedLocation !== '') {
      searchParams.set('location', selectedLocation);
    }
    
    if (selectedDate) {
      searchParams.set('date', selectedDate);
    }
    
    // Navegar a la página de eventos con los parámetros
    const queryString = searchParams.toString();
    navigate(`/eventos${queryString ? `?${queryString}` : ''}`);
    
    setShowSuggestions(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    
    // Si hay una categoría específica seleccionada, hacer búsqueda inmediata
    if (categoryId !== 'all') {
      const searchParams = new URLSearchParams();
      searchParams.set('category', categoryId);
      
      if (searchQuery.trim()) {
        searchParams.set('q', searchQuery.trim());
      }
      
      if (selectedLocation && selectedLocation !== '') {
        searchParams.set('location', selectedLocation);
      }
      
      if (selectedDate) {
        searchParams.set('date', selectedDate);
      }
      
      navigate(`/eventos?${searchParams.toString()}`);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
        setIsActive(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="hero-search-premium">
      <motion.div 
        className="search-container-premium"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {/* Premium Header */}
        <div className="search-header-premium">
          <motion.h2 
            className="search-title-premium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Encuentra tu próxima experiencia
          </motion.h2>
          <motion.p 
            className="search-subtitle-premium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Descubre eventos únicos, artistas increíbles y momentos inolvidables
          </motion.p>
        </div>

        {/* Main Search Interface */}
        <motion.div 
          className={`search-bar-premium ${isActive ? 'active' : ''}`}
          ref={searchRef}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
        >
          {/* Enhanced Search Input */}
          <div className="search-input-section">
            <div className="search-input-wrapper-premium">
              <FaSearch className="search-icon-premium" />
              <input
                type="text"
                placeholder="¿Qué quieres vivir hoy?"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => {
                  setIsActive(true);
                  setShowSuggestions(true);
                }}
                onKeyPress={handleKeyPress}
                className="search-input-premium"
              />
              
              {/* Voice and Camera Search */}
              <div className="search-actions-premium">
                <motion.button
                  className="action-btn voice-btn"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowVoiceSearch(!showVoiceSearch)}
                >
                  <FaMicrophone />
                </motion.button>
                <motion.button
                  className="action-btn camera-btn"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaCamera />
                </motion.button>
              </div>

              {searchQuery && (
                <motion.button
                  className="clear-btn-premium"
                  onClick={() => setSearchQuery('')}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <FaTimes />
                </motion.button>
              )}
            </div>

            {/* Quick Filters */}
            <div className="quick-filters-premium">
              <div className="filter-section">
                <FaMapMarkerAlt className="filter-icon" />
                <select 
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="filter-select-premium"
                >
                  <option value="">Cualquier ubicación</option>
                  {locations.map(location => (
                    <option key={location.id} value={location.id}>
                      {location.icon} {location.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter-section">
                <FaCalendarAlt className="filter-icon" />
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="filter-select-premium"
                />
              </div>

              <motion.button
                className="search-btn-premium"
                onClick={handleSearch}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaSearch />
                <span>Buscar</span>
                <FaArrowRight className="arrow-icon" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Premium Category Cards */}
        <motion.div 
          className="category-cards-premium"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              className={`category-card-premium ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => handleCategoryClick(category.id)}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.1 + index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="category-emoji">{category.icon}</div>
              <span className="category-label">{category.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Voice Search Modal */}
      <AnimatePresence>
        {showVoiceSearch && (
          <motion.div
            className="voice-search-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowVoiceSearch(false)}
          >
            <motion.div 
              className="voice-search-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="voice-animation">
                <div className="pulse-ring"></div>
                <div className="pulse-ring delay-1"></div>
                <div className="pulse-ring delay-2"></div>
                <FaMicrophone className="voice-icon" />
              </div>
              <h3>Escuchando...</h3>
              <p>Di el nombre del evento o artista que buscas</p>
              <button 
                className="voice-close-btn"
                onClick={() => setShowVoiceSearch(false)}
              >
                <FaTimes />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HeroSearch; 