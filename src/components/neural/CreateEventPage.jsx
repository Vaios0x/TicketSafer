import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../../styles/create-event.css';
import { 
  FaCalendarAlt, 
  FaMapMarkerAlt, 
  FaUsers, 
  FaClock, 
  FaTag, 
  FaCamera, 
  FaTicketAlt,
  FaChevronLeft, 
  FaChevronRight,
  FaCheck,
  FaUpload,
  FaTimes,
  FaEye,
  FaWallet,
  FaGlobe,
  FaShieldAlt,
  FaExchangeAlt,
  FaGavel,
  FaCreditCard
} from 'react-icons/fa';

const CreateEventPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Básicos
    title: '',
    description: '',
    category: '',
    
    // Fecha y tiempo
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    timezone: 'America/Mexico_City',
    
    // Ubicación
    locationType: 'physical',
    venue: '',
    address: '',
    city: '',
    country: 'México',
    virtualLink: '',
    
    // Ticketing
    ticketType: 'free',
    price: '',
    currency: 'ETH',
    totalTickets: '',
    
    // Métodos de pago
    paymentMethods: {
      crypto: true,
      card: false
    },
    
    // Opciones de pago (solo para eventos de pago)
    allowResale: true,
    allowAuction: true,
    resalePrices: {
      ETH: { min: '', max: '' },
      MATIC: { min: '', max: '' },
      MXN: { min: '', max: '' },
      USD: { min: '', max: '' }
    },
    auctionPrices: {
      ETH: { min: '', max: '' },
      MATIC: { min: '', max: '' },
      MXN: { min: '', max: '' },
      USD: { min: '', max: '' }
    },
    
    // Configuración
    isPrivate: false,
    requiresApproval: false,
    
    // Media
    coverImage: null
  });

  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const totalSteps = 5;

  // Definir las monedas disponibles
  const currencies = [
    { id: 'ETH', name: 'Ethereum', symbol: 'ETH', step: '0.001' },
    { id: 'MATIC', name: 'Polygon', symbol: 'MATIC', step: '1' },
    { id: 'MXN', name: 'Peso Mexicano', symbol: 'MXN', step: '1' },
    { id: 'USD', name: 'US Dollar', symbol: 'USD', step: '0.01' }
  ];

  const steps = [
    { id: 1, title: 'Información Básica', icon: <FaCalendarAlt /> },
    { id: 2, title: 'Fecha & Ubicación', icon: <FaMapMarkerAlt /> },
    { id: 3, title: 'Configuración de Tickets', icon: <FaTicketAlt /> },
    { id: 4, title: 'Multimedia', icon: <FaCamera /> },
    { id: 5, title: 'Configuración Final', icon: <FaShieldAlt /> }
  ];

  const handleStepClick = useCallback((stepId) => {
    setCurrentStep(stepId);
  }, []);

  const handleInputChange = useCallback((field, value) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value };
      
      // Si cambia a evento gratuito, deshabilitar reventa y subasta
      if (field === 'ticketType' && value === 'free') {
        updated.allowResale = false;
        updated.allowAuction = false;
      }
      
      // Si cambia a evento de pago, habilitar reventa y subasta por defecto
      if (field === 'ticketType' && value === 'paid') {
        updated.allowResale = true;
        updated.allowAuction = true;
      }
      
      return updated;
    });
    
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  }, [errors]);

  const handleImageUpload = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, coverImage: file }));
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  }, []);

  const nextStep = useCallback(() => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  }, [currentStep, totalSteps]);

  const prevStep = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  const validateForm = useCallback(() => {
    const newErrors = {};
    
    if (!formData.title?.trim()) newErrors.title = 'El título es requerido';
    if (!formData.description?.trim()) newErrors.description = 'La descripción es requerida';
    if (!formData.category) newErrors.category = 'Selecciona una categoría';
    if (!formData.startDate) newErrors.startDate = 'Fecha de inicio requerida';
    if (!formData.startTime) newErrors.startTime = 'Hora de inicio requerida';
    
    if (formData.ticketType === 'paid') {
      if (!formData.price || isNaN(formData.price) || formData.price <= 0) {
        newErrors.price = 'El precio debe ser mayor a 0';
      }
      
      // Validar que al menos un método de pago esté seleccionado
      if (!formData.paymentMethods.crypto && !formData.paymentMethods.card) {
        newErrors.paymentMethods = 'Debes seleccionar al menos un método de pago';
      }
    }
    
    if (!formData.totalTickets || isNaN(formData.totalTickets) || formData.totalTickets <= 0) {
      newErrors.totalTickets = 'La cantidad de tickets debe ser mayor a 0';
    }

    // Validar precios de reventa si está habilitada
    if (formData.ticketType === 'paid' && formData.allowResale) {
      if (!formData.resalePrices.ETH.min || isNaN(formData.resalePrices.ETH.min) || formData.resalePrices.ETH.min < 0) {
        newErrors.resalePrices = { ...newErrors.resalePrices, ETH: { min: 'El precio mínimo de reventa debe ser válido' } };
      }
      if (!formData.resalePrices.ETH.max || isNaN(formData.resalePrices.ETH.max) || formData.resalePrices.ETH.max <= formData.resalePrices.ETH.min) {
        newErrors.resalePrices = { ...newErrors.resalePrices, ETH: { max: 'El precio máximo de reventa debe ser mayor al precio mínimo' } };
      }
    }

    // Validar precios de subasta si está habilitada
    if (formData.ticketType === 'paid' && formData.allowAuction) {
      if (!formData.auctionPrices.ETH.min || isNaN(formData.auctionPrices.ETH.min) || formData.auctionPrices.ETH.min < 0) {
        newErrors.auctionPrices = { ...newErrors.auctionPrices, ETH: { min: 'El precio mínimo de subasta debe ser válido' } };
      }
      if (!formData.auctionPrices.ETH.max || isNaN(formData.auctionPrices.ETH.max) || formData.auctionPrices.ETH.max <= formData.auctionPrices.ETH.min) {
        newErrors.auctionPrices = { ...newErrors.auctionPrices, ETH: { max: 'El precio máximo de subasta debe ser mayor al precio mínimo' } };
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSubmit = useCallback(() => {
    if (validateForm()) {
      const eventData = {
        ...formData,
        // Asegurar que los eventos gratuitos no tengan opciones de mercado secundario
        allowResale: formData.ticketType === 'paid' ? formData.allowResale : false,
        allowAuction: formData.ticketType === 'paid' ? formData.allowAuction : false,
        // Inicializar estados actuales como false (se activarán después)
        hasResale: false,
        hasAuction: false,
        // Agregar precios límite para mercado secundario
        resalePrices: formData.ticketType === 'paid' && formData.allowResale ? formData.resalePrices : { ETH: { min: null, max: null }, MATIC: { min: null, max: null }, MXN: { min: null, max: null }, USD: { min: null, max: null } },
        auctionPrices: formData.ticketType === 'paid' && formData.allowAuction ? formData.auctionPrices : { ETH: { min: null, max: null }, MATIC: { min: null, max: null }, MXN: { min: null, max: null }, USD: { min: null, max: null } },
        // Configuración de métodos de pago
        paymentMethods: formData.ticketType === 'paid' ? formData.paymentMethods : { crypto: false, card: false }
      };
      
      console.log('Crear evento:', eventData);
      console.log('Opciones de mercado secundario:', {
        allowResale: eventData.allowResale,
        allowAuction: eventData.allowAuction,
        isPaidEvent: formData.ticketType === 'paid',
        resalePrices: eventData.allowResale ? {
          ETH: eventData.resalePrices.ETH,
          MATIC: eventData.resalePrices.MATIC,
          MXN: eventData.resalePrices.MXN,
          USD: eventData.resalePrices.USD
        } : null,
        auctionPrices: eventData.allowAuction ? {
          ETH: eventData.auctionPrices.ETH,
          MATIC: eventData.auctionPrices.MATIC,
          MXN: eventData.auctionPrices.MXN,
          USD: eventData.auctionPrices.USD
        } : null,
        paymentMethods: eventData.paymentMethods
      });
      
      // Aquí iría la lógica para crear el evento en blockchain
      // El evento se guardaría con allowResale y allowAuction configurados
    }
  }, [formData, validateForm]);

  const renderProgressBar = () => (
    <div className="create-event-progress">
      <div className="progress-steps">
        {steps.map((step, index) => (
          <div 
            key={step.id} 
            className="progress-step-container"
            onClick={() => handleStepClick(step.id)}
            style={{ cursor: 'pointer' }}
          >
            <motion.div
              className={`progress-step ${currentStep >= step.id ? 'active' : ''} ${currentStep === step.id ? 'current' : ''}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="step-icon">{step.icon}</div>
              <span className="step-number">{step.id}</span>
            </motion.div>
            <div className="step-label">{step.title}</div>
            {index < steps.length - 1 && (
              <div className={`progress-line ${currentStep > step.id ? 'completed' : ''}`} />
            )}
          </div>
        ))}
      </div>
      <div className="progress-bar-container">
        <motion.div 
          className="progress-bar"
          initial={{ width: 0 }}
          animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>
    </div>
  );

  const categories = [
    'Música', 'Arte & Cultura', 'Deportes', 'Tecnología', 'Negocios', 
    'Gastronomía', 'Entretenimiento', 'Educación', 'Networking', 'Otro'
  ];

  const blockchains = [
    { id: 'ethereum', name: 'Ethereum', color: '#627EEA', currency: 'ETH' },
    { id: 'polygon', name: 'Polygon', color: '#8247E5', currency: 'MATIC' },
    { id: 'arbitrum', name: 'Arbitrum', color: '#28A0F0', currency: 'ETH' },
    { id: 'optimism', name: 'Optimism', color: '#FF0420', currency: 'ETH' }
  ];

  const renderStepContent = () => {
    switch(currentStep) {
      case 1:
        return (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="form-step"
          >
            <div className="step-header">
              <h2>Información Básica del Evento</h2>
              <p>Comencemos con los detalles principales de tu evento</p>
            </div>
            
            <div className="form-grid">
              <div className="form-group full-width">
                <label>Título del Evento *</label>
                <motion.input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="ej. Concierto de Rock en el Palacio de los Deportes"
                  className={`form-input ${errors.title ? 'error' : ''}`}
                  whileFocus={{ scale: 1.02 }}
                />
                {errors.title && <span className="error-message">{errors.title}</span>}
              </div>

              <div className="form-group full-width">
                <label>Descripción *</label>
                <motion.textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe tu evento, qué pueden esperar los asistentes..."
                  rows="4"
                  className={`form-textarea ${errors.description ? 'error' : ''}`}
                  whileFocus={{ scale: 1.02 }}
                />
                {errors.description && <span className="error-message">{errors.description}</span>}
              </div>

              <div className="form-group">
                <label>Categoría *</label>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className={`form-select ${errors.category ? 'error' : ''}`}
                >
                  <option value="">Selecciona una categoría</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                {errors.category && <span className="error-message">{errors.category}</span>}
              </div>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="form-step"
          >
            <div className="step-header">
              <h2>Fecha, Hora y Ubicación</h2>
              <p>¿Cuándo y dónde se realizará tu evento?</p>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label>Fecha de Inicio *</label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleInputChange('startDate', e.target.value)}
                  className={`form-input ${errors.startDate ? 'error' : ''}`}
                />
                {errors.startDate && <span className="error-message">{errors.startDate}</span>}
              </div>

              <div className="form-group">
                <label>Hora de Inicio *</label>
                <input
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => handleInputChange('startTime', e.target.value)}
                  className={`form-input ${errors.startTime ? 'error' : ''}`}
                />
                {errors.startTime && <span className="error-message">{errors.startTime}</span>}
              </div>

              <div className="form-group">
                <label>Fecha de Fin</label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleInputChange('endDate', e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Hora de Fin</label>
                <input
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => handleInputChange('endTime', e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group full-width">
                <label>Tipo de Ubicación</label>
                <div className="location-type-selector">
                  {['physical', 'virtual', 'hybrid'].map(type => (
                    <motion.button
                      key={type}
                      type="button"
                      className={`location-option ${formData.locationType === type ? 'active' : ''}`}
                      onClick={() => handleInputChange('locationType', type)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="option-icon">
                        {type === 'physical' && <FaMapMarkerAlt />}
                        {type === 'virtual' && <FaGlobe />}
                        {type === 'hybrid' && <FaUsers />}
                      </span>
                      <span>
                        {type === 'physical' && 'Presencial'}
                        {type === 'virtual' && 'Virtual'}
                        {type === 'hybrid' && 'Híbrido'}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {(formData.locationType === 'physical' || formData.locationType === 'hybrid') && (
                <>
                  <div className="form-group full-width">
                    <label>Lugar/Venue *</label>
                    <input
                      type="text"
                      value={formData.venue}
                      onChange={(e) => handleInputChange('venue', e.target.value)}
                      placeholder="ej. Palacio de los Deportes"
                      className={`form-input ${errors.venue ? 'error' : ''}`}
                    />
                    {errors.venue && <span className="error-message">{errors.venue}</span>}
                  </div>

                  <div className="form-group">
                    <label>Dirección</label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="Dirección completa"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>Ciudad</label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      placeholder="Ciudad"
                      className="form-input"
                    />
                  </div>
                </>
              )}

              {(formData.locationType === 'virtual' || formData.locationType === 'hybrid') && (
                <div className="form-group full-width">
                  <label>Enlace Virtual *</label>
                  <input
                    type="url"
                    value={formData.virtualLink}
                    onChange={(e) => handleInputChange('virtualLink', e.target.value)}
                    placeholder="https://zoom.us/j/..."
                    className={`form-input ${errors.virtualLink ? 'error' : ''}`}
                  />
                  {errors.virtualLink && <span className="error-message">{errors.virtualLink}</span>}
                </div>
              )}
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="form-step"
          >
            <div className="step-header">
              <h2>Configuración de Tickets</h2>
              <p>Define el precio y disponibilidad de tus tickets</p>
            </div>

            <div className="form-grid">
              <div className="form-group full-width">
                <label>Tipo de Ticket</label>
                <div className="ticket-type-selector">
                  <motion.button
                    type="button"
                    className={`ticket-option ${formData.ticketType === 'free' ? 'active' : ''}`}
                    onClick={() => handleInputChange('ticketType', 'free')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaTag />
                    <span>Gratis</span>
                  </motion.button>
                  <motion.button
                    type="button"
                    className={`ticket-option ${formData.ticketType === 'paid' ? 'active' : ''}`}
                    onClick={() => handleInputChange('ticketType', 'paid')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaWallet />
                    <span>De Pago</span>
                    <small style={{ fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.6)', marginTop: '0.25rem' }}>
                      Incluye opciones de reventa y subasta
                    </small>
                  </motion.button>
                </div>
              </div>

              {formData.ticketType === 'paid' && (
                <>
                  <div className="form-group full-width">
                    <label>Precio del Ticket *</label>
                    <div className="currency-tabs">
                      {currencies.map(currency => (
                        <button
                          key={currency.id}
                          className={`currency-tab ${formData.currency === currency.id ? 'active' : ''}`}
                          onClick={() => handleInputChange('currency', currency.id)}
                        >
                          {currency.symbol}
                        </button>
                      ))}
                    </div>
                    
                    <div className="price-input-group">
                      <input
                        type="number"
                        value={formData.price}
                        onChange={(e) => handleInputChange('price', e.target.value)}
                        placeholder={`0.00 ${formData.currency}`}
                        className={`form-input price-input ${errors.price ? 'error' : ''}`}
                        min="0"
                        step={currencies.find(c => c.id === formData.currency)?.step || '0.01'}
                      />
                    </div>
                    {errors.price && <span className="error-message">{errors.price}</span>}
                    
                    <small style={{ display: 'block', marginTop: '0.5rem', color: 'rgba(255, 255, 255, 0.6)' }}>
                      {formData.currency === 'ETH' && 'Precio en Ethereum (ETH)'}
                      {formData.currency === 'MATIC' && 'Precio en Polygon (MATIC)'}
                      {formData.currency === 'MXN' && 'Precio en Pesos Mexicanos (MXN)'}
                      {formData.currency === 'USD' && 'Precio en Dólares Americanos (USD)'}
                    </small>
                  </div>

                  <div className="form-group full-width">
                    <label>Métodos de Pago Aceptados</label>
                    <p style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '16px' }}>
                      Selecciona los métodos de pago que aceptarás para este evento
                    </p>
                    
                    <div className="payment-methods">
                      <motion.div 
                        className="payment-method"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="method-content">
                          <div className="method-header">
                            <FaWallet style={{ color: '#8b5cf6' }} />
                            <span>Criptomonedas</span>
                          </div>
                          <small>Acepta pagos en {formData.currency} y otras criptomonedas</small>
                        </div>
                        <motion.button
                          type="button"
                          className={`toggle-switch ${formData.paymentMethods.crypto ? 'active' : ''}`}
                          onClick={() => handleInputChange('paymentMethods', {
                            ...formData.paymentMethods,
                            crypto: !formData.paymentMethods.crypto
                          })}
                          whileTap={{ scale: 0.95 }}
                        >
                          <motion.div 
                            className="toggle-thumb"
                            animate={{ x: formData.paymentMethods.crypto ? 24 : 0 }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          />
                        </motion.button>
                      </motion.div>

                      <motion.div 
                        className="payment-method"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="method-content">
                          <div className="method-header">
                            <FaCreditCard style={{ color: '#10b981' }} />
                            <span>Tarjeta de Crédito/Débito</span>
                          </div>
                          <small>Acepta pagos con tarjetas bancarias</small>
                        </div>
                        <motion.button
                          type="button"
                          className={`toggle-switch ${formData.paymentMethods.card ? 'active' : ''}`}
                          onClick={() => handleInputChange('paymentMethods', {
                            ...formData.paymentMethods,
                            card: !formData.paymentMethods.card
                          })}
                          whileTap={{ scale: 0.95 }}
                        >
                          <motion.div 
                            className="toggle-thumb"
                            animate={{ x: formData.paymentMethods.card ? 24 : 0 }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          />
                        </motion.button>
                      </motion.div>
                    </div>
                    {(!formData.paymentMethods.crypto && !formData.paymentMethods.card) && (
                      <span className="error-message">Debes seleccionar al menos un método de pago</span>
                    )}
                  </div>

                  <div className="form-group full-width">
                    <label>Opciones de Mercado Secundario</label>
                    <p style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '16px' }}>
                      Configura qué opciones estarán disponibles después de la venta inicial
                    </p>
                    
                    <div className="market-options">
                      <motion.div 
                        className="market-option"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="option-content">
                          <div className="option-header">
                            <FaExchangeAlt style={{ color: '#8b5cf6' }} />
                            <span>Permitir Reventa</span>
                          </div>
                          <small>Los compradores podrán revender sus tickets</small>
                          
                          {formData.allowResale && (
                            <div className="price-limits">
                              <div className="currency-tabs">
                                {currencies.map(currency => (
                                  <button
                                    key={currency.id}
                                    className={`currency-tab ${formData.currency === currency.id ? 'active' : ''}`}
                                    onClick={() => handleInputChange('currency', currency.id)}
                                  >
                                    {currency.symbol}
                                  </button>
                                ))}
                              </div>
                              
                              <div className="price-inputs">
                                <div className="price-limit-input">
                                  <label>Precio Mínimo en {formData.currency}</label>
                                  <div className="price-input-group">
                                    <input
                                      type="number"
                                      value={formData.resalePrices[formData.currency].min}
                                      onChange={(e) => handleInputChange('resalePrices', {
                                        ...formData.resalePrices,
                                        [formData.currency]: { 
                                          ...formData.resalePrices[formData.currency], 
                                          min: e.target.value 
                                        }
                                      })}
                                      placeholder={`0.00 ${formData.currency}`}
                                      className={`form-input price-input ${errors.resalePrices?.[formData.currency]?.min ? 'error' : ''}`}
                                      min="0"
                                      step={currencies.find(c => c.id === formData.currency)?.step || '0.01'}
                                    />
                                  </div>
                                  {errors.resalePrices?.[formData.currency]?.min && (
                                    <span className="error-message">{errors.resalePrices[formData.currency].min}</span>
                                  )}
                                </div>
                                
                                <div className="price-limit-input">
                                  <label>Precio Máximo en {formData.currency}</label>
                                  <div className="price-input-group">
                                    <input
                                      type="number"
                                      value={formData.resalePrices[formData.currency].max}
                                      onChange={(e) => handleInputChange('resalePrices', {
                                        ...formData.resalePrices,
                                        [formData.currency]: { 
                                          ...formData.resalePrices[formData.currency], 
                                          max: e.target.value 
                                        }
                                      })}
                                      placeholder={`0.00 ${formData.currency}`}
                                      className={`form-input price-input ${errors.resalePrices?.[formData.currency]?.max ? 'error' : ''}`}
                                      min="0"
                                      step={currencies.find(c => c.id === formData.currency)?.step || '0.01'}
                                    />
                                  </div>
                                  {errors.resalePrices?.[formData.currency]?.max && (
                                    <span className="error-message">{errors.resalePrices[formData.currency].max}</span>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                        <motion.button
                          type="button"
                          className={`toggle-switch ${formData.allowResale ? 'active' : ''}`}
                          onClick={() => handleInputChange('allowResale', !formData.allowResale)}
                          whileTap={{ scale: 0.95 }}
                        >
                          <motion.div 
                            className="toggle-thumb"
                            animate={{ x: formData.allowResale ? 24 : 0 }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          />
                        </motion.button>
                      </motion.div>

                      <motion.div 
                        className="market-option"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="option-content">
                          <div className="option-header">
                            <FaGavel style={{ color: '#f59e0b' }} />
                            <span>Permitir Subastas</span>
                          </div>
                          <small>Los tickets podrán subastarse al mejor postor</small>
                          
                          {formData.allowAuction && (
                            <div className="price-limits">
                              <div className="currency-tabs">
                                {currencies.map(currency => (
                                  <button
                                    key={currency.id}
                                    className={`currency-tab ${formData.currency === currency.id ? 'active' : ''}`}
                                    onClick={() => handleInputChange('currency', currency.id)}
                                  >
                                    {currency.symbol}
                                  </button>
                                ))}
                              </div>
                              
                              <div className="price-inputs">
                                <div className="price-limit-input">
                                  <label>Precio Mínimo en {formData.currency}</label>
                                  <div className="price-input-group">
                                    <input
                                      type="number"
                                      value={formData.auctionPrices[formData.currency].min}
                                      onChange={(e) => handleInputChange('auctionPrices', {
                                        ...formData.auctionPrices,
                                        [formData.currency]: { 
                                          ...formData.auctionPrices[formData.currency], 
                                          min: e.target.value 
                                        }
                                      })}
                                      placeholder={`0.00 ${formData.currency}`}
                                      className={`form-input price-input ${errors.auctionPrices?.[formData.currency]?.min ? 'error' : ''}`}
                                      min="0"
                                      step={currencies.find(c => c.id === formData.currency)?.step || '0.01'}
                                    />
                                  </div>
                                  {errors.auctionPrices?.[formData.currency]?.min && (
                                    <span className="error-message">{errors.auctionPrices[formData.currency].min}</span>
                                  )}
                                </div>
                                
                                <div className="price-limit-input">
                                  <label>Precio Máximo en {formData.currency}</label>
                                  <div className="price-input-group">
                                    <input
                                      type="number"
                                      value={formData.auctionPrices[formData.currency].max}
                                      onChange={(e) => handleInputChange('auctionPrices', {
                                        ...formData.auctionPrices,
                                        [formData.currency]: { 
                                          ...formData.auctionPrices[formData.currency], 
                                          max: e.target.value 
                                        }
                                      })}
                                      placeholder={`0.00 ${formData.currency}`}
                                      className={`form-input price-input ${errors.auctionPrices?.[formData.currency]?.max ? 'error' : ''}`}
                                      min="0"
                                      step={currencies.find(c => c.id === formData.currency)?.step || '0.01'}
                                    />
                                  </div>
                                  {errors.auctionPrices?.[formData.currency]?.max && (
                                    <span className="error-message">{errors.auctionPrices[formData.currency].max}</span>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                        <motion.button
                          type="button"
                          className={`toggle-switch ${formData.allowAuction ? 'active' : ''}`}
                          onClick={() => handleInputChange('allowAuction', !formData.allowAuction)}
                          whileTap={{ scale: 0.95 }}
                        >
                          <motion.div 
                            className="toggle-thumb"
                            animate={{ x: formData.allowAuction ? 24 : 0 }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          />
                        </motion.button>
                      </motion.div>
                    </div>
                  </div>
                </>
              )}

              <div className="form-group">
                <label>Total de Tickets *</label>
                <input
                  type="number"
                  value={formData.totalTickets}
                  onChange={(e) => handleInputChange('totalTickets', e.target.value)}
                  placeholder="100"
                  className={`form-input ${errors.totalTickets ? 'error' : ''}`}
                  min="1"
                />
                {errors.totalTickets && <span className="error-message">{errors.totalTickets}</span>}
              </div>
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="form-step"
          >
            <div className="step-header">
              <h2>Multimedia</h2>
              <p>Agrega imágenes para hacer tu evento más atractivo</p>
            </div>

            <div className="form-grid">
              <div className="form-group full-width">
                <label>Imagen de Portada</label>
                <div 
                  className="image-upload-area"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {imagePreview ? (
                    <div className="image-preview">
                      <img src={imagePreview} alt="Preview" />
                      <div className="image-overlay">
                        <FaCamera />
                        <span>Cambiar imagen</span>
                      </div>
                    </div>
                  ) : (
                    <div className="upload-placeholder">
                      <FaUpload />
                      <span>Subir imagen de portada</span>
                      <small>JPG, PNG o WebP (máx. 5MB)</small>
                    </div>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
              </div>
            </div>
          </motion.div>
        );

      case 5:
        return (
          <motion.div
            key="step5"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="form-step"
          >
            <div className="step-header">
              <h2>Configuración Final</h2>
              <p>Últimos ajustes antes de publicar tu evento</p>
            </div>

            <div className="form-grid">
              <div className="form-group full-width">
                <div className="config-options">
                  <motion.div 
                    className="config-option"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="option-content">
                      <div className="option-header">
                        <FaEye />
                        <span>Evento Privado</span>
                      </div>
                      <small>Solo visible para invitados con enlace directo</small>
                    </div>
                    <motion.button
                      type="button"
                      className={`toggle-switch ${formData.isPrivate ? 'active' : ''}`}
                      onClick={() => handleInputChange('isPrivate', !formData.isPrivate)}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.div 
                        className="toggle-thumb"
                        animate={{ x: formData.isPrivate ? 24 : 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    </motion.button>
                  </motion.div>

                  <motion.div 
                    className="config-option"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="option-content">
                      <div className="option-header">
                        <FaShieldAlt />
                        <span>Requiere Aprobación</span>
                      </div>
                      <small>Revisar solicitudes antes de confirmar asistencia</small>
                    </div>
                    <motion.button
                      type="button"
                      className={`toggle-switch ${formData.requiresApproval ? 'active' : ''}`}
                      onClick={() => handleInputChange('requiresApproval', !formData.requiresApproval)}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.div 
                        className="toggle-thumb"
                        animate={{ x: formData.requiresApproval ? 24 : 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    </motion.button>
                  </motion.div>
                </div>
              </div>

              <div className="form-group full-width">
                <div className="event-summary">
                  <h3>Resumen del Evento</h3>
                  <div className="summary-grid">
                    <div className="summary-item">
                      <span className="summary-label">Título:</span>
                      <span className="summary-value">{formData.title || 'Sin título'}</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Fecha:</span>
                      <span className="summary-value">{formData.startDate || 'Sin fecha'}</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Precio:</span>
                      <span className="summary-value">
                        {formData.ticketType === 'free' ? 'Gratis' : `${formData.price || '0'} ${formData.currency || 'ETH'}`}
                      </span>
                    </div>
                    {formData.ticketType === 'paid' && (
                      <>
                        <div className="summary-item">
                          <span className="summary-label">Reventa:</span>
                          <span className="summary-value">
                            {formData.allowResale ? '✅ Permitida' : '❌ No permitida'}
                          </span>
                        </div>
                        <div className="summary-item">
                          <span className="summary-label">Subastas:</span>
                          <span className="summary-value">
                            {formData.allowAuction ? '✅ Permitidas' : '❌ No permitidas'}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="create-event-page">
      <div className="create-event-container">
        <motion.div
          className="create-event-card"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="create-event-header">
            <h1>Crear Nuevo Evento</h1>
            <p>Crea tu evento en blockchain de forma fácil y segura</p>
          </div>

          {renderProgressBar()}

          <div className="form-content">
            <AnimatePresence mode="wait">
              {renderStepContent()}
            </AnimatePresence>
          </div>

          <div className="form-navigation">
            <motion.button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="nav-button prev"
              whileHover={{ scale: currentStep > 1 ? 1.05 : 1 }}
              whileTap={{ scale: currentStep > 1 ? 0.95 : 1 }}
            >
              <FaChevronLeft />
              Anterior
            </motion.button>

            {currentStep < totalSteps ? (
              <motion.button
                type="button"
                onClick={nextStep}
                className="nav-button next"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Siguiente
                <FaChevronRight />
              </motion.button>
            ) : (
              <motion.button
                type="button"
                onClick={handleSubmit}
                className="nav-button submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaCheck />
                Crear Evento
              </motion.button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateEventPage; 