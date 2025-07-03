import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaBook, 
  FaCode, 
  FaKey, 
  FaDownload,
  FaCopy,
  FaCheck,
  FaExternalLinkAlt,
  FaTerminal,
  FaRocket,
  FaShieldAlt,
  FaSync,
  FaDatabase,
  FaBars,
  FaTimes,
  FaSearch,
  FaGlobe,
  FaServer,
  FaPlug,
  FaArrowRight
} from 'react-icons/fa';
import '../../styles/docs.css';

const DocsPage = () => {
  const [activeSection, setActiveSection] = useState('introduction');
  const [copiedCode, setCopiedCode] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Manejar eventos de teclado para accesibilidad
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  // Manejar scroll lock
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('scroll-lock');
    } else {
      document.body.classList.remove('scroll-lock');
    }

    return () => {
      document.body.classList.remove('scroll-lock');
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const handleSectionClick = useCallback((sectionId) => {
    setActiveSection(sectionId);
    setIsMobileMenuOpen(false);
  }, []);

  const copyToClipboard = useCallback(async (text, id) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCode(id);
      setTimeout(() => setCopiedCode(''), 2000);
    } catch (err) {
      console.error('Error al copiar al portapapeles:', err);
    }
  }, []);

  const sidebarSections = [
    {
      id: 'introduction',
      title: 'Introducción',
      icon: <FaBook aria-hidden="true" />
    },
    {
      id: 'authentication',
      title: 'Autenticación',
      icon: <FaKey aria-hidden="true" />
    },
    {
      id: 'endpoints',
      title: 'Endpoints',
      icon: <FaTerminal aria-hidden="true" />
    },
    {
      id: 'sdk',
      title: 'SDK & Librerías',
      icon: <FaCode aria-hidden="true" />
    },
    {
      id: 'examples',
      title: 'Ejemplos',
      icon: <FaRocket aria-hidden="true" />
    }
  ];

  const CodeBlock = ({ code, language, id }) => (
    <div className="code-block">
      <div className="code-header">
        <span className="language">{language}</span>
        <motion.button
          className="copy-button"
          onClick={() => copyToClipboard(code, id)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={copiedCode === id ? 'Código copiado' : 'Copiar código'}
        >
          {copiedCode === id ? <FaCheck aria-hidden="true" /> : <FaCopy aria-hidden="true" />}
          <span>{copiedCode === id ? 'Copiado' : 'Copiar'}</span>
        </motion.button>
      </div>
      <pre><code>{code}</code></pre>
    </div>
  );

  const renderMainContent = () => {
    switch (activeSection) {
      case 'introduction':
        return (
          <div className="docs-section">
            <h2>
              <FaBook aria-hidden="true" />
              Introducción a la API de TicketSafer
            </h2>
            <p>
              La API de TicketSafer te permite crear, gestionar y vender tickets NFT 
              en múltiples blockchains de forma programática. Nuestra API REST está 
              diseñada siguiendo los estándares de la industria y soporta autenticación 
              OAuth 2.0.
            </p>

            <div className="feature-grid">
              <motion.div 
                className="feature-card"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <FaShieldAlt className="feature-icon" aria-hidden="true" />
                <h3>Seguridad</h3>
                <p>Autenticación robusta con API keys y OAuth 2.0</p>
              </motion.div>
              <motion.div 
                className="feature-card"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <FaSync className="feature-icon" aria-hidden="true" />
                <h3>Rate Limiting</h3>
                <p>1000 requests por minuto para cuentas gratuitas</p>
              </motion.div>
              <motion.div 
                className="feature-card"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <FaDatabase className="feature-icon" aria-hidden="true" />
                <h3>WebHooks</h3>
                <p>Notificaciones en tiempo real de eventos</p>
              </motion.div>
            </div>

            <h3>URLs Base</h3>
            <CodeBlock
              language="bash"
              id="base-urls"
              code={`# Producción
https://api.ticketsafer.com/v1

# Testnet
https://api-testnet.ticketsafer.com/v1`}
            />

            <h3>Formatos Soportados</h3>
            <div className="feature-grid">
              <motion.div 
                className="feature-card"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <FaGlobe className="feature-icon" aria-hidden="true" />
                <h3>REST API</h3>
                <p>Endpoints RESTful con respuestas JSON</p>
              </motion.div>
              <motion.div 
                className="feature-card"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <FaServer className="feature-icon" aria-hidden="true" />
                <h3>GraphQL</h3>
                <p>Consultas flexibles y eficientes</p>
              </motion.div>
              <motion.div 
                className="feature-card"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <FaPlug className="feature-icon" aria-hidden="true" />
                <h3>WebSocket</h3>
                <p>Actualizaciones en tiempo real</p>
              </motion.div>
            </div>

            <motion.div 
              className="next-section"
              whileHover={{ x: 10 }}
              onClick={() => handleSectionClick('authentication')}
            >
              <span>Siguiente: Autenticación</span>
              <FaArrowRight aria-hidden="true" />
            </motion.div>
          </div>
        );

      case 'authentication':
        return (
          <div className="docs-section">
            <h2>
              <FaKey aria-hidden="true" />
              Autenticación
            </h2>
            <p>
              TicketSafer API utiliza API Keys para autenticación. Puedes generar 
              tu API key desde el panel de desarrollador en tu cuenta.
            </p>

            <h3>Obtener tu API Key</h3>
            <motion.div 
              className="feature-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ol>
                <li>Inicia sesión en tu cuenta de TicketSafer</li>
                <li>Ve a <strong>Configuración → Desarrollador</strong></li>
                <li>Haz clic en "Generar Nueva API Key"</li>
                <li>Copia y guarda tu key de forma segura</li>
              </ol>
            </motion.div>

            <h3>Usar tu API Key</h3>
            <CodeBlock
              language="bash"
              id="auth-example"
              code={`curl -X GET "https://api.ticketsafer.com/v1/events" \\
  -H "Authorization: Bearer TU_API_KEY"`}
            />

            <motion.div 
              className="next-section"
              whileHover={{ x: 10 }}
              onClick={() => handleSectionClick('endpoints')}
            >
              <span>Siguiente: Endpoints</span>
              <FaArrowRight aria-hidden="true" />
            </motion.div>
          </div>
        );

      case 'endpoints':
        return (
          <div className="docs-section">
            <h2>Endpoints Principales</h2>
            
            <div className="endpoint-section">
              <h3>Eventos</h3>
              <div className="endpoint-list">
                <div className="endpoint-item">
                  <div className="method get">GET</div>
                  <div className="path">/events</div>
                  <div className="description">Obtener lista de eventos</div>
                </div>
                <div className="endpoint-item">
                  <div className="method post">POST</div>
                  <div className="path">/events</div>
                  <div className="description">Crear nuevo evento</div>
                </div>
                <div className="endpoint-item">
                  <div className="method get">GET</div>
                  <div className="path">/events/{'{id}'}</div>
                  <div className="description">Obtener evento específico</div>
                </div>
              </div>
            </div>

            <h3>Crear Evento</h3>
            <CodeBlock
              language="javascript"
              id="create-event"
              code={`const event = await client.events.create({
  title: "Concierto de Rock 2025",
  description: "El mejor concierto del año",
  date: "2025-07-15T20:00:00Z",
  venue: {
    name: "Estadio Nacional",
    address: "Av. Principal 123",
    city: "Ciudad de México"
  },
  tickets: {
    price: 0.1, // En ETH
    supply: 1000,
    blockchain: "ethereum"
  },
  metadata: {
    image: "https://example.com/image.jpg",
    category: "music"
  }
});

console.log('Evento creado:', event.id);`}
            />

            <div className="endpoint-section">
              <h3>Tickets</h3>
              <div className="endpoint-list">
                <div className="endpoint-item">
                  <div className="method get">GET</div>
                  <div className="path">/tickets</div>
                  <div className="description">Obtener lista de tickets</div>
                </div>
                <div className="endpoint-item">
                  <div className="method post">POST</div>
                  <div className="path">/tickets/mint</div>
                  <div className="description">Mintear nuevo ticket</div>
                </div>
                <div className="endpoint-item">
                  <div className="method post">POST</div>
                  <div className="path">/tickets/transfer</div>
                  <div className="description">Transferir ticket</div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'sdk':
        return (
          <div className="docs-section">
            <h2>SDK y Librerías</h2>
            
            <div className="sdk-grid">
              <div className="sdk-card">
                <h3>JavaScript/TypeScript</h3>
                <p>SDK oficial para Node.js y navegadores</p>
                <CodeBlock
                  language="bash"
                  id="install-js"
                  code="npm install @ticketsafer/sdk"
                />
                <motion.a
                  href="https://github.com/ticketsafer/js-sdk"
                  className="sdk-link"
                  whileHover={{ scale: 1.02 }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaExternalLinkAlt />
                  Ver en GitHub
                </motion.a>
              </div>

              <div className="sdk-card">
                <h3>Python</h3>
                <p>Librería para aplicaciones backend en Python</p>
                <CodeBlock
                  language="bash"
                  id="install-python"
                  code="pip install ticketsafer"
                />
                <motion.a
                  href="https://github.com/ticketsafer/python-sdk"
                  className="sdk-link"
                  whileHover={{ scale: 1.02 }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaExternalLinkAlt />
                  Ver en GitHub
                </motion.a>
              </div>

              <div className="sdk-card">
                <h3>Go</h3>
                <p>SDK para aplicaciones de alto rendimiento</p>
                <CodeBlock
                  language="bash"
                  id="install-go"
                  code="go get github.com/ticketsafer/go-sdk"
                />
                <motion.a
                  href="https://github.com/ticketsafer/go-sdk"
                  className="sdk-link"
                  whileHover={{ scale: 1.02 }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaExternalLinkAlt />
                  Ver en GitHub
                </motion.a>
              </div>
            </div>

            <h3>Configuración Rápida</h3>
            <CodeBlock
              language="javascript"
              id="quick-setup"
              code={`import { TicketSafer } from '@ticketsafer/sdk';

// Inicializar cliente
const client = new TicketSafer({
  apiKey: process.env.TICKETSAFER_API_KEY,
  environment: 'production',
  defaultChain: 'ethereum'
});

// Configurar WebSocket para eventos en tiempo real
client.onTicketSold((ticket) => {
  console.log('Ticket vendido:', ticket.id);
});

// Conectar wallet (para operaciones que requieren firma)
await client.wallet.connect('metamask');`}
            />
          </div>
        );

      case 'examples':
        return (
          <div className="docs-section">
            <h2>Ejemplos de Uso</h2>
            
            <h3>Crear y Vender Tickets</h3>
            <CodeBlock
              language="javascript"
              id="full-example"
              code={`// 1. Crear evento
const event = await client.events.create({
  title: "EDC Las Vegas 2025",
  date: "2025-05-16T22:00:00Z",
  venue: {
    name: "Las Vegas Motor Speedway",
    city: "Las Vegas, NV"
  },
  tickets: {
    price: 0.15, // ETH
    supply: 50000,
    blockchain: "ethereum",
    transferable: true,
    resaleable: true
  }
});

// 2. Mintear tickets
const tickets = await client.tickets.mint({
  eventId: event.id,
  quantity: 100,
  toAddress: "0x1234...5678"
});

// 3. Configurar marketplace
await client.marketplace.list({
  ticketId: tickets[0].id,
  price: 0.18, // ETH (markup del 20%)
  currency: "ETH"
});

// 4. Escuchar ventas
client.onTicketSold(async (sale) => {
  console.log(\`Ticket \${sale.ticketId} vendido por \${sale.price} \${sale.currency}\`);
  
  // Enviar confirmación por email
  await sendConfirmationEmail(sale.buyerEmail, sale);
});`}
            />

            <h3>Verificar Tickets</h3>
            <CodeBlock
              language="javascript"
              id="verify-example"
              code={`// Verificar ticket en la entrada del evento
async function verifyTicket(ticketId, eventId) {
  try {
    const ticket = await client.tickets.verify({
      ticketId,
      eventId,
      timestamp: Date.now()
    });
    
    if (ticket.valid) {
      console.log('✅ Ticket válido');
      console.log(\`Propietario: \${ticket.owner}\`);
      console.log(\`Usado: \${ticket.used ? 'Sí' : 'No'}\`);
      
      // Marcar como usado
      await client.tickets.markUsed(ticketId);
      
      return { valid: true, ticket };
    } else {
      console.log('❌ Ticket inválido');
      return { valid: false, reason: ticket.reason };
    }
  } catch (error) {
    console.error('Error verificando ticket:', error);
    return { valid: false, reason: 'Error de verificación' };
  }
}`}
            />

            <div className="download-section">
              <h3>Recursos Adicionales</h3>
              <div className="download-grid">
                <motion.a
                  href="/assets/postman-collection.json"
                  className="download-card"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaDownload className="download-icon" />
                  <span>Colección Postman</span>
                </motion.a>
                
                <motion.a
                  href="/assets/openapi-spec.yaml"
                  className="download-card"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaDownload className="download-icon" />
                  <span>OpenAPI Spec</span>
                </motion.a>
                
                <motion.a
                  href="/assets/sdk-examples.zip"
                  className="download-card"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaDownload className="download-icon" />
                  <span>Ejemplos Completos</span>
                </motion.a>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="docs-page">
      {/* Mobile Menu Toggle */}
      <motion.button
        className="menu-toggle"
        onClick={toggleMobileMenu}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={isMobileMenuOpen}
      >
        {isMobileMenuOpen ? <FaTimes size={24} aria-hidden="true" /> : <FaBars size={24} aria-hidden="true" />}
      </motion.button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleMobileMenu}
          />
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <div className="docs-hero">
        <div className="hero-content">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <FaBook className="hero-icon" aria-hidden="true" />
            Documentación API
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Integra TicketSafer en tu aplicación con nuestra API REST y SDK multichain
          </motion.p>
          <motion.div
            className="hero-badges"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <span className="badge">REST API</span>
            <span className="badge">GraphQL</span>
            <span className="badge">WebSocket</span>
            <span className="badge">SDK JavaScript</span>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="docs-content">
        <div className="docs-layout">
          {/* Sidebar */}
          <motion.aside 
            className={`docs-sidebar ${isMobileMenuOpen ? 'active' : ''}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            role="navigation"
            aria-label="Navegación principal"
          >
            <div className="search-container">
              <div className="search-input-wrapper">
                <FaSearch className="search-icon" aria-hidden="true" />
                <input
                  type="search"
                  placeholder="Buscar en la documentación..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                  aria-label="Buscar en la documentación"
                />
              </div>
            </div>
            <nav className="sidebar-nav">
              {sidebarSections.map((section) => (
                <motion.button
                  key={section.id}
                  className={`nav-item ${activeSection === section.id ? 'active' : ''}`}
                  onClick={() => handleSectionClick(section.id)}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  aria-current={activeSection === section.id ? 'page' : undefined}
                >
                  {section.icon}
                  <span>{section.title}</span>
                </motion.button>
              ))}
            </nav>
          </motion.aside>

          {/* Main Content Area */}
          <motion.main 
            className="docs-main"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            role="main"
            aria-label="Contenido principal"
          >
            {renderMainContent()}
          </motion.main>
        </div>
      </div>
    </div>
  );
};

export default DocsPage; 