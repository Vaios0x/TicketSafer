import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../../styles/event-calendar.css';

moment.locale('es');
const localizer = momentLocalizer(moment);

const EventCalendar = ({ events, searchTerm, filters }) => {
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    // Filtrar eventos
    const filtered = events.filter(event => {
      // Búsqueda por texto
      const searchMatch = !searchTerm || 
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase());

      // Filtro por categoría
      const categoryMatch = !filters.category || filters.category === 'todo' || 
        event.category.toLowerCase() === filters.category.toLowerCase();

      // Filtro por ubicación
      const locationMatch = !filters.location || 
        event.location.toLowerCase().includes(filters.location.toLowerCase());

      // Filtro por fecha
      const dateMatch = !filters.date || 
        new Date(event.date).toLocaleDateString() === new Date(filters.date).toLocaleDateString();

      return searchMatch && categoryMatch && locationMatch && dateMatch;
    });

    // Formatear eventos para el calendario
    const formattedEvents = filtered.map(event => {
      const eventDate = new Date(event.date);
      const startDate = new Date(eventDate);
      startDate.setHours(19, 0, 0);
      
      const endDate = new Date(eventDate);
      endDate.setHours(23, 0, 0);

      return {
        ...event,
        start: startDate,
        end: endDate
      };
    });

    setFilteredEvents(formattedEvents);
  }, [events, searchTerm, filters]);

  const eventStyleGetter = (event) => {
    let backgroundColor = '#3b82f6';
    
    // Colores por categoría
    switch (event.category.toLowerCase()) {
      case 'musica':
        backgroundColor = '#8b5cf6';
        break;
      case 'deportes':
        backgroundColor = '#10b981';
        break;
      case 'teatro':
        backgroundColor = '#ec4899';
        break;
      case 'festival':
        backgroundColor = '#f43f5e';
        break;
      case 'cultura':
        backgroundColor = '#f59e0b';
        break;
      case 'gastronomia':
        backgroundColor = '#ef4444';
        break;
      default:
        backgroundColor = '#3b82f6';
    }

    return {
      style: {
        backgroundColor,
        borderRadius: '4px',
        opacity: 0.8,
        color: 'white',
        border: '0',
        display: 'block'
      }
    };
  };

  return (
    <div className="event-calendar">
      <Calendar
        localizer={localizer}
        events={filteredEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 250px)' }}
        eventPropGetter={eventStyleGetter}
        views={['month', 'week', 'day']}
        defaultView="month"
        messages={{
          next: "Siguiente",
          previous: "Anterior",
          today: "Hoy",
          month: "Mes",
          week: "Semana",
          day: "Día",
          noEventsInRange: "No hay eventos en este rango de fechas"
        }}
      />
    </div>
  );
};

export default EventCalendar; 