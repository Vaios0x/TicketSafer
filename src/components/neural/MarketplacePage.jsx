import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaStore, 
  FaExchangeAlt, 
  FaTag, 
  FaGavel,
  FaFilter,
  FaChartLine,
  FaHistory,
  FaEthereum,
  FaShieldAlt,
  FaFire,
  FaStar,
  FaSort
} from 'react-icons/fa';
import '../../styles/marketplace.css';

const MarketplacePage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [filterPrice, setFilterPrice] = useState('all');

  const tabs = [
    { id: 'all', label: 'Todos', icon: <FaStore /> },
    { id: 'resale', label: 'Reventa', icon: <FaExchangeAlt /> },
    { id: 'auction', label: 'Subastas', icon: <FaGavel /> },
    { id: 'trending', label: 'Trending', icon: <FaChartLine /> }
  ];

  const marketplaceItems = [
    {
      id: 1,
      title: "EDC Las Vegas 2025",
      image: "/assets/events/edcvegas.jpg",
      originalPrice: "0.15 ETH",
      resalePrice: "0.25 ETH",
      seller: "@edcfan92",
      timeLeft: "2h 15m",
      type: "resale",
      trending: true,
      chain: "ethereum"
    },
    {
      id: 2,
      title: "Ultra Music Festival",
      image: "/assets/events/ultra.jpg",
      originalPrice: "450 MATIC",
      currentBid: "680 MATIC",
      seller: "@musiclover",
      timeLeft: "4h 32m",
      type: "auction",
      bids: 7,
      chain: "polygon"
    },
    {
      id: 3,
      title: "Tomorrowland Belgium",
      image: "/assets/events/tomorrowland.jpg",
      originalPrice: "0.18 ETH",
      resalePrice: "0.22 ETH",
      seller: "@tmlbel",
      timeLeft: "1d 8h",
      type: "resale",
      verified: true,
      chain: "arbitrum"
    }
  ];

  const stats = [
    { label: "Total en Ventas", value: "1,250 ETH", icon: <FaEthereum /> },
    { label: "Transacciones", value: "12,456", icon: <FaExchangeAlt /> },
    { label: "Usuarios Activos", value: "8,923", icon: <FaShieldAlt /> },
    { label: "Eventos Listados", value: "456", icon: <FaStore /> }
  ];

  return (
    <div className="marketplace-page">
      {/* Hero Section */}
      <motion.div 
        className="marketplace-hero"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="neural-container">
          <div className="hero-content">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <FaStore className="hero-icon" />
              Marketplace NFT
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Compra, vende y subasta tickets NFT de forma segura en nuestra plataforma descentralizada
            </motion.p>
          </div>
        </div>
      </motion.div>

      {/* Stats Section */}
      <motion.section 
        className="marketplace-stats"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="neural-container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="stat-card"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Filters and Tabs */}
      <section className="marketplace-controls">
        <div className="neural-container">
          <div className="controls-grid">
            {/* Tabs */}
            <div className="marketplace-tabs">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </motion.button>
              ))}
            </div>

            {/* Filters */}
            <div className="marketplace-filters">
              <div className="filter-group">
                <FaSort className="filter-icon" />
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="filter-select"
                >
                  <option value="recent">Más Recientes</option>
                  <option value="price-low">Precio: Menor a Mayor</option>
                  <option value="price-high">Precio: Mayor a Menor</option>
                  <option value="ending">Terminando Pronto</option>
                </select>
              </div>

              <div className="filter-group">
                <FaFilter className="filter-icon" />
                <select 
                  value={filterPrice} 
                  onChange={(e) => setFilterPrice(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">Todos los Precios</option>
                  <option value="under-100">Menos de $100</option>
                  <option value="100-500">$100 - $500</option>
                  <option value="over-500">Más de $500</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marketplace Grid */}
      <section className="marketplace-grid-section">
        <div className="neural-container">
          <div className="marketplace-grid">
            {marketplaceItems.map((item, index) => (
              <motion.div
                key={item.id}
                className="marketplace-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="card-header">
                  <div className="card-image">
                    <img src={item.image} alt={item.title} />
                    <div className="card-badges">
                      {item.trending && (
                        <span className="badge trending">
                          <FaFire /> Trending
                        </span>
                      )}
                      {item.verified && (
                        <span className="badge verified">
                          <FaShieldAlt /> Verificado
                        </span>
                      )}
                      <span className={`badge chain ${item.chain}`}>
                        {item.chain === 'ethereum' && <FaEthereum />}
                        {item.chain === 'polygon' && '⬣'}
                        {item.chain === 'arbitrum' && '◉'}
                        {item.chain}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="card-content">
                  <h3 className="card-title">{item.title}</h3>
                  
                  <div className="price-section">
                    <div className="original-price">
                      <span className="label">Precio Original:</span>
                      <span className="value">{item.originalPrice}</span>
                    </div>
                    
                    {item.type === 'auction' ? (
                      <div className="current-bid">
                        <span className="label">Oferta Actual:</span>
                        <span className="value highlight">{item.currentBid}</span>
                        <span className="bids-count">{item.bids} ofertas</span>
                      </div>
                    ) : (
                      <div className="resale-price">
                        <span className="label">Precio de Venta:</span>
                        <span className="value highlight">{item.resalePrice}</span>
                      </div>
                    )}
                  </div>

                  <div className="card-meta">
                    <div className="seller-info">
                      <span className="label">Vendedor:</span>
                      <span className="seller">{item.seller}</span>
                    </div>
                    <div className="time-left">
                      <FaHistory className="time-icon" />
                      <span>{item.timeLeft}</span>
                    </div>
                  </div>

                  <div className="card-actions">
                    {item.type === 'auction' ? (
                      <motion.button
                        className="action-button bid"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <FaGavel />
                        Hacer Oferta
                      </motion.button>
                    ) : (
                      <motion.button
                        className="action-button buy"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <FaTag />
                        Comprar Ahora
                      </motion.button>
                    )}
                    
                    <motion.button
                      className="action-button secondary"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FaStar />
                      Favorito
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <motion.section 
        className="marketplace-cta"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="neural-container">
          <div className="cta-content">
            <h2>¿Tienes tickets para vender?</h2>
            <p>Lista tus tickets NFT en nuestro marketplace y alcanza miles de compradores</p>
            <motion.button
              className="cta-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaStore />
              Vender Mis Tickets
            </motion.button>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default MarketplacePage; 