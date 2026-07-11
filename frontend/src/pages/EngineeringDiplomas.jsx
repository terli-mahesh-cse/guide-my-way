import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Search, Clock, Award, Briefcase, Plus, Minus } from 'lucide-react';
import { API_URL } from '../config';
import './EngineeringDiplomas.css';

export default function EngineeringDiplomas() {
  const [diplomas, setDiplomas] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/engineering-diplomas`)
      .then(res => res.json())
      .then(data => {
        setDiplomas(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching diplomas:', err);
        setLoading(false);
      });
  }, []);

  const filteredDiplomas = diplomas.filter(d => 
    d.branch.toLowerCase().includes(search.toLowerCase()) ||
    d.careerRoles.some(role => role.toLowerCase().includes(search.toLowerCase()))
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
      className="diplomas-page container section-padding"
      style={{ marginTop: '80px' }}
    >
      <div className="section-header">
        <h2>Engineering Diplomas (Polytechnic)</h2>
        <p>A fast track to professional engineering careers. Explore 20 distinct technical branches, typical career roles, and options for lateral entry into B.Tech.</p>
      </div>

      {/* Search Filter */}
      <div className="filter-wrapper">
        <div className="search-input-wrapper" style={{ maxWidth: '480px', margin: '0 auto 3rem auto' }}>
          <Search className="search-icon" />
          <input 
            type="text" 
            placeholder="Search branches or roles (e.g., 'Civil', 'Software')..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field search-input"
            style={{ height: '50px' }}
          />
        </div>
      </div>

      {loading ? (
        <div className="diplomas-grid">
          {[1, 2, 3, 4, 5, 6].map(n => (
            <div key={n} className="shimmer-card shimmer" style={{ height: '120px', borderRadius: '12px' }}></div>
          ))}
        </div>
      ) : (
        <motion.div 
          layout
          className="diplomas-grid"
        >
          <AnimatePresence>
            {filteredDiplomas.map((dip) => {
              const isExpanded = expandedId === dip.id;
              return (
                <motion.div
                  key={dip.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className={`diploma-card glass-card ${isExpanded ? 'expanded' : ''}`}
                  onClick={() => toggleExpand(dip.id)}
                >
                  <div className="card-summary">
                    <div className="summary-left">
                      <div className="icon-box">
                        <Cpu size={20} />
                      </div>
                      <div>
                        <h3>{dip.branch}</h3>
                        <div className="duration-tag">
                          <Clock size={12} />
                          <span>{dip.duration}</span>
                        </div>
                      </div>
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
                      className="card-expanded-content"
                      onClick={(e) => e.stopPropagation()} // Prevent closing when clicking content
                    >
                      <div className="divider"></div>
                      
                      <div className="content-section">
                        <h4>
                          <Briefcase size={14} className="section-title-icon" />
                          Career Roles
                        </h4>
                        <div className="tags-grid">
                          {dip.careerRoles.map((role, idx) => (
                            <span key={idx} className="role-tag">{role}</span>
                          ))}
                        </div>
                      </div>

                      <div className="content-section">
                        <h4>
                          <Award size={14} className="section-title-icon" />
                          Higher Study Paths
                        </h4>
                        <ul className="studies-list">
                          {dip.higherStudy.map((study, idx) => (
                            <li key={idx}>{study}</li>
                          ))}
                        </ul>
                      </div>
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
