import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, GraduationCap, FileText, CheckCircle2 } from 'lucide-react';
import { API_URL } from '../config';
import './Streams.css';

export default function Streams() {
  const [streams, setStreams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeStreamId, setActiveStreamId] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/streams`)
      .then(res => res.json())
      .then(data => {
        setStreams(data);
        if (data.length > 0) setActiveStreamId(data[0].id);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching streams:', err);
        setLoading(false);
      });
  }, []);

  const activeStream = streams.find(s => s.id === activeStreamId);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="streams-page container section-padding"
      style={{ marginTop: '80px' }}
    >
      <div className="section-header">
        <h2>Intermediate Streams (10+2)</h2>
        <p>Compare core subjects, potential degree options, and essential entrance exams for major streams in India.</p>
      </div>

      {loading ? (
        <div className="loading-grid">
          {[1, 2, 3, 4, 5, 6].map(n => (
            <div key={n} className="shimmer-card shimmer" style={{ height: '140px', borderRadius: '12px' }}></div>
          ))}
        </div>
      ) : (
        <div className="streams-layout">
          {/* Stream Selection Tabs */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="streams-tabs-grid"
          >
            {streams.map((stream) => (
              <motion.button
                key={stream.id}
                variants={itemVariants}
                onClick={() => setActiveStreamId(stream.id)}
                className={`stream-tab-btn glass-card ${activeStreamId === stream.id ? 'active' : ''}`}
              >
                <h3>{stream.id.toUpperCase()}</h3>
                <p>{stream.name.split(' (')[0]}</p>
              </motion.button>
            ))}
          </motion.div>

          {/* Active Stream Details panel */}
          <AnimatePresence mode="wait">
            {activeStream && (
              <motion.div
                key={activeStream.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="stream-details-panel glass-card"
              >
                <div className="panel-header">
                  <div className="panel-badge">{activeStream.id.toUpperCase()}</div>
                  <h2>{activeStream.name}</h2>
                </div>

                <div className="panel-grid">
                  {/* Core Subjects */}
                  <div className="panel-col">
                    <div className="col-title">
                      <BookOpen className="col-icon text-blue" />
                      <h3>Core Subjects</h3>
                    </div>
                    <ul className="details-list">
                      {activeStream.coreSubjects.map((sub, i) => (
                        <li key={i}>
                          <CheckCircle2 size={16} className="list-bullet" />
                          <span>{sub}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Undergrad Degree Options */}
                  <div className="panel-col">
                    <div className="col-title">
                      <GraduationCap className="col-icon text-gold" />
                      <h3>Next Degree Options</h3>
                    </div>
                    <ul className="details-list">
                      {activeStream.nextDegreeOptions.map((deg, i) => (
                        <li key={i}>
                          <CheckCircle2 size={16} className="list-bullet" />
                          <span>{deg}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Entrance Exams */}
                  <div className="panel-col">
                    <div className="col-title">
                      <FileText className="col-icon text-red" />
                      <h3>Key Entrance Exams</h3>
                    </div>
                    <ul className="details-list">
                      {activeStream.keyEntranceExams.map((exam, i) => (
                        <li key={i}>
                          <CheckCircle2 size={16} className="list-bullet" />
                          <span>{exam}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
}
