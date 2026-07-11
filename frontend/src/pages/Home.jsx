import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  ArrowRight, 
  BookOpen, 
  Cpu, 
  Scissors, 
  Briefcase, 
  Palette, 
  Award, 
  Shield, 
  ChevronRight,
  TrendingUp,
  Sparkles,
  Users
} from 'lucide-react';
import { API_URL } from '../config';
import './Home.css';

// Custom Stat Counter Component using IntersectionObserver
function Counter({ end, duration = 1.5, suffix = "" }) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );
    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };
    window.requestAnimationFrame(step);
  }, [hasStarted, end, duration]);

  return <span ref={elementRef}>{count}{suffix}</span>;
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSearchSticky, setIsSearchSticky] = useState(false);
  const searchBarRef = useRef(null);
  const navigate = useNavigate();

  // Handle sticky search bar on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (searchBarRef.current) {
        const offsetTop = searchBarRef.current.offsetTop;
        if (window.scrollY > 400) {
          setIsSearchSticky(true);
        } else {
          setIsSearchSticky(false);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch search results
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults(null);
      setShowDropdown(false);
      return;
    }

    const delayDebounce = setTimeout(async () => {
      setIsSearching(true);
      try {
        const res = await fetch(`${API_URL}/api/search?q=${encodeURIComponent(searchQuery)}`);
        if (res.ok) {
          const data = await res.json();
          setSearchResults(data);
          setShowDropdown(true);
        }
      } catch (err) {
        console.error('Error fetching search results:', err);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  const categories = [
    { name: 'Intermediate Streams', path: '/streams', icon: BookOpen, desc: 'MPC, BiPC, CEC, HEC, MEC, MBiPC pathways', color: '#3b82f6' },
    { name: 'Engineering Diplomas', path: '/engineering-diplomas', icon: Cpu, desc: 'Explore 20 core polytechnic specializations', color: '#10b981' },
    { name: 'Non-Engineering Diplomas', path: '/non-engineering-diplomas', icon: Scissors, desc: 'D.Pharm, Nursing, Fashion & 11 other branches', color: '#f59e0b' },
    { name: 'ITI Vocational Trades', path: '/iti-trades', icon: Briefcase, desc: '50 job-oriented engineering & non-eng trades', color: '#ec4899' },
    { name: 'Arts & Humanities', path: '/arts-humanities', icon: Palette, desc: 'BA Specializations & professional degrees', color: '#8b5cf6' },
    { name: 'Sports Academy Pathways', path: '/sports-pathways', icon: Award, desc: '12 Sports disciplines & government schemes', color: '#f97316' },
    { name: 'Defence Entry Schemes', path: '/defence-schemes', icon: Shield, desc: 'NDA, CDS, AFCAT routes & 5-Day SSB guide', color: '#ef4444' },
  ];

  // Helper to check if search results are empty
  const hasResults = (results) => {
    if (!results) return false;
    return Object.values(results).some(arr => arr && arr.length > 0);
  };

  const handleResultClick = (path) => {
    setSearchQuery('');
    setShowDropdown(false);
    navigate(path);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="home-page"
    >
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="hero-badge"
          >
            <Sparkles size={14} className="badge-icon" />
            <span>Empowering Indian Careers</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            From Intermediate to Career <br />
            <span className="gold-text">Your Complete Roadmap</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="hero-subtitle"
          >
            Making career decisions simple, scientific, and structured. Discover streams, polytechnics, vocational training, professional degrees, sports academies, and defence entrance pathways.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="hero-actions"
          >
            <a href="#pathways-anchor" className="btn btn-primary">
              Explore Pathways <ArrowRight size={16} style={{ marginLeft: '0.5rem' }} />
            </a>
            <Link to="/timeline" className="btn btn-outline">
              Interactive Timeline
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Floating Sticky Search Bar Section */}
      <section className="search-section" id="search-anchor" ref={searchBarRef}>
        <div className="container">
          <div className={`search-container-wrap ${isSearchSticky ? 'sticky-search' : ''}`}>
            <div className="search-input-wrapper">
              <Search className="search-icon" />
              <input 
                type="text" 
                placeholder="Search careers, exams, streams (e.g., 'Law', 'JEE', 'BiPC', 'Navy')..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field search-input"
                onFocus={() => setShowDropdown(true)}
              />
              {isSearching && <div className="spinner"></div>}
            </div>

            {/* Live Search Dropdown */}
            <AnimatePresence>
              {showDropdown && searchQuery.trim() && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="search-results-dropdown glass-card"
                >
                  <div className="dropdown-header">
                    <span>Search Results for "{searchQuery}"</span>
                    <button className="close-dropdown" onClick={() => setShowDropdown(false)}>Close</button>
                  </div>
                  
                  <div className="dropdown-scroll-area">
                    {!isSearching && !hasResults(searchResults) && (
                      <div className="no-results-msg">No results matching your query found. Try searching another keyword.</div>
                    )}

                    {searchResults && (
                      <>
                        {/* Streams Results */}
                        {searchResults.streams && searchResults.streams.length > 0 && (
                          <div className="result-category">
                            <h4>Intermediate Streams</h4>
                            {searchResults.streams.map(item => (
                              <div key={item.id} className="result-item" onClick={() => handleResultClick('/streams')}>
                                <span className="result-title">{item.name}</span>
                                <span className="result-sub">Subjects: {item.coreSubjects.join(', ')}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Engineering Diplomas */}
                        {searchResults.engineeringDiplomas && searchResults.engineeringDiplomas.length > 0 && (
                          <div className="result-category">
                            <h4>Engineering Diplomas</h4>
                            {searchResults.engineeringDiplomas.map(item => (
                              <div key={item.id} className="result-item" onClick={() => handleResultClick('/engineering-diplomas')}>
                                <span className="result-title">{item.branch} ({item.duration})</span>
                                <span className="result-sub">Roles: {item.careerRoles.slice(0, 3).join(', ')}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Non-Engineering Diplomas */}
                        {searchResults.nonEngineeringDiplomas && searchResults.nonEngineeringDiplomas.length > 0 && (
                          <div className="result-category">
                            <h4>Non-Engineering Diplomas</h4>
                            {searchResults.nonEngineeringDiplomas.map(item => (
                              <div key={item.id} className="result-item" onClick={() => handleResultClick('/non-engineering-diplomas')}>
                                <span className="result-title">{item.diploma}</span>
                                <span className="result-sub">Roles: {item.careerRoles.slice(0, 3).join(', ')}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* ITI Trades */}
                        {searchResults.itiTrades && searchResults.itiTrades.length > 0 && (
                          <div className="result-category">
                            <h4>ITI Vocational Trades</h4>
                            {searchResults.itiTrades.map(item => (
                              <div key={item.id} className="result-item" onClick={() => handleResultClick('/iti-trades')}>
                                <span className="result-title">{item.tradeName} ({item.category === 'engineering' ? 'Engineering' : 'Non-Engineering'})</span>
                                <span className="result-sub">Opportunities: {item.careerOpportunities.join(', ')}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Arts & Humanities */}
                        {searchResults.artsHumanities && searchResults.artsHumanities.length > 0 && (
                          <div className="result-category">
                            <h4>Arts & Humanities</h4>
                            {searchResults.artsHumanities.map(item => (
                              <div key={item.id} className="result-item" onClick={() => handleResultClick('/arts-humanities')}>
                                <span className="result-title">{item.name} ({item.type === 'degree' ? 'Professional Degree' : 'Specialization'})</span>
                                <span className="result-sub">
                                  {item.type === 'degree' ? `Careers: ${item.careers.slice(0,3).join(', ')}` : `Careers: ${item.careerPaths.slice(0,3).join(', ')}`}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Sports Pathways */}
                        {searchResults.sportsPathways && searchResults.sportsPathways.length > 0 && (
                          <div className="result-category">
                            <h4>Sports Pathways & Schemes</h4>
                            {searchResults.sportsPathways.map(item => (
                              <div key={item.id || item.name} className="result-item" onClick={() => handleResultClick('/sports-pathways')}>
                                <span className="result-title">{item.sport || item.name}</span>
                                <span className="result-sub">{item.academyPathway || item.description}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Defence Schemes */}
                        {searchResults.defenceSchemes && searchResults.defenceSchemes.length > 0 && (
                          <div className="result-category">
                            <h4>Defence entry / SSB</h4>
                            {searchResults.defenceSchemes.map(item => (
                              <div key={item.id} className="result-item" onClick={() => handleResultClick('/defence-schemes')}>
                                <span className="result-title">{item.scheme}</span>
                                <span className="result-sub">Rank: {item.rank || 'N/A'} | Eligibility: {item.eligibility}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Exams */}
                        {searchResults.exams && searchResults.exams.length > 0 && (
                          <div className="result-category">
                            <h4>Entrance Exams</h4>
                            {searchResults.exams.map(item => (
                              <div key={item.id} className="result-item" onClick={() => handleResultClick('/exams')}>
                                <span className="result-title">{item.examName}</span>
                                <span className="result-sub">Conducted by: {item.conductedBy} | Month: {item.month}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Timeline */}
                        {searchResults.timeline && searchResults.timeline.length > 0 && (
                          <div className="result-category">
                            <h4>Timeline Stages</h4>
                            {searchResults.timeline.map(item => (
                              <div key={item.id} className="result-item" onClick={() => handleResultClick('/timeline')}>
                                <span className="result-title">{item.stage} ({item.ageRange})</span>
                                <span className="result-sub">Milestones: {item.milestones.slice(0, 2).join(', ')}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Stats Section with counters */}
      <section className="stats-section">
        <div className="container stats-grid">
          <div className="stat-card">
            <h3><Counter end={10} suffix=" Lakh+" /></h3>
            <p>Students Guided</p>
          </div>
          <div className="stat-card">
            <h3><Counter end={28} suffix="+" /></h3>
            <p>States Covered</p>
          </div>
          <div className="stat-card">
            <h3><Counter end={200} suffix="+" /></h3>
            <p>Careers Explored</p>
          </div>
          <div className="stat-card">
            <h3><Counter end={50} suffix="+" /></h3>
            <p>ITI Trades</p>
          </div>
          <div className="stat-card">
            <h3><Counter end={20} suffix="+" /></h3>
            <p>Diploma Branches</p>
          </div>
          <div className="stat-card">
            <h3><Counter end={8} suffix="" /></h3>
            <p>Defence Paths</p>
          </div>
        </div>
      </section>

      {/* Categories Grid Section */}
      <section className="pathways-section section-padding" id="pathways-section">
        <div className="container">
          <div className="section-header" id="pathways-anchor">
            <h2>Explore Career Pathways</h2>
            <p>Detailed roadmaps mapped dynamically based on intermediate educational choices, sports, and defence ambitions.</p>
          </div>
          
          <div className="categories-grid">
            {categories.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <Link to={cat.path} key={idx} className="category-card glass-card">
                  <div className="card-glow" style={{ background: `radial-gradient(circle at top right, ${cat.color}20, transparent 60%)` }}></div>
                  <div className="card-top">
                    <div className="card-icon-box" style={{ color: cat.color, backgroundColor: `${cat.color}10` }}>
                      <Icon size={24} />
                    </div>
                    <ChevronRight className="card-arrow" />
                  </div>
                  <h3>{cat.name}</h3>
                  <p>{cat.desc}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Dynamic Career Guidance Tip */}
      <section className="tip-section container section-padding">
        <div className="tip-box glass-card">
          <TrendingUp className="tip-icon" />
          <div className="tip-content">
            <h4>Decisions Made Simple</h4>
            <p>Did you know? Over 40% of Indian students choose their streams based on peer choices rather than aptitude. By exploring lateral entry polytechnic pathways, professional arts courses, and vocational ITIs, you can build custom careers tailored specifically to your natural subject strengths.</p>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
