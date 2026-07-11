import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, CheckCircle2, ChevronRight } from 'lucide-react';
import { API_URL } from '../config';
import './Timeline.css';

export default function Timeline() {
  const [timelineData, setTimelineData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/timeline`)
      .then(res => res.json())
      .then(data => {
        setTimelineData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching timeline:', err);
        setLoading(false);
      });
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="timeline-page container section-padding"
      style={{ marginTop: '80px' }}
    >
      <div className="section-header">
        <h2>Interactive Career Timeline</h2>
        <p>A step-by-step view of milestones and key choices starting from Class 10 transition all the way to senior leadership and career peaks.</p>
      </div>

      {loading ? (
        <div className="shimmer-timeline shimmer" style={{ height: '500px', borderRadius: '12px' }}></div>
      ) : (
        <div className="timeline-container">
          {/* Vertical Connecting Line */}
          <div className="timeline-line"></div>

          {timelineData.map((stage, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div 
                key={stage.id} 
                className={`timeline-item ${isEven ? 'left' : 'right'}`}
              >
                {/* Scroll-Reveal Card Wrapper */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="timeline-card glass-card"
                >
                  <div className="card-top-row">
                    <span className="age-badge">
                      <Calendar size={12} />
                      <span>{stage.ageRange}</span>
                    </span>
                    <span className="step-count">STAGE {idx + 1}</span>
                  </div>
                  <h3>{stage.stage}</h3>

                  <div className="timeline-details-grid">
                    {/* Milestones Column */}
                    <div className="details-col">
                      <h5>Milestones Achieved</h5>
                      <ul>
                        {stage.milestones.map((ms, i) => (
                          <li key={i}>
                            <CheckCircle2 size={12} className="bullet-ms" />
                            <span>{ms}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Actions Column */}
                    <div className="details-col">
                      <h5>Recommended Actions</h5>
                      <ul>
                        {stage.actions.map((act, i) => (
                          <li key={i}>
                            <ChevronRight size={12} className="bullet-act" />
                            <span>{act}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>

                {/* Timeline Circle Center Node */}
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="timeline-node"
                >
                  <div className="node-inner"></div>
                </motion.div>
              </div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}
