import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Search, Plus, Minus, Wrench, Shield } from 'lucide-react';
import { API_URL } from '../config';
import './ItiTrades.css';

export default function ItiTrades() {
  const [tradesData, setTradesData] = useState({ engineering: [], nonEngineering: [] });
  const [activeTab, setActiveTab] = useState('engineering'); // 'engineering' or 'nonEngineering'
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/iti-trades`)
      .then(res => res.json())
      .then(data => {
        setTradesData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching ITI trades:', err);
        setLoading(false);
      });
  }, []);

  const activeTradesList = tradesData[activeTab] || [];
  
  const filteredTrades = activeTradesList.filter(t => 
    t.tradeName.toLowerCase().includes(search.toLowerCase()) ||
    t.careerOpportunities.some(opp => opp.toLowerCase().includes(search.toLowerCase()))
  );

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="iti-page container section-padding"
      style={{ marginTop: '80px' }}
    >
      <div className="section-header">
        <h2>ITI Vocational Trades</h2>
        <p>Job-oriented industrial training courses. Discover 50 different trades categorized under Engineering (technical/manufacturing) and Non-Engineering (service/commercial sectors).</p>
      </div>

      {/* Tabs and Search */}
      <div className="iti-controls">
        <div className="tab-buttons">
          <button 
            className={`tab-btn ${activeTab === 'engineering' ? 'active' : ''}`}
            onClick={() => { setActiveTab('engineering'); setExpandedId(null); }}
          >
            <Wrench size={16} />
            <span>Engineering Trades (25)</span>
          </button>
          <button 
            className={`tab-btn ${activeTab === 'nonEngineering' ? 'active' : ''}`}
            onClick={() => { setActiveTab('nonEngineering'); setExpandedId(null); }}
          >
            <Briefcase size={16} />
            <span>Non-Engineering Trades (25)</span>
          </button>
        </div>

        <div className="search-input-wrapper trade-search">
          <Search className="search-icon" />
          <input 
            type="text" 
            placeholder="Search trades or career sectors..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field search-input"
            style={{ height: '48px' }}
          />
        </div>
      </div>

      {loading ? (
        <div className="trades-grid">
          {[1, 2, 3, 4, 5, 6].map(n => (
            <div key={n} className="shimmer-card shimmer" style={{ height: '100px', borderRadius: '12px' }}></div>
          ))}
        </div>
      ) : (
        <motion.div 
          layout
          className="trades-grid"
        >
          <AnimatePresence>
            {filteredTrades.map((trade) => {
              const isExpanded = expandedId === trade.id;
              return (
                <motion.div
                  key={trade.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className={`trade-card glass-card ${isExpanded ? 'expanded' : ''}`}
                  onClick={() => toggleExpand(trade.id)}
                >
                  <div className="trade-summary">
                    <div className="trade-title-group">
                      <span className={`trade-badge ${activeTab}`}>{activeTab === 'engineering' ? 'ENG' : 'NON-ENG'}</span>
                      <h3>{trade.tradeName}</h3>
                    </div>
                    <button className="expand-btn">
                      {isExpanded ? <Minus size={18} /> : <Plus size={18} />}
                    </button>
                  </div>

                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="trade-expanded-content"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="divider"></div>
                      <h4>Employment & Career Opportunities</h4>
                      <p className="opp-details">{trade.careerOpportunities[0]}</p>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      )}
    </motion.div>
  );
}
