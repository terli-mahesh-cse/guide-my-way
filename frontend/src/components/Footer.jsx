import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Heart, Mail, Phone, MapPin } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        {/* Info Column */}
        <div className="footer-col info-col">
          <Link to="/" className="footer-logo">
            <GraduationCap className="logo-icon" />
            <span className="logo-text">Guide<span className="gold-text">MyWay</span></span>
          </Link>
          <p className="footer-desc">
            An interactive, comprehensive career guidance platform dedicated to helping Indian students transition smoothly from Class 10 and Intermediate studies to their dream career paths.
          </p>
          <div className="contact-info">
            <div className="contact-item">
              <Mail size={16} /> <span>support@guidemyway.in</span>
            </div>
            <div className="contact-item">
              <Phone size={16} /> <span>+91 800-CAREER-GO</span>
            </div>
            <div className="contact-item">
              <MapPin size={16} /> <span>Hyderabad, India</span>
            </div>
          </div>
        </div>

        {/* Categories Column */}
        <div className="footer-col">
          <h3>Quick Pathways</h3>
          <ul>
            <li><Link to="/streams">Intermediate Streams</Link></li>
            <li><Link to="/engineering-diplomas">Engineering Diplomas</Link></li>
            <li><Link to="/non-engineering-diplomas">Non-Engineering Diplomas</Link></li>
            <li><Link to="/iti-trades">ITI Trades (Vocational)</Link></li>
            <li><Link to="/arts-humanities">Arts & Humanities</Link></li>
          </ul>
        </div>

        {/* Specialized Careers Column */}
        <div className="footer-col">
          <h3>Specialized Fields</h3>
          <ul>
            <li><Link to="/sports-pathways">Sports Academy Pathways</Link></li>
            <li><Link to="/defence-schemes">Defence Entry Schemes</Link></li>
            <li><Link to="/exams">Entrance Exam List</Link></li>
            <li><Link to="/timeline">Interactive Career Timeline</Link></li>
          </ul>
        </div>

        {/* Resources Column */}
        <div className="footer-col">
          <h3>Our Platform</h3>
          <ul>
            <li><Link to="/about">About Us & Impact</Link></li>
            <li><Link to="/">Home Dashboard</Link></li>
            <li><a href="#search-anchor">Search Platform</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container bottom-container">
          <p className="copyright">
            &copy; {new Date().getFullYear()} Guide My Way. All rights reserved.
          </p>
          <p className="made-with">
            Made with <Heart size={14} className="heart-icon" /> for Indian Students & Parents.
          </p>
        </div>
      </div>
    </footer>
  );
}
