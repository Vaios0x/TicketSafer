import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NeuralMenu from './components/neural/NeuralMenu'
import NeuralHome from './components/neural/NeuralHome'
import ProfilePage from './components/neural/ProfilePage'
import EventsPage from './components/neural/EventsPage'
import CreateEventPage from './components/neural/CreateEventPage'
import NeuralAbout from './components/neural/NeuralAbout'
import RoadmapPage from './components/neural/RoadmapPage'
import FAQPage from './components/neural/FAQPage'
import MarketplacePage from './components/neural/MarketplacePage'
import DocsPage from './components/neural/DocsPage'
import HelpPage from './components/neural/HelpPage'
import TermsPage from './components/neural/TermsPage'
import PrivacyPage from './components/neural/PrivacyPage'
import SecurityPage from './components/neural/SecurityPage'
import EthereumPage from './components/neural/EthereumPage'
import PolygonPage from './components/neural/PolygonPage'
import ArbitrumPage from './components/neural/ArbitrumPage'
import OptimismPage from './components/neural/OptimismPage'
import NeuralFooter from './components/neural/NeuralFooter'

// Importación de estilos
import './styles/index.css'
import './styles/navbar.css'
import './styles/home.css'
import './styles/profile.css'
import './styles/hero-search.css'
import './styles/event-search.css'
import './styles/event-card.css'
import './styles/events-page.css'
import './styles/events-grid.css'
import './styles/ticket-modal.css'
import './styles/neural-about.css'
import './styles/neural-footer.css'
import './styles/neural-roadmap.css'
import './styles/neural-faq.css'
import './styles/neon-effects.css'
import './styles/blockchain-icons.css'
import './styles/hero-subtitle-effects.css'
import './styles/neural-stats-effects.css'
import './styles/create-event.css'
import './styles/marketplace.css'
import './styles/docs.css'
import './styles/help.css'
import './styles/legal.css'
import './styles/blockchain-pages.css'

// Estilos críticos para sobrescribir conflictos
const criticalStyles = `
/* SOBRESCRIBIR ESTILOS DE EVENT CARDS - FORZADO */
.events-grid {
  display: grid !important;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)) !important;
  gap: 24px !important;
  max-width: 1600px !important;
  margin: 0 auto !important;
  padding: 32px 20px !important;
  background: linear-gradient(135deg, rgba(15, 23, 42, 0.1) 0%, rgba(30, 41, 59, 0.05) 100%) !important;
  border-radius: 24px !important;
  backdrop-filter: blur(10px) !important;
  border: 1px solid rgba(255, 255, 255, 0.05) !important;
  justify-items: center !important;
  align-items: stretch !important;
}

.event-card {
  position: relative !important;
  display: flex !important;
  flex-direction: column !important;
  width: 100% !important;
  min-height: 640px !important;
  height: auto !important;
  background: linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.9) 100%) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  border-radius: 16px !important;
  overflow: visible !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
  backdrop-filter: blur(20px) !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15), 0 1px 3px rgba(0, 0, 0, 0.1) !important;
}

.event-image-container {
  position: relative !important;
  width: 100% !important;
  height: 100px !important;
  overflow: hidden !important;
  flex-shrink: 0 !important;
}

.event-image {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
  transition: transform 0.3s ease !important;
}

.event-content {
  flex: 1 !important;
  display: flex !important;
  flex-direction: column !important;
  padding: 20px !important;
  gap: 16px !important;
  min-height: 520px !important;
}

.event-title {
  font-size: 18px !important;
  font-weight: 700 !important;
  line-height: 1.3 !important;
  color: #ffffff !important;
  margin-bottom: 6px !important;
  display: -webkit-box !important;
  -webkit-line-clamp: 2 !important;
  -webkit-box-orient: vertical !important;
  overflow: hidden !important;
}

.event-info-grid {
  display: grid !important;
  grid-template-columns: 1fr 1fr !important;
  gap: 12px !important;
  flex-shrink: 0 !important;
  margin-bottom: 16px !important;
}

.event-info-card {
  display: flex !important;
  align-items: flex-start !important;
  gap: 8px !important;
  padding: 12px 10px !important;
  background: rgba(255, 255, 255, 0.08) !important;
  border: 1px solid rgba(255, 255, 255, 0.15) !important;
  border-radius: 10px !important;
  transition: all 0.2s ease !important;
  text-align: left !important;
  min-height: 60px !important;
}

.event-info-card:hover {
  background: rgba(255, 255, 255, 0.12) !important;
  border-color: rgba(59, 130, 246, 0.3) !important;
  transform: translateY(-1px) !important;
}

.event-info-card.price {
  grid-column: 1 / -1 !important;
  justify-content: center !important;
  background: rgba(34, 197, 94, 0.15) !important;
  border-color: rgba(34, 197, 94, 0.3) !important;
  align-items: center !important;
  min-height: 50px !important;
}

.info-icon {
  color: #60a5fa !important;
  font-size: 14px !important;
  flex-shrink: 0 !important;
  margin-top: 2px !important;
}

.event-info-card.price .info-icon {
  color: #22c55e !important;
}

.info-content {
  display: flex !important;
  flex-direction: column !important;
  gap: 2px !important;
  min-width: 0 !important;
  flex: 1 !important;
}

.info-label {
  font-size: 10px !important;
  color: #94a3b8 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.5px !important;
  font-weight: 500 !important;
}

.info-value {
  font-size: 11px !important;
  color: #ffffff !important;
  font-weight: 600 !important;
  white-space: normal !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  line-height: 1.3 !important;
  display: -webkit-box !important;
  -webkit-line-clamp: 2 !important;
  -webkit-box-orient: vertical !important;
  max-height: 28px !important;
}

.event-info-card.price .info-value {
  color: #22c55e !important;
  font-size: 14px !important;
  font-weight: 700 !important;
  white-space: nowrap !important;
  max-height: none !important;
  -webkit-line-clamp: none !important;
}

.buy-button {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 10px !important;
  width: 100% !important;
  padding: 16px 20px !important;
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%) !important;
  border: none !important;
  border-radius: 12px !important;
  color: white !important;
  font-size: 15px !important;
  font-weight: 700 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.8px !important;
  cursor: pointer !important;
  transition: all 0.3s ease !important;
  margin-top: auto !important;
  margin-bottom: 20px !important;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3) !important;
  min-height: 50px !important;
  flex-shrink: 0 !important;
}

.buy-button:hover {
  background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%) !important;
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4) !important;
  transform: translateY(-2px) !important;
}

.chain-icon {
  font-size: 16px !important;
  color: currentColor !important;
}

.accepted-chains {
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  padding: 14px 16px !important;
  background: rgba(255, 255, 255, 0.08) !important;
  border: 1px solid rgba(255, 255, 255, 0.15) !important;
  border-radius: 10px !important;
  margin-top: 0 !important;
  margin-bottom: 20px !important;
  flex-shrink: 0 !important;
  min-height: 50px !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
}

.accepts-label {
  font-size: 11px !important;
  color: #ffffff !important;
  text-transform: uppercase !important;
  letter-spacing: 0.5px !important;
  font-weight: 700 !important;
}

.chain-icons {
  display: flex !important;
  align-items: center !important;
  gap: 8px !important;
}

.chain-icons .chain-icon {
  color: rgba(255, 255, 255, 0.9) !important;
  font-size: 18px !important;
  transition: all 0.2s ease !important;
  padding: 3px !important;
}

.chain-icons .chain-icon:hover {
  color: #ffffff !important;
  transform: scale(1.15) !important;
}

.accepted-chains:hover {
  background: rgba(255, 255, 255, 0.12) !important;
  border-color: rgba(255, 255, 255, 0.25) !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
}

.chain-icons .chain-icon.eth {
  color: #627eea !important;
  background: rgba(98, 126, 234, 0.1) !important;
  border-radius: 6px !important;
}

.chain-icons .chain-icon.matic {
  color: #8247e5 !important;
  background: rgba(130, 71, 229, 0.1) !important;
  border-radius: 6px !important;
}

.chain-icons .chain-icon.card {
  color: #10b981 !important;
  background: rgba(16, 185, 129, 0.1) !important;
  border-radius: 6px !important;
}

/* RESPONSIVE */
@media (max-width: 1400px) {
  .events-grid {
    grid-template-columns: repeat(4, 1fr) !important;
  }
}

@media (max-width: 1200px) {
  .events-grid {
    grid-template-columns: repeat(3, 1fr) !important;
  }
}

@media (max-width: 1024px) {
  .events-grid {
    grid-template-columns: repeat(2, 1fr) !important;
  }
}

@media (max-width: 768px) {
  .events-grid {
    grid-template-columns: 1fr !important;
    gap: 20px !important;
    padding: 20px 16px !important;
  }
  
  .event-card {
    min-height: 660px !important;
  }
  
  .event-content {
    padding: 16px !important;
    gap: 12px !important;
    min-height: 540px !important;
  }
  
  .accepted-chains {
    margin-bottom: 20px !important;
    min-height: 55px !important;
    padding: 16px !important;
  }
  
  .buy-button {
    margin-bottom: 20px !important;
    min-height: 55px !important;
  }
}

@media (max-width: 480px) {
  .event-card {
    min-height: 690px !important;
  }
  
  .event-content {
    padding: 14px !important;
    min-height: 570px !important;
  }
  
  .event-info-grid {
    grid-template-columns: 1fr !important;
    gap: 8px !important;
  }
  
  .event-info-card {
    min-height: 65px !important;
    padding: 10px 8px !important;
  }
  
  .event-info-card.price {
    grid-column: 1 !important;
    min-height: 45px !important;
  }
  
  .info-value {
    font-size: 10px !important;
    max-height: 32px !important;
  }
  
  .info-label {
    font-size: 9px !important;
  }
  
  .accepted-chains {
    margin-bottom: 24px !important;
    min-height: 60px !important;
  }
  
  .buy-button {
    margin-bottom: 24px !important;
    min-height: 60px !important;
  }
}

/* BADGES Y ELEMENTOS ADICIONALES */
.event-badges {
  position: absolute !important;
  top: 8px !important;
  left: 8px !important;
  display: flex !important;
  gap: 6px !important;
  z-index: 3 !important;
}

.badge {
  display: flex !important;
  align-items: center !important;
  gap: 4px !important;
  padding: 4px 8px !important;
  border-radius: 12px !important;
  font-size: 10px !important;
  font-weight: 600 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.5px !important;
  backdrop-filter: blur(8px) !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
}

.badge.resale {
  background: rgba(168, 85, 247, 0.9) !important;
  color: white !important;
}

.badge.auction {
  background: rgba(245, 158, 11, 0.9) !important;
  color: white !important;
}

.badge-icon {
  font-size: 10px !important;
}

.event-subtitle {
  font-size: 13px !important;
  color: #94a3b8 !important;
  line-height: 1.4 !important;
  display: -webkit-box !important;
  -webkit-line-clamp: 2 !important;
  -webkit-box-orient: vertical !important;
  overflow: hidden !important;
  margin-top: 4px !important;
}

.title-section {
  flex-shrink: 0 !important;
  margin-bottom: 12px !important;
}

/* MEJORAR CENTRADO DE GRID */
.events-content .events-grid {
  justify-items: center !important;
  align-items: start !important;
}

.events-grid > * {
  width: 100% !important;
  max-width: 380px !important;
}

/* ASEGURAR QUE EL CONTENIDO SE DISTRIBUYA CORRECTAMENTE */
.title-section {
  flex-shrink: 0 !important;
  margin-bottom: 16px !important;
}

.event-info-grid {
  flex-shrink: 0 !important;
}

.buy-button {
  flex-shrink: 0 !important;
}

.accepted-chains {
  flex-shrink: 0 !important;
}

/* ANIMACIONES HOVER PARA LA CARD */
.event-card:hover {
  transform: translateY(-8px) !important;
  border-color: rgba(102, 126, 234, 0.3) !important;
  box-shadow: 
    0 12px 40px rgba(0, 0, 0, 0.25),
    0 4px 20px rgba(102, 126, 234, 0.15) !important;
}

.event-card:hover .event-image {
  transform: scale(1.05) !important;
}
`;

function App() {
  return (
    <Router>
      <div className="neural-app">
        <style dangerouslySetInnerHTML={{ __html: criticalStyles }} />
        <NeuralMenu />
        <Routes>
          <Route path="/" element={<NeuralHome />} />
          <Route path="/perfil" element={<ProfilePage />} />
          <Route path="/eventos" element={<EventsPage />} />
          <Route path="/crear-evento" element={<CreateEventPage />} />
          <Route path="/acerca-de" element={<NeuralAbout />} />
          <Route path="/roadmap" element={<RoadmapPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/marketplace" element={<MarketplacePage />} />
          <Route path="/docs" element={<DocsPage />} />
          <Route path="/ayuda" element={<HelpPage />} />
          <Route path="/terminos" element={<TermsPage />} />
          <Route path="/privacidad" element={<PrivacyPage />} />
          <Route path="/seguridad" element={<SecurityPage />} />
          <Route path="/ethereum" element={<EthereumPage />} />
          <Route path="/polygon" element={<PolygonPage />} />
          <Route path="/arbitrum" element={<ArbitrumPage />} />
          <Route path="/optimism" element={<OptimismPage />} />
        </Routes>
        <NeuralFooter />
      </div>
    </Router>
  )
}

export default App
