import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GraduationCap, 
  ChevronDown, 
  Menu, 
  X, 
  BookOpen, 
  Cpu, 
  Briefcase, 
  Scissors, 
  Palette, 
  Award, 
  Shield,
  FileText,
  Clock,
  Info
} from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on path change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
  }, [location]);

  const categories = [
    { name: 'Intermediate Streams', path: '/streams', icon: BookOpen, desc: 'MPC, BiPC, CEC, HEC, MEC, MBiPC' },
    { name: 'Engineering Diplomas', path: '/engineering-diplomas', icon: Cpu, desc: 'Polytechnic branches' },
    { name: 'Non-Engineering Diplomas', path: '/non-engineering-diplomas', icon: Scissors, desc: 'D.Pharm, GNM, Fashion, etc.' },
    { name: 'ITI Trades', path: '/iti-trades', icon: Briefcase, desc: '50 Engineering & Non-Eng trades' },
    { name: 'Arts & Humanities', path: '/arts-humanities', icon: Palette, desc: 'BA Specializations & Law, BJMC' },
    { name: 'Sports Pathways', path: '/sports-pathways', icon: Award, desc: 'Academy routes & Govt schemes' },
    { name: 'Defence Entry', path: '/defence-schemes', icon: Shield, desc: 'NDA, CDS, AFCAT & SSB Guide' },
  ];

  return (
    <header className={`navbar-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        {/* Brand Logo */}
        <Link to="/" className="brand-logo">
          <GraduationCap className="logo-icon" />
          <span className="logo-text">Guide<span className="gold-text">MyWay</span></span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
          
          {/* Categories Dropdown */}
          <div 
            className="dropdown-container"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <button className={`nav-link dropdown-trigger ${isDropdownOpen ? 'active' : ''}`}>
              Career Categories <ChevronDown className={`chevron-icon ${isDropdownOpen ? 'open' : ''}`} />
            </button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  transition={{ duration: 0.2 }}
                  className="mega-menu"
                >
                  <div className="mega-menu-grid">
                    {categories.map((cat, idx) => {
                      const Icon = cat.icon;
                      return (
                        <Link key={idx} to={cat.path} className="mega-menu-item">
                          <div className="item-icon-wrapper">
                            <Icon className="item-icon" />
                          </div>
                          <div className="item-details">
                            <div className="item-name">{cat.name}</div>
                            <div className="item-desc">{cat.desc}</div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link to="/exams" className={`nav-link ${location.pathname === '/exams' ? 'active' : ''}`}>
            <FileText className="nav-link-icon" /> Exams
          </Link>
          <Link to="/timeline" className={`nav-link ${location.pathname === '/timeline' ? 'active' : ''}`}>
            <Clock className="nav-link-icon" /> Career Timeline
          </Link>
          <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}>
            <Info className="nav-link-icon" /> About
          </Link>
        </nav>

        {/* Mobile Menu Trigger */}
        <button className="mobile-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="mobile-drawer"
          >
            <div className="mobile-drawer-content">
              <Link to="/" className="mobile-logo" onClick={() => setIsMobileMenuOpen(false)}>
                <GraduationCap className="logo-icon" />
                <span className="logo-text">Guide<span className="gold-text">MyWay</span></span>
              </Link>
              
              <div className="mobile-nav-links">
                <Link to="/" className={`mobile-nav-link ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
                
                <div className="mobile-section-title">Career Categories</div>
                <div className="mobile-categories-grid">
                  {categories.map((cat, idx) => {
                    const Icon = cat.icon;
                    return (
                      <Link 
                        key={idx} 
                        to={cat.path} 
                        className={`mobile-cat-link ${location.pathname === cat.path ? 'active' : ''}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Icon size={18} className="mobile-cat-icon" />
                        <span>{cat.name}</span>
                      </Link>
                    );
                  })}
                </div>

                <div className="mobile-section-divider"></div>

                <Link to="/exams" className={`mobile-nav-link ${location.pathname === '/exams' ? 'active' : ''}`}>Exams</Link>
                <Link to="/timeline" className={`mobile-nav-link ${location.pathname === '/timeline' ? 'active' : ''}`}>Career Timeline</Link>
                <Link to="/about" className={`mobile-nav-link ${location.pathname === '/about' ? 'active' : ''}`}>About</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
