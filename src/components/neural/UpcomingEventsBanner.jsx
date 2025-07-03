import React from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaArrowRight } from 'react-icons/fa';
import '../../styles/upcoming-events.css';

const UpcomingEventsBanner = ({ events = [] }) => {
  return (
    <div className="upcoming-events-banner">
      <div className="banner-header">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Próximos Eventos
        </motion.h2>
        <motion.div
          className="banner-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          No te pierdas los eventos más esperados
        </motion.div>
      </div>

      <div className="events-timeline">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            className="timeline-event"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <div className="event-date">
              <FaCalendarAlt />
              <span>{event.date}</span>
            </div>
            
            <div className="event-details">
              <h3>{event.title}</h3>
              <div className="event-info">
                <span>
                  <FaMapMarkerAlt />
                  {event.location}
                </span>
                <span>
                  <FaClock />
                  {event.time}
                </span>
              </div>
            </div>

            <motion.button
              className="event-action"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Ver Detalles
              <FaArrowRight />
            </motion.button>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="banner-footer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <button className="view-all-button">
          Ver Todos los Eventos
          <FaArrowRight />
        </button>
      </motion.div>
    </div>
  );
};

export default UpcomingEventsBanner; 