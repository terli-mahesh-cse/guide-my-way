import React from 'react';
import { motion } from 'framer-motion';
import { Target, Heart, Eye, HelpCircle } from 'lucide-react';
import './About.css';

export default function About() {
  const values = [
    {
      icon: Target,
      title: 'Our Mission',
      desc: 'To simplify academic-to-career transitions for millions of Indian school and college students, helping them select paths based on facts rather than peer pressure.'
    },
    {
      icon: Eye,
      title: 'Our Vision',
      desc: 'To become India’s most comprehensive, transparent, and trustworthy database of intermediate streams, vocational diplomas, entrance examinations, and sports/defence options.'
    },
    {
      icon: Heart,
      title: 'Empowerment',
      desc: 'Helping parents and students sit together and compare options logically by providing simple explanations, career roles, and entry criteria.'
    }
  ];

  const faqs = [
    {
      q: 'How does Guide My Way help students after Class 10?',
      a: 'We lay out all available pathways clearly—not just the standard Intermediate streams (MPC, BiPC, CEC, etc.) but also polytechnic engineering diplomas, vocational ITI trades, professional law or design courses, and sports or defence entrances.'
    },
    {
      q: 'What is the advantage of joining a polytechnic diploma or ITI?',
      a: 'Diplomas and ITI trades offer rapid, job-focused training. A diploma allows lateral entry directly into the 2nd year of a B.Tech degree later, whereas ITI trades offer direct vocational certifications for immediate public/private sector jobs.'
    },
    {
      q: 'How is the data sourced and structured?',
      a: 'Our data is structured based on actual curriculum maps, board guidelines, and direct governmental pathways (like the UPSC defence recruitment calendar and SAI sports guidelines). It is hosted via FastAPI to provide instantaneous search capability.'
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="about-page container section-padding"
      style={{ marginTop: '80px' }}
    >
      <div className="section-header">
        <h2>About Guide My Way</h2>
        <p>A specialized student-centric resource designed to bridge the counseling gap in Indian schools and colleges.</p>
      </div>

      {/* Intro Mission Card */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="intro-card glass-card"
      >
        <h3>Bridging the Counseling Gap</h3>
        <p>
          In India, millions of students finish Class 10 every year and make critical stream decisions without knowing the full breadth of options. "Guide My Way" was created to provide a complete, transparent, and free directory of pathways. From standard intermediate courses to vocational trades, professional degrees, national sports academies, and defence commission entries—we lay out the exact eligibility criteria, selection processes, and career outcomes.
        </p>
      </motion.div>

      {/* Core Values Section */}
      <section className="about-section">
        <h3 className="section-title">Core Principles</h3>
        <div className="values-grid">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <div key={i} className="value-card glass-card">
                <div className="val-icon-box">
                  <Icon size={24} />
                </div>
                <h4>{v.title}</h4>
                <p>{v.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* FAQs Accordion */}
      <section className="about-section">
        <h3 className="section-title">Frequently Asked Questions</h3>
        <div className="faqs-list">
          {faqs.map((faq, idx) => (
            <div key={idx} className="faq-item glass-card">
              <div className="faq-q">
                <HelpCircle size={18} className="faq-q-icon" />
                <h4>{faq.q}</h4>
              </div>
              <p className="faq-a">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
