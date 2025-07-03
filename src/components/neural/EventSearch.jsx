import React, { useState, useEffect } from 'react';
import { FaSearch, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import { 
  FaMusic, FaTheaterMasks, FaFootballBall, FaGuitar, 
  FaUsers, FaUserGraduate, FaPalette, FaLaptop,
  FaUtensils, FaHeartbeat, FaGamepad, FaNetworkWired,
  FaTools, FaTicketAlt, FaGlobe, FaCompass
} from 'react-icons/fa';
import '../../styles/event-search.css';

const EventSearch = ({ onSearch, initialFilters = {} }) => {
  const [filters, setFilters] = useState({
    query: '',
    location: '',
    date: '',
    category: 'todo'
  });

  // Inicializar filtros con valores iniciales
  useEffect(() => {
    if (initialFilters) {
      setFilters({
        query: initialFilters.query || '',
        location: initialFilters.location || '',
        date: initialFilters.date || '',
        category: initialFilters.category || 'todo'
      });
    }
  }, [initialFilters]);

  const categories = [
    { id: 'todo', label: 'Todo', icon: FaGlobe, description: 'Todos los eventos' },
    { id: 'musica', label: 'Música', icon: FaMusic, description: 'Conciertos y eventos musicales' },
    { id: 'deportes', label: 'Deportes', icon: FaFootballBall, description: 'Eventos deportivos' },
    { id: 'teatro', label: 'Teatro', icon: FaTheaterMasks, description: 'Obras de teatro y espectáculos' },
    { id: 'comedia', label: 'Comedia', icon: FaTheaterMasks, description: 'Shows de comedia y stand-up' },
    { id: 'festivales', label: 'Festivales', icon: FaGuitar, description: 'Festivales de música y cultura' },
    { id: 'conciertos', label: 'Conciertos', icon: FaMusic, description: 'Conciertos en vivo' },
    { id: 'corporativos', label: 'Corporativos', icon: FaUsers, description: 'Eventos empresariales' },
    { id: 'conferencias', label: 'Conferencias', icon: FaUserGraduate, description: 'Conferencias y seminarios' },
    { id: 'exposiciones', label: 'Exposiciones', icon: FaPalette, description: 'Exposiciones de arte y cultura' },
    { id: 'gastronomia', label: 'Gastronomía', icon: FaUtensils, description: 'Eventos gastronómicos' },
    { id: 'tecnologia', label: 'Tecnología', icon: FaLaptop, description: 'Eventos de tecnología' },
    { id: 'educacion', label: 'Educación', icon: FaUserGraduate, description: 'Eventos educativos' },
    { id: 'arte', label: 'Arte y Cultura', icon: FaPalette, description: 'Eventos culturales y artísticos' },
    { id: 'salud', label: 'Salud', icon: FaHeartbeat, description: 'Eventos de salud y bienestar' },
    { id: 'gaming', label: 'Gaming', icon: FaGamepad, description: 'Eventos de videojuegos' },
    { id: 'networking', label: 'Networking', icon: FaNetworkWired, description: 'Eventos de networking' },
    { id: 'talleres', label: 'Talleres', icon: FaTools, description: 'Talleres y cursos' }
  ];

  const locations = [
    { id: '', label: 'Cualquier ubicación' },
    { id: 'CDMX', label: 'Ciudad de México' },
    { id: 'Guadalajara', label: 'Guadalajara' },
    { id: 'Monterrey', label: 'Monterrey' }
  ];

  // Manejar cambios en los filtros
  const handleFilterChange = (type, value) => {
    const newFilters = {
      ...filters,
      [type === 'search' ? 'query' : type]: value
    };
    setFilters(newFilters);
    
    // Llamar a onSearch con todos los filtros actualizados
    if (onSearch) {
      onSearch(newFilters);
    }
  };

  return (
    <div className="event-search-container">
      <div className="event-search-header">
        <FaCompass className="header-icon" aria-hidden="true" />
        <h2>Explorar Eventos</h2>
        <p className="header-subtitle">Descubre experiencias únicas cerca de ti</p>
      </div>

      {/* Barra de búsqueda principal */}
      <div className="main-search-container">
        <div className="search-wrapper">
          <div className="main-search-input">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Buscar eventos, artistas, lugares..."
              value={filters.query}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              aria-label="Buscar eventos"
            />
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="filters-container">
        <div className="filters-wrapper">
          <div className="filter-group">
            <div className="filter-header">
              <FaMapMarkerAlt className="filter-icon" />
              <span>Ubicación</span>
            </div>
            <select
              value={filters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
              aria-label="Seleccionar ubicación"
            >
              {locations.map(location => (
                <option key={location.id} value={location.id}>
                  {location.label}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <div className="filter-header">
              <FaCalendarAlt className="filter-icon" />
              <span>Fecha</span>
            </div>
            <input
              type="date"
              value={filters.date}
              onChange={(e) => handleFilterChange('date', e.target.value)}
              aria-label="Seleccionar fecha"
            />
          </div>
        </div>
      </div>

      {/* Categorías */}
      <div className="categories-container">
        <div className="categories-grid">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`category-button ${filters.category === category.id ? 'active' : ''}`}
              onClick={() => handleFilterChange('category', category.id)}
              aria-label={`Categoría ${category.label}`}
              title={category.description}
            >
              <category.icon className="category-icon" aria-hidden="true" />
              <span className="category-label">{category.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventSearch; 