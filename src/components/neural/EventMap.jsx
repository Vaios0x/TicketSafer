import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import Map, { 
  Marker, 
  Popup, 
  NavigationControl,
  ScaleControl,
  GeolocateControl,
  FullscreenControl,
  Source,
  Layer
} from 'react-map-gl';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMapMarkerAlt, FaCalendarAlt, FaTicketAlt, FaCompass } from 'react-icons/fa';
import 'mapbox-gl/dist/mapbox-gl.css';
import '../../styles/event-map.css';
import mapboxgl from 'mapbox-gl';

// Constantes del mapa
const INITIAL_VIEW_STATE = {
  latitude: 19.4326,
  longitude: -99.1332,
  zoom: 11,
  bearing: 45, // Rotación del mapa para efecto 3D
  pitch: 60    // Inclinación para vista 3D (0-85 grados)
};

// Opciones de estilos de mapas
const MAP_STYLES = {
  STREETS: 'mapbox://styles/mapbox/streets-v12',
  SATELLITE: 'mapbox://styles/mapbox/satellite-streets-v12',
  VIBRANT: 'mapbox://styles/mapbox/navigation-day-v1',
  LIGHT: 'mapbox://styles/mapbox/light-v11',
  DARK: 'mapbox://styles/mapbox/dark-v11'
};

const MAP_STYLE = MAP_STYLES.VIBRANT; // Estilo por defecto

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

const EventMap = ({ events, searchTerm, filters }) => {
  const [viewport, setViewport] = useState(INITIAL_VIEW_STATE);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [currentMapStyle, setCurrentMapStyle] = useState(MAP_STYLE);
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [is3D, setIs3D] = useState(true);

  // Memoizar el token de Mapbox
  const mapboxToken = useMemo(() => import.meta.env.VITE_MAPBOX_TOKEN, []);

  // Memoizar los marcadores de eventos para evitar re-renders innecesarios
  const eventMarkers = useMemo(() => events.map((event) => (
    <Marker
      key={event.id}
      latitude={event.latitude}
      longitude={event.longitude}
      anchor="bottom"
    >
      <motion.div
        className="event-marker"
        onClick={() => handleMarkerClick(event)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        style={{
          backgroundColor: event.isFeatured ? '#8b5cf6' : '#3b82f6',
          border: `2px solid ${event.isFeatured ? '#a78bfa' : '#60a5fa'}`
        }}
      >
        <FaMapMarkerAlt />
      </motion.div>
    </Marker>
  )), [events]);

  // Optimizar el manejo de clicks en marcadores
  const handleMarkerClick = useCallback((event) => {
    setSelectedEvent(event);
  }, []);

  const handlePopupClose = useCallback(() => {
    setSelectedEvent(null);
  }, []);

  // Optimizar la función de centrado en ubicación del usuario
  const centerOnUserLocation = useCallback(() => {
    if (userLocation) {
      setViewport(prev => ({
        ...prev,
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        zoom: 13,
        transitionDuration: 1000
      }));
    }
  }, [userLocation]);

  // Manejar errores de carga del mapa
  const handleMapError = useCallback((error) => {
    console.error('Error cargando el mapa:', error);
    // Aquí podrías implementar un sistema de notificación al usuario
  }, []);

  // Optimizar el manejo de cambios en el viewport
  const handleViewportChange = useCallback((newViewport) => {
    setViewport(newViewport);
  }, []);

  // Función para cambiar el estilo del mapa
  const changeMapStyle = useCallback((style) => {
    setCurrentMapStyle(MAP_STYLES[style]);
  }, []);

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

    setFilteredEvents(filtered);
  }, [events, searchTerm, filters]);

  useEffect(() => {
    if (!map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: `mapbox://styles/mapbox/${currentMapStyle}`,
        center: [-99.1332, 19.4326], // Centro en CDMX
        zoom: 11,
        pitch: is3D ? 60 : 0,
        bearing: is3D ? 45 : 0
      });

      map.current.addControl(new mapboxgl.NavigationControl());

      // Agregar terreno 3D
      map.current.on('style.load', () => {
        if (is3D) {
          map.current.addSource('mapbox-dem', {
            'type': 'raster-dem',
            'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
            'tileSize': 512,
            'maxzoom': 14
          });
          map.current.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });
          
          map.current.addLayer({
            'id': 'sky',
            'type': 'sky',
            'paint': {
              'sky-type': 'atmosphere',
              'sky-atmosphere-sun': [0.0, 90.0],
              'sky-atmosphere-sun-intensity': 15
            }
          });
        }
      });
    }

    return () => map.current?.remove();
  }, [currentMapStyle, is3D]);

  // Actualizar marcadores cuando cambian los eventos filtrados
  useEffect(() => {
    if (!map.current) return;

    // Limpiar marcadores existentes
    const markers = document.getElementsByClassName('mapboxgl-marker');
    while (markers[0]) {
      markers[0].remove();
    }

    // Agregar nuevos marcadores
    filteredEvents.forEach((event) => {
      const markerColor = getCategoryColor(event.category);
      
      const popup = new mapboxgl.Popup({ offset: 25 })
        .setHTML(`
          <div class="event-popup">
            <h3>${event.title}</h3>
            <p>${event.description}</p>
            <p><strong>Fecha:</strong> ${new Date(event.date).toLocaleDateString()}</p>
            <p><strong>Ubicación:</strong> ${event.location}</p>
            <p><strong>Precio:</strong> ${event.price} ${event.currency}</p>
          </div>
        `);

      const el = document.createElement('div');
      el.className = 'marker';
      el.style.backgroundColor = markerColor;

      new mapboxgl.Marker(el)
        .setLngLat([event.longitude, event.latitude])
        .setPopup(popup)
        .addTo(map.current);
    });

    // Ajustar el mapa para mostrar todos los marcadores
    if (filteredEvents.length > 0) {
      const bounds = new mapboxgl.LngLatBounds();
      filteredEvents.forEach(event => {
        bounds.extend([event.longitude, event.latitude]);
      });
      map.current.fitBounds(bounds, { padding: 50 });
    }
  }, [filteredEvents]);

  const getCategoryColor = (category) => {
    const colors = {
      musica: '#8b5cf6',
      deportes: '#10b981',
      teatro: '#ec4899',
      festival: '#f43f5e',
      cultura: '#f59e0b',
      gastronomia: '#ef4444',
      default: '#3b82f6'
    };
    return colors[category.toLowerCase()] || colors.default;
  };

  const handleStyleChange = (style) => {
    setCurrentMapStyle(MAP_STYLES[style]);
    map.current.setStyle(`mapbox://styles/mapbox/${style}`);
  };

  const toggle3D = () => {
    setIs3D(!is3D);
    if (!is3D) {
      map.current.setPitch(60);
      map.current.setBearing(45);
    } else {
      map.current.setPitch(0);
      map.current.setBearing(0);
    }
  };

  return (
    <div className="event-map-container">
      <div className="map-header">
        <div className="map-title">
          <FaMapMarkerAlt />
          <h2>Eventos Cercanos</h2>
        </div>
        <div className="map-controls">
          {userLocation && (
            <motion.button
              className="location-button"
              onClick={centerOnUserLocation}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaCompass />
              Mi Ubicación
            </motion.button>
          )}
          <div className="style-buttons">
            <motion.button
              className={`style-button ${currentMapStyle === MAP_STYLES.STREETS ? 'active' : ''}`}
              onClick={() => handleStyleChange('STREETS')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Calles
            </motion.button>
            <motion.button
              className={`style-button ${currentMapStyle === MAP_STYLES.SATELLITE ? 'active' : ''}`}
              onClick={() => handleStyleChange('SATELLITE')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Satélite
            </motion.button>
            <motion.button
              className={`style-button ${currentMapStyle === MAP_STYLES.VIBRANT ? 'active' : ''}`}
              onClick={() => handleStyleChange('VIBRANT')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Vibrante
            </motion.button>
          </div>
          <button
            className={`map-control-button ${is3D ? 'active' : ''}`}
            onClick={toggle3D}
          >
            3D
          </button>
        </div>
      </div>

      <Map
        {...viewport}
        onMove={evt => handleViewportChange(evt.viewState)}
        mapStyle={currentMapStyle}
        mapboxAccessToken={mapboxToken}
        onLoad={() => setMapLoaded(true)}
        onError={handleMapError}
        style={{ width: '100%', height: 'calc(100vh - 250px)' }}
        attributionControl={true}
        reuseMaps
        terrain={{ source: 'mapbox-dem', exaggeration: 1.5 }}
        maxPitch={85}
      >
        {/* Añadir fuente de terreno 3D */}
        <Source
          id="mapbox-dem"
          type="raster-dem"
          url="mapbox://mapbox.mapbox-terrain-dem-v1"
          tileSize={512}
          maxzoom={14}
        />
        {/* Añadir capa de terreno */}
        <Layer
          id="terrain-3d"
          type="sky"
          paint={{
            'sky-type': 'atmosphere',
            'sky-atmosphere-sun': [0.0, 90.0],
            'sky-atmosphere-sun-intensity': 15
          }}
        />

        {/* Controles del mapa */}
        <GeolocateControl 
          position="top-right"
          onGeolocate={(pos) => {
            setUserLocation({
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude
            });
          }}
        />
        <FullscreenControl position="top-right" />
        <NavigationControl position="top-right" showCompass={true} />
        <ScaleControl position="bottom-right" />

        {/* Marcador de ubicación del usuario */}
        {userLocation && (
          <Marker
            latitude={userLocation.latitude}
            longitude={userLocation.longitude}
          >
            <div className="user-location-marker">
              <div className="pulse"></div>
            </div>
          </Marker>
        )}

        {/* Marcadores de eventos */}
        {mapLoaded && eventMarkers}

        {/* Popup de información del evento */}
        <AnimatePresence>
          {selectedEvent && (
            <Popup
              latitude={selectedEvent.latitude}
              longitude={selectedEvent.longitude}
              closeButton={true}
              closeOnClick={false}
              onClose={handlePopupClose}
              anchor="bottom"
              maxWidth="300px"
            >
              <motion.div
                className="event-popup"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
              >
                <img
                  src={selectedEvent.image}
                  alt={selectedEvent.title}
                  className="event-popup-image"
                  loading="lazy"
                />
                <div className="event-popup-content">
                  <h3>{selectedEvent.title}</h3>
                  <div className="event-popup-info">
                    <div className="info-item">
                      <FaCalendarAlt />
                      <span>{selectedEvent.date}</span>
                    </div>
                    <div className="info-item">
                      <FaMapMarkerAlt />
                      <span>{selectedEvent.location}</span>
                    </div>
                    <div className="info-item">
                      <FaTicketAlt />
                      <span>{selectedEvent.price}</span>
                    </div>
                  </div>
                  <motion.button
                    className="view-event-button"
                    onClick={() => onEventClick(selectedEvent)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Ver Evento
                  </motion.button>
                </div>
              </motion.div>
            </Popup>
          )}
        </AnimatePresence>
      </Map>
    </div>
  );
};

export default EventMap; 