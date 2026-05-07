import React, { useState, useEffect } from 'react';
import { caregiverService } from '../services/api';
import { CaregiverCard } from './Home';
import { Search, Filter, Loader2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Caregivers = () => {
  const [caregivers, setCaregivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState('All');

  useEffect(() => {
    const fetchCaregivers = async () => {
      try {
        setLoading(true);
        const response = await caregiverService.getAll();
        setCaregivers(response.data);
      } catch (err) {
        console.error('Error fetching caregivers:', err);
        setError('Failed to load caregivers. Please try again later.');
        // Fallback for demo if backend is not running
        setCaregivers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCaregivers();
  }, []);

  const specialties = ['All', ...new Set(caregivers.map(c => c.specialty))];

  const filteredCaregivers = caregivers.filter(cg => {
    const matchesSearch = cg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cg.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = specialtyFilter === 'All' || cg.specialty === specialtyFilter;
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-12">
          <h1 className="text-4xl text-slate-900 mb-4">Find Your Perfect Caregiver</h1>
          <p className="text-lg text-slate-600 max-w-2xl">
            Browse our community of verified care professionals. filter by specialty, rating, and location.
          </p>
        </header>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name or specialty..."
              className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center px-4 py-3 bg-white border border-slate-200 rounded-2xl">
              <Filter className="w-5 h-5 text-slate-400 mr-2" />
              <select
                className="bg-transparent border-none outline-none text-slate-700 font-medium cursor-pointer"
                value={specialtyFilter}
                onChange={(e) => setSpecialtyFilter(e.target.value)}
              >
                {specialties.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <Loader2 className="w-12 h-12 text-primary-600 animate-spin mb-4" />
            <p className="text-slate-500 font-medium">Loading caregivers...</p>
          </div>
        ) : error && caregivers.length === 0 ? (
          <div className="bg-red-50 border border-red-100 rounded-2xl p-8 flex flex-col items-center text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
            <h3 className="text-lg font-bold text-red-900 mb-2">Connection Error</h3>
            <p className="text-red-700">{error}</p>
          </div>
        ) : filteredCaregivers.length === 0 ? (
          <div className="text-center py-32 bg-white rounded-3xl border border-slate-100">
            <Users className="w-16 h-16 text-slate-200 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-2">No caregivers found</h3>
            <p className="text-slate-500">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredCaregivers.map((cg, idx) => (
              <motion.div
                key={cg._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <CaregiverCard caregiver={cg} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Caregivers;
