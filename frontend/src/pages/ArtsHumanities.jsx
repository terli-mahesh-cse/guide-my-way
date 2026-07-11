import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Palette, GraduationCap, Briefcase, Clock, FileText } from 'lucide-react';
import { API_URL } from '../config';
import './ArtsHumanities.css';

export default function ArtsHumanities() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/arts-humanities`)
      .then(res => res.json())
      .then(data => {
        setItems(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching arts and humanities:', err);
        setLoading(false);
      });
  }, []);

  const specializations = items.filter(item => item.type === 'specialization');
  const professionalDegrees = items.filter(item => item.type === 'degree');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="arts-page container section-padding"
      style={{ marginTop: '80px' }}
    >
      <div className="section-header">
        <h2>Arts & Humanities</h2>
        <p>A realm of diverse, high-impact careers. Discover standard BA specializations and integrated professional degree pathways in law, journalism, design, and social sector works.</p>
      </div>

      {loading ? (
        <div className="loading-grid">
          {[1, 2, 3, 4].map(n => (
            <div key={n} className="shimmer-card shimmer" style={{ height: '200px', borderRadius: '12px' }}></div>
          ))}
        </div>
      ) : (
        <div className="arts-sections">
          {/* Professional Degrees Section */}
          <section className="arts-section">
            <div className="subsection-title">
              <GraduationCap className="icon" />
              <h3>Professional Degrees (Law, Design, Media)</h3>
            </div>
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="degrees-grid"
            >
              {professionalDegrees.map(deg => (
                <motion.div 
                  key={deg.id} 
                  variants={cardVariants}
                  className="degree-card glass-card"
                >
                  <div className="degree-header">
                    <h4>{deg.name}</h4>
                    <div className="tag-duration">
                      <Clock size={12} />
                      <span>{deg.duration.split(' (')[0]}</span>
                    </div>
                  </div>
                  <p className="full-form">{deg.fullForm}</p>
                  
                  <div className="careers-box">
                    <h5>
                      <Briefcase size={12} />
                      Career Opportunities
                    </h5>
                    <div className="career-tags">
                      {deg.careers.map((career, i) => (
                        <span key={i} className="c-tag">{career}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* BA Specializations Section */}
          <section className="arts-section">
            <div className="subsection-title">
              <Palette className="icon" />
              <h3>BA Academic Specializations</h3>
            </div>
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="specs-grid"
            >
              {specializations.map(spec => (
                <motion.div 
                  key={spec.id} 
                  variants={cardVariants}
                  className="spec-card glass-card"
                >
                  <h4>{spec.name}</h4>
                  <div className="paths-box">
                    <p className="paths-label">Key Profiles:</p>
                    <p className="paths-text">{spec.careerPaths.join(', ')}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </section>
        </div>
      )}
    </motion.div>
  );
}
