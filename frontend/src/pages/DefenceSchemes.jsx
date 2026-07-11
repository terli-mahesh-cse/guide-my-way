import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, BookOpen, Award, CheckCircle2, Navigation, Anchor, Compass } from 'lucide-react';
import { API_URL } from '../config';
import './DefenceSchemes.css';

export default function DefenceSchemes() {
  const [data, setData] = useState({ pathways: [], ssbProcess: {} });
  const [loading, setLoading] = useState(true);
  const [activeDay, setActiveDay] = useState('day1');

  useEffect(() => {
    fetch(`${API_URL}/api/defence-schemes`)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching defence schemes:', err);
        setLoading(false);
      });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 }
  };

  // Day array for mapping the SSB timeline
  const ssbDays = ['day1', 'day2', 'day3', 'day4', 'day5'];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="defence-page container section-padding"
      style={{ marginTop: '80px' }}
    >
      <div className="section-header">
        <h2>Defence Entry Pathways & SSB Guide</h2>
        <p>Serve the nation with pride. Explore entry channels into the Army, Navy, and Air Force, followed by the rigorous 5-day SSB interview roadmap.</p>
      </div>

      {loading ? (
        <div className="loading-grid">
          {[1, 2, 3].map(n => (
            <div key={n} className="shimmer-card shimmer" style={{ height: '220px', borderRadius: '12px' }}></div>
          ))}
        </div>
      ) : (
        <div className="defence-content">
          {/* 8 Entry Pathways */}
          <section className="defence-section">
            <div className="subsection-title">
              <Shield className="icon" />
              <h3>Commissioned Officer Entry Pathways</h3>
            </div>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="pathways-grid"
            >
              {data.pathways.map(path => (
                <motion.div key={path.id} variants={itemVariants} className="pathway-card glass-card">
                  <div className="pathway-header">
                    <h4>{path.scheme}</h4>
                    <span className="rank-tag">{path.rank.split(' / ')[0]}</span>
                  </div>
                  
                  <div className="pathway-details">
                    <div className="detail-item">
                      <span className="label">Eligibility:</span>
                      <p className="val">{path.eligibility}</p>
                    </div>
                    <div className="detail-item">
                      <span className="label">Selection Process:</span>
                      <p className="val">{path.selectionProcess}</p>
                    </div>
                    <div className="detail-item">
                      <span className="label">Academy Training:</span>
                      <p className="val">{path.training}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* Interactive SSB 5-Day Process Breakdown */}
          <section className="defence-section">
            <div className="subsection-title">
              <Compass className="icon" />
              <h3>Interactive 5-Day SSB Selection Process</h3>
            </div>

            <div className="ssb-timeline-container glass-card">
              {/* Day Selection Tabs */}
              <div className="ssb-tabs">
                {ssbDays.map((day, idx) => (
                  <button 
                    key={day}
                    onClick={() => setActiveDay(day)}
                    className={`ssb-tab-btn ${activeDay === day ? 'active' : ''}`}
                  >
                    <span className="tab-day-label">DAY</span>
                    <span className="tab-day-num">{idx + 1}</span>
                  </button>
                ))}
              </div>

              {/* Dynamic Day Description */}
              <div className="ssb-details-display">
                <AnimatePresence mode="wait">
                  {data.ssbProcess[activeDay] && (
                    <motion.div
                      key={activeDay}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.25 }}
                      className="ssb-details-content"
                    >
                      <div className="ssb-badge">DAY {ssbDays.indexOf(activeDay) + 1}</div>
                      <h4>{data.ssbProcess[activeDay].title}</h4>
                      <p className="ssb-description">{data.ssbProcess[activeDay].details}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </section>
        </div>
      )}
    </motion.div>
  );
}
