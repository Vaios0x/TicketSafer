import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaCalendarAlt, 
  FaMapMarkerAlt, 
  FaTicketAlt,
  FaExchangeAlt, 
  FaGavel,
  FaEthereum,
  FaUsers,
  FaHeart,
  FaBookmark,
  FaShare,
  FaChartLine
} from 'react-icons/fa';
import { SiPolygon } from 'react-icons/si';

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=2070&q=80';

const EventCard = ({ event, onClick }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleDateString('es-ES', { month: 'short' });
    const year = date.getFullYear();
    const weekday = date.toLocaleDateString('es-ES', { weekday: 'short' });
    
    return `${weekday}, ${day} ${month} ${year}`;
  };

  const getAvailabilityClass = (available, total) => {
    const percentage = (available / total) * 100;
    if (percentage <= 10) return 'critical';
    if (percentage <= 20) return 'low';
    if (percentage <= 50) return 'medium';
    return 'high';
  };

  const formatPrice = (price, currency) => {
    if (price === 0 || price === '0') return 'Gratis';
    
    switch (currency) {
      case 'ETH':
        return `${price} ETH`;
      case 'MATIC':
        return `${price} MATIC`;
      case 'MXN':
        return `$${price} MXN`;
      case 'USD':
        return `$${price} USD`;
      default:
        return price;
    }
  };

  const getAvailabilityColor = (available, total) => {
    const percentage = (available / total) * 100;
    if (percentage <= 20) return '#ef4444';
    if (percentage <= 50) return '#f59e0b';
    return '#10b981';
  };

  const getAvailabilityText = (available, total) => {
    const percentage = (available / total) * 100;
    if (percentage <= 10) return 'Últimos tickets';
    if (percentage <= 20) return 'Pocas entradas';
    if (percentage <= 50) return 'Disponibilidad media';
    return 'Alta disponibilidad';
  };

  return (
    <motion.div 
      className="event-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <div className="event-image-container">
        <img src={event.image || DEFAULT_IMAGE} alt={event.title} className="event-image" />
        <div className="image-overlay" />
        
        <div className="event-badges">
          {event.isFeatured && (
            <div className="badge featured">
              <FaChartLine className="badge-icon" />
              Destacado
            </div>
          )}
          {event.allowResale && (
            <div className="badge resale">
              <FaExchangeAlt className="badge-icon" />
              Reventa
            </div>
          )}
          {event.allowAuction && (
            <div className="badge auction">
              <FaGavel className="badge-icon" />
              Subasta
            </div>
          )}
        </div>

        <div className="event-actions">
          <motion.button
            className="action-button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaHeart />
          </motion.button>
          <motion.button
            className="action-button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaBookmark />
          </motion.button>
          <motion.button
            className="action-button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaShare />
          </motion.button>
        </div>
      </div>

      <div className="event-content">
        <div className="title-section">
          <h3 className="event-title">{event.title}</h3>
          <p className="event-subtitle">{event.description}</p>
        </div>

        <div className="event-info-compact">
          <div className="info-row">
            <div 
              className="info-item date-info"
              data-tooltip={`Evento: ${formatDate(event.date)}`}
            >
            <FaCalendarAlt className="info-icon" />
              <span className="info-text">{formatDate(event.date)}</span>
            </div>
            <div 
              className="info-item location-info"
              data-tooltip={`Ubicación: ${event.location}`}
            >
            <FaMapMarkerAlt className="info-icon" />
              <span className="info-text location-truncate">{event.location}</span>
              <div className={`chain-indicator ${event.chain}`}></div>
            </div>
          </div>

          <div className="info-row">
            <div 
              className={`info-item availability ${getAvailabilityClass(event.availableTickets, event.totalTickets)}`}
              data-tooltip={`${Math.round((event.availableTickets / event.totalTickets) * 100)}% disponible`}
            >
              <FaUsers className="info-icon" />
              <div className="availability-content">
                <span className="info-text">
                  {event.availableTickets}/{event.totalTickets} disponibles
                </span>
                <span className="availability-status" style={{ color: getAvailabilityColor(event.availableTickets, event.totalTickets) }}>
                  {getAvailabilityText(event.availableTickets, event.totalTickets)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="prices-section">
          {/* Precio principal */}
          <div className="price-main">
            <div className="price-row">
              <span className="price-label">Precio desde</span>
              <div className="price-value">
                <span className="currency-icon">
                  {event.currency === 'ETH' && <FaEthereum />}
                  {event.currency === 'MATIC' && <SiPolygon />}
                </span>
                <span className="price-amount">{formatPrice(event.price, event.currency)}</span>
              </div>
            </div>
          </div>

          {/* Precio de reventa */}
          {event.allowResale && (
            <div className="price-resale">
              <div className="price-row">
                <span className="price-label">Reventa desde</span>
                <div className="price-value">
                  <span className="currency-icon">
                    {event.resaleCurrency === 'ETH' && <FaEthereum />}
                    {event.resaleCurrency === 'MATIC' && <SiPolygon />}
                  </span>
                  <span className="price-amount">{formatPrice(event.resalePrice, event.resaleCurrency)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Precio de subasta */}
          {event.allowAuction && (
            <div className="price-auction">
              <div className="price-row">
                <span className="price-label">Puja actual</span>
                <div className="price-value">
                  <span className="currency-icon">
                    {event.auctionCurrency === 'ETH' && <FaEthereum />}
                    {event.auctionCurrency === 'MATIC' && <SiPolygon />}
                  </span>
                  <span className="price-amount">{formatPrice(event.currentBid, event.auctionCurrency)}</span>
                </div>
              </div>
              <div className="auction-time">Termina en {event.auctionTimeLeft}</div>
            </div>
          )}
        </div>

        <motion.button
          className="buy-button" 
          onClick={() => onClick(event)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <FaTicketAlt className="button-icon" />
          VER TICKETS
        </motion.button>
      </div>
    </motion.div>
  );
};

export default EventCard; 