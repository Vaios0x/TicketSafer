import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaUser, 
  FaChartLine, 
  FaCog, 
  FaTicketAlt,
  FaWallet,
  FaHeart,
  FaBell,
  FaLock,
  FaHistory,
  FaCalendarAlt,
  FaDollarSign,
  FaUsers,
  FaStar,
  FaEdit,
  FaCamera,
  FaSignOutAlt,
  FaToggleOn,
  FaToggleOff
} from 'react-icons/fa';
import { SiPolygon, SiOptimism } from 'react-icons/si';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userType, setUserType] = useState('comprador');
  const [profileData, setProfileData] = useState({
    name: 'Usuario Demo',
    email: 'usuario@ticketsafer.com',
    avatar: null,
    walletAddress: '0x8c...A343',
    joinDate: '2024',
    preferences: {
      notifications: true,
      newsletter: true,
      analytics: false
    }
  });

  // Datos del dashboard por tipo de usuario
  const dashboardData = {
    comprador: {
      tickets: { 
        value: '12', 
        trend: '+2 este mes', 
        color: '#00D4FF',
        icon: FaTicketAlt,
        description: 'Tickets Comprados'
      },
      gastos: { 
        value: '$1,240', 
        trend: '+$150 este mes', 
        color: '#8A2BE2',
        icon: FaWallet,
        description: 'Gastos Totales'
      },
      eventos: { 
        value: '8', 
        trend: '+1 este mes', 
        color: '#FF6B35',
        icon: FaStar,
        description: 'Eventos Asistidos'
      },
      favoritos: { 
        value: '34', 
        trend: '+7 nuevos', 
        color: '#00FF88',
        icon: FaHeart,
        description: 'Eventos Favoritos'
      }
    },
    organizador: {
      tickets: { 
        value: '1,247', 
        trend: '+12% este mes', 
        color: '#00D4FF',
        icon: FaTicketAlt,
        description: 'Tickets Vendidos'
      },
      ventas: { 
        value: '$45,230', 
        trend: '+8% ingresos', 
        color: '#8A2BE2',
        icon: FaDollarSign,
        description: 'Ingresos Totales'
      },
      eventos: { 
        value: '23', 
        trend: '+3 activos', 
        color: '#FF6B35',
        icon: FaCalendarAlt,
        description: 'Eventos Activos'
      },
      usuarios: { 
        value: '8,945', 
        trend: '+15% crecimiento', 
        color: '#00FF88',
        icon: FaUsers,
        description: 'Usuarios Registrados'
      }
    }
  };

  const tabConfig = {
    dashboard: {
      title: 'Dashboard',
      icon: FaChartLine,
      color: '#00D4FF'
    },
    perfil: {
      title: 'Mi Perfil',
      icon: FaUser,
      color: '#8A2BE2'
    },
    configuracion: {
      title: 'Configuración',
      icon: FaCog,
      color: '#FF6B35'
    },
    historial: {
      title: 'Historial',
      icon: FaHistory,
      color: '#00FF88'
    }
  };

  const handleUserTypeChange = (newType) => {
    setUserType(newType);
  };

  const handlePreferenceChange = (preference) => {
    setProfileData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [preference]: !prev.preferences[preference]
      }
    }));
  };

  const currentDashboard = dashboardData[userType];

  return (
    <div className="profile-container">
      {/* Header del Perfil */}
      <div className="profile-header">
        <div className="profile-header-content">
          <div className="profile-avatar-section">
            <div className="profile-avatar">
              <img 
                src="/api/placeholder/100/100" 
                alt="Avatar" 
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="avatar-placeholder" style={{display: 'none'}}>
                <FaUser />
              </div>
              <button className="avatar-edit-btn">
                <FaCamera />
              </button>
            </div>
            <div className="profile-info">
              <h1 className="profile-name">{profileData.name}</h1>
              <p className="profile-email">{profileData.email}</p>
              <div className="profile-wallet">
                <span>🦄 {profileData.walletAddress}</span>
              </div>
            </div>
          </div>

          {/* Selector de Tipo de Usuario */}
          <div className="user-type-selector">
            <label className="selector-label">Modo de Usuario:</label>
            <div className="type-buttons">
              <motion.button
                className={`type-btn ${userType === 'comprador' ? 'active' : ''}`}
                onClick={() => handleUserTypeChange('comprador')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaTicketAlt />
                <span>Comprador</span>
              </motion.button>
              <motion.button
                className={`type-btn ${userType === 'organizador' ? 'active' : ''}`}
                onClick={() => handleUserTypeChange('organizador')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaUsers />
                <span>Organizador</span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Navegación de Tabs */}
      <div className="profile-tabs">
        {Object.entries(tabConfig).map(([key, config]) => {
          const IconComponent = config.icon;
          return (
            <motion.button
              key={key}
              className={`tab-btn ${activeTab === key ? 'active' : ''}`}
              onClick={() => setActiveTab(key)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                '--tab-color': activeTab === key ? config.color : 'rgba(255,255,255,0.6)'
              }}
            >
              <IconComponent />
              <span>{config.title}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Contenido de Tabs */}
      <div className="profile-content">
        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="dashboard-section"
            >
              <div className="section-header">
                <h2>Dashboard {userType === 'comprador' ? 'Personal' : 'de Organizador'}</h2>
                <p>{userType === 'comprador' 
                    ? 'Tu actividad y estadísticas personales' 
                    : 'Panel de control para gestionar tus eventos'}</p>
              </div>

              <div className="dashboard-grid">
                {Object.entries(currentDashboard).map(([key, data], index) => {
                  const IconComponent = data.icon;
                  return (
                    <motion.div
                      key={key}
                      className="dashboard-widget"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, y: -5 }}
                    >
                      <div className="widget-header">
                        <div className="widget-icon" style={{ color: data.color }}>
                          <IconComponent />
                        </div>
                        <h3 className="widget-title">{data.description}</h3>
                      </div>
                      <div className="widget-content">
                        <div className="widget-value" style={{ color: data.color }}>
                          {data.value}
                        </div>
                        <div className="widget-trend">
                          {data.trend}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {userType === 'organizador' && (
                <div className="organizer-tools">
                  <h3>Herramientas de Organizador</h3>
                  <div className="tools-grid">
                    <div className="tool-card">
                      <FaCalendarAlt />
                      <h4>Crear Evento</h4>
                      <p>Publica un nuevo evento</p>
                    </div>
                    <div className="tool-card">
                      <FaChartLine />
                      <h4>Analytics</h4>
                      <p>Estadísticas detalladas</p>
                    </div>
                    <div className="tool-card">
                      <FaUsers />
                      <h4>Gestión</h4>
                      <p>Administra participantes</p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'perfil' && (
            <motion.div
              key="perfil"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="perfil-section"
            >
              <div className="section-header">
                <h2>Mi Perfil</h2>
                <p>Información personal y preferencias</p>
              </div>

              <div className="profile-form">
                <div className="form-group">
                  <label>Nombre Completo</label>
                  <input 
                    type="text" 
                    value={profileData.name}
                    onChange={(e) => setProfileData(prev => ({...prev, name: e.target.value}))}
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input 
                    type="email" 
                    value={profileData.email}
                    onChange={(e) => setProfileData(prev => ({...prev, email: e.target.value}))}
                  />
                </div>
                <div className="form-group">
                  <label>Dirección de Wallet</label>
                  <div className="wallet-display">
                    <span>{profileData.walletAddress}</span>
                    <button className="copy-btn">Copiar</button>
                  </div>
                </div>
                <div className="form-group">
                  <label>Miembro desde</label>
                  <input type="text" value={profileData.joinDate} disabled />
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'configuracion' && (
            <motion.div
              key="configuracion"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="configuracion-section"
            >
              <div className="section-header">
                <h2>Configuración</h2>
                <p>Personaliza tu experiencia</p>
              </div>

              <div className="settings-grid">
                <div className="setting-card">
                  <div className="setting-info">
                    <FaBell />
                    <div>
                      <h4>Notificaciones</h4>
                      <p>Recibir alertas de eventos</p>
                    </div>
                  </div>
                  <button 
                    className={`toggle-btn ${profileData.preferences.notifications ? 'active' : ''}`}
                    onClick={() => handlePreferenceChange('notifications')}
                  >
                    {profileData.preferences.notifications ? <FaToggleOn /> : <FaToggleOff />}
                  </button>
                </div>

                <div className="setting-card">
                  <div className="setting-info">
                    <FaLock />
                    <div>
                      <h4>Newsletter</h4>
                      <p>Recibir actualizaciones por email</p>
                    </div>
                  </div>
                  <button 
                    className={`toggle-btn ${profileData.preferences.newsletter ? 'active' : ''}`}
                    onClick={() => handlePreferenceChange('newsletter')}
                  >
                    {profileData.preferences.newsletter ? <FaToggleOn /> : <FaToggleOff />}
                  </button>
                </div>

                <div className="setting-card">
                  <div className="setting-info">
                    <FaChartLine />
                    <div>
                      <h4>Analytics</h4>
                      <p>Compartir datos para mejoras</p>
                    </div>
                  </div>
                  <button 
                    className={`toggle-btn ${profileData.preferences.analytics ? 'active' : ''}`}
                    onClick={() => handlePreferenceChange('analytics')}
                  >
                    {profileData.preferences.analytics ? <FaToggleOn /> : <FaToggleOff />}
                  </button>
                </div>
              </div>

              <div className="danger-zone">
                <h3>Zona de Peligro</h3>
                <button className="danger-btn">
                  <FaSignOutAlt />
                  Cerrar Sesión
                </button>
              </div>
            </motion.div>
          )}

          {activeTab === 'historial' && (
            <motion.div
              key="historial"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="historial-section"
            >
              <div className="section-header">
                <h2>Historial</h2>
                <p>{userType === 'comprador' 
                    ? 'Tus compras y actividad reciente' 
                    : 'Historial de eventos y ventas'}</p>
              </div>

              <div className="history-timeline">
                {[1,2,3,4,5].map((item, index) => (
                  <div key={index} className="timeline-item">
                    <div className="timeline-marker"></div>
                    <div className="timeline-content">
                      <h4>{userType === 'comprador' 
                          ? `Compra de ticket #${1000 + index}` 
                          : `Evento creado: Concierto ${index + 1}`}</h4>
                      <p>Hace {index + 1} {index === 0 ? 'día' : 'días'}</p>
                      <span className="timeline-status">Completado</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProfilePage;