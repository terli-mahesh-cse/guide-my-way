import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowUpDown, ChevronDown, Calendar, Monitor, ShieldAlert } from 'lucide-react';
import { API_URL } from '../config';
import './Exams.css';

export default function Exams() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  // Filters
  const [filterConductedBy, setFilterConductedBy] = useState('ALL');
  const [filterMonth, setFilterMonth] = useState('ALL');
  const [filterMode, setFilterMode] = useState('ALL');
  
  // Sort State
  const [sortField, setSortField] = useState('examName'); // 'examName', 'conductedBy', 'month', 'mode'
  const [sortAsc, setSortAsc] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/exams`)
      .then(res => res.json())
      .then(data => {
        setExams(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching exams:', err);
        setLoading(false);
      });
  }, []);

  // Extract unique filters from loaded data
  const conductedByList = ['ALL', ...new Set(exams.map(e => {
    if (e.conductedBy.includes('National Testing Agency')) return 'NTA';
    if (e.conductedBy.includes('UPSC')) return 'UPSC';
    if (e.conductedBy.includes('IIT')) return 'IIT';
    return 'Other';
  }))];
  
  const monthsList = ['ALL', 'January', 'February', 'April', 'May', 'June', 'August', 'September', 'December'];
  const modesList = ['ALL', 'CBT', 'Offline', 'Hybrid'];

  // Sorting handler
  const handleSort = (field) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  // Filtering Logic
  const filteredExams = exams.filter(e => {
    // Search filter
    const matchesSearch = e.examName.toLowerCase().includes(search.toLowerCase()) ||
                          e.conductedBy.toLowerCase().includes(search.toLowerCase()) ||
                          e.forWhom.toLowerCase().includes(search.toLowerCase());
    
    // Conducted By filter
    let matchesConducted = true;
    if (filterConductedBy === 'NTA') matchesConducted = e.conductedBy.includes('NTA') || e.conductedBy.includes('National Testing Agency');
    else if (filterConductedBy === 'UPSC') matchesConducted = e.conductedBy.includes('UPSC') || e.conductedBy.includes('Union Public Service Commission');
    else if (filterConductedBy === 'IIT') matchesConducted = e.conductedBy.includes('IIT') || e.conductedBy.includes('zonal IITs');
    else if (filterConductedBy === 'Other') matchesConducted = !e.conductedBy.includes('NTA') && !e.conductedBy.includes('National Testing Agency') && !e.conductedBy.includes('UPSC') && !e.conductedBy.includes('IIT');

    // Month filter
    const matchesMonth = filterMonth === 'ALL' || e.month.toLowerCase().includes(filterMonth.toLowerCase());

    // Mode filter
    let matchesMode = true;
    if (filterMode === 'CBT') matchesMode = e.mode.includes('CBT') || e.mode.includes('Computer Based');
    else if (filterMode === 'Offline') matchesMode = e.mode.includes('Pen & Paper') || e.mode.includes('Offline') || e.mode.includes('Paper');
    else if (filterMode === 'Hybrid') matchesMode = e.mode.includes('Hybrid') || e.mode.includes('Online Proctored');

    return matchesSearch && matchesConducted && matchesMonth && matchesMode;
  });

  // Sorting Logic
  const sortedExams = [...filteredExams].sort((a, b) => {
    let valA = a[sortField].toLowerCase();
    let valB = b[sortField].toLowerCase();
    if (sortAsc) {
      return valA.localeCompare(valB);
    } else {
      return valB.localeCompare(valA);
    }
  });

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="exams-page container section-padding"
      style={{ marginTop: '80px' }}
    >
      <div className="section-header">
        <h2>Master Entrance Exams List</h2>
        <p>Your directory of 20 major career-defining examinations in India. Filter by date, exam mode, or conducted authority, and sort as you wish.</p>
      </div>

      {/* Filter Toolbar */}
      <div className="exams-toolbar glass-card">
        <div className="search-box-wrapper">
          <Search className="search-icon" size={16} />
          <input 
            type="text" 
            placeholder="Search exams, scopes..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field toolbar-search"
          />
        </div>

        <div className="filters-grid">
          {/* Conducted By Filter */}
          <div className="filter-select-wrapper">
            <label>Authority</label>
            <select value={filterConductedBy} onChange={(e) => setFilterConductedBy(e.target.value)}>
              <option value="ALL">All Authorities</option>
              <option value="NTA">NTA</option>
              <option value="UPSC">UPSC</option>
              <option value="IIT">IITs</option>
              <option value="Other">Other Boards</option>
            </select>
          </div>

          {/* Month Filter */}
          <div className="filter-select-wrapper">
            <label>Month</label>
            <select value={filterMonth} onChange={(e) => setFilterMonth(e.target.value)}>
              <option value="ALL">All Months</option>
              {monthsList.slice(1).map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          {/* Mode Filter */}
          <div className="filter-select-wrapper">
            <label>Exam Mode</label>
            <select value={filterMode} onChange={(e) => setFilterMode(e.target.value)}>
              <option value="ALL">All Modes</option>
              <option value="CBT">Computer Based (CBT)</option>
              <option value="Offline">Offline / Pen-Paper</option>
              <option value="Hybrid">Hybrid / Online Proctor</option>
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="shimmer-table shimmer" style={{ height: '400px', borderRadius: '12px' }}></div>
      ) : (
        <div className="table-responsive">
          <div className="custom-table">
            {/* Table Header */}
            <div className="custom-table-header">
              <div className="table-col col-name" onClick={() => handleSort('examName')}>
                <span>Exam Name</span> <ArrowUpDown size={14} />
              </div>
              <div className="table-col col-auth" onClick={() => handleSort('conductedBy')}>
                <span>Conducted By</span> <ArrowUpDown size={14} />
              </div>
              <div className="table-col col-scope">
                <span>Target / Scope</span>
              </div>
              <div className="table-col col-month" onClick={() => handleSort('month')}>
                <span>Month</span> <ArrowUpDown size={14} />
              </div>
              <div className="table-col col-mode" onClick={() => handleSort('mode')}>
                <span>Mode</span> <ArrowUpDown size={14} />
              </div>
            </div>

            {/* Table Body (Framer Motion List) */}
            <div className="custom-table-body">
              <AnimatePresence>
                {sortedExams.length === 0 ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="table-no-results"
                  >
                    <ShieldAlert size={24} />
                    <p>No exams found matching your selected filters.</p>
                  </motion.div>
                ) : (
                  sortedExams.map((exam) => (
                    <motion.div
                      key={exam.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                      className="custom-table-row"
                    >
                      <div className="table-col col-name font-bold text-white">
                        {exam.examName}
                      </div>
                      <div className="table-col col-auth text-secondary text-sm">
                        {exam.conductedBy}
                      </div>
                      <div className="table-col col-scope text-secondary text-sm">
                        {exam.forWhom}
                      </div>
                      <div className="table-col col-month text-gold font-medium">
                        <Calendar size={12} style={{ marginRight: '0.35rem', display: 'inline' }} />
                        {exam.month}
                      </div>
                      <div className="table-col col-mode text-blue text-sm">
                        <Monitor size={12} style={{ marginRight: '0.35rem', display: 'inline' }} />
                        {exam.mode.split(' (')[0]}
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
