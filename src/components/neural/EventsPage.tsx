import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaThLarge, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import EventsGrid from './EventsGrid';
import EventSearch from './EventSearch';
import EventCalendar from './EventCalendar';
import EventMap from './EventMap';
import { eventsData } from '../../data/events.js';
import '../../styles/event-calendar.css';
import '../../styles/event-map.css';
import '../../styles/events-page.css';
import '../../styles/view-controls.css';

interface SearchData {
  query: string;
  category: string;
  location: string;
  date: string;
}

const EventsPage: React.FC = () => {
  const location = useLocation();
  const [view, setView] = useState<'grid' | 'calendar' | 'map'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: 'todo',
    location: '',
    date: '',
  });

  // Actualizar los filtros cuando cambian los parámetros de la URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    
    setSearchTerm(params.get('q') || '');
    setFilters({
      category: params.get('category') || 'todo',
      location: params.get('location') || '',
      date: params.get('date') || '',
    });

    const urlView = params.get('view');
    if (urlView && ['grid', 'calendar', 'map'].includes(urlView)) {
      setView(urlView as 'grid' | 'calendar' | 'map');
    }
  }, [location]);

  const handleSearch = (searchData: SearchData) => {
    setSearchTerm(searchData.query || '');
    setFilters({
      category: searchData.category || 'todo',
      location: searchData.location || '',
      date: searchData.date || '',
    });
  };

  const handleViewChange = (newView: 'grid' | 'calendar' | 'map') => {
    setView(newView);
  };

  return (
    <div className="events-page">
      <EventSearch onSearch={handleSearch} initialFilters={filters} />
      
      <div className="view-controls">
        <button
          className={`view-button ${view === 'grid' ? 'active' : ''}`}
          onClick={() => handleViewChange('grid')}
        >
          <FaThLarge /> Grid
        </button>
        <button
          className={`view-button ${view === 'calendar' ? 'active' : ''}`}
          onClick={() => handleViewChange('calendar')}
        >
          <FaCalendarAlt /> Calendario
        </button>
        <button
          className={`view-button ${view === 'map' ? 'active' : ''}`}
          onClick={() => handleViewChange('map')}
        >
          <FaMapMarkerAlt /> Mapa
        </button>
      </div>

      {view === 'grid' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <EventsGrid
            searchTerm={searchTerm}
            filters={filters}
            enablePagination={true}
          />
        </motion.div>
      )}

      {view === 'calendar' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <EventCalendar
            events={eventsData}
            searchTerm={searchTerm}
            filters={filters}
          />
        </motion.div>
      )}

      {view === 'map' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <EventMap
            events={eventsData}
            searchTerm={searchTerm}
            filters={filters}
          />
        </motion.div>
      )}
    </div>
  );
};

export default EventsPage; 