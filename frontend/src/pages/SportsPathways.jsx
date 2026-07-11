import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, Star, Trophy, ArrowRight, ShieldCheck } from 'lucide-react';
import { API_URL } from '../config';
import './SportsPathways.css';

export default function SportsPathways() {
  const [data, setData] = useState({ disciplines: [], schemes: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/sports-pathways`)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching sports pathways:', err);
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

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="sports-page container section-padding"
      style={{ marginTop: '80px' }}
    >
      <div className="section-header">
        <h2>Sports Career Pathways</h2>
        <p>Turning passion into a profession. Explore district-to-national pathways for 12 key disciplines and major Indian government support schemes.</p>
      </div>

      {loading ? (
        <div className="loading-grid">
          {[1, 2, 3].map(n => (
            <div key={n} className="shimmer-card shimmer" style={{ height: '180px', borderRadius: '12px' }}></div>
          ))}
        </div>
      ) : (
        <div className="sports-content">
          {/* Sports Disciplines Grid */}
          <section className="sports-section">
            <div className="subsection-title">
              <Trophy className="icon" />
              <h3>Disciplines & Academy Pathways</h3>
            </div>
            
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="disciplines-grid"
            >
              {data.disciplines.map(d => {
                const steps = d.academyPathway.split(' -> ');
                return (
                  <motion.div key={d.id} variants={itemVariants} className="sport-card glass-card">
                    <div className="sport-title-row">
                      <Star className="sport-icon" size={18} />
                      <h4>{d.sport}</h4>
                    </div>
                    
                    <div className="steps-container">
                      {steps.map((step, idx) => (
                        <div key={idx} className="step-row">
                          <div className="step-num">{idx + 1}</div>
                          <div className="step-text">{step}</div>
                          {idx < steps.length - 1 && <ArrowRight className="step-arrow" size={14} />}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </section>

          {/* Government Support Schemes */}
          <section className="sports-section">
            <div className="subsection-title">
              <ShieldCheck className="icon" />
              <h3>Government Support & Scholarships</h3>
            </div>

            <div className="schemes-grid">
              {data.schemes.map((scheme, idx) => (
                <div key={idx} className="scheme-card glass-card">
                  <div className="scheme-icon-box">
                    <Award size={20} />
                  </div>
                  <div className="scheme-info">
                    <h4>{scheme.name}</h4>
                    <p>{scheme.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </motion.div>
  );
}
