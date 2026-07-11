import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// Pages
import Home from './pages/Home';
import Streams from './pages/Streams';
import EngineeringDiplomas from './pages/EngineeringDiplomas';
import NonEngineeringDiplomas from './pages/NonEngineeringDiplomas';
import ItiTrades from './pages/ItiTrades';
import ArtsHumanities from './pages/ArtsHumanities';
import SportsPathways from './pages/SportsPathways';
import DefenceSchemes from './pages/DefenceSchemes';
import Exams from './pages/Exams';
import Timeline from './pages/Timeline';
import About from './pages/About';

import './App.css';

export default function App() {
  const location = useLocation();

  return (
    <div className="app-wrapper">
      <ScrollToTop />
      <Navbar />
      
      <main className="main-content">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/streams" element={<Streams />} />
            <Route path="/engineering-diplomas" element={<EngineeringDiplomas />} />
            <Route path="/non-engineering-diplomas" element={<NonEngineeringDiplomas />} />
            <Route path="/iti-trades" element={<ItiTrades />} />
            <Route path="/arts-humanities" element={<ArtsHumanities />} />
            <Route path="/sports-pathways" element={<SportsPathways />} />
            <Route path="/defence-schemes" element={<DefenceSchemes />} />
            <Route path="/exams" element={<Exams />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
