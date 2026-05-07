import React, { useState, useEffect } from 'react';
import { agencyService, caregiverService, reviewService } from '../services/api';
import { Building2, MapPin, Mail, Users, Star, ShieldCheck, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const AgencyCard = ({ agency, caregiverCount }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="card group"
  >
    <div className="p-6">
      <div className="flex justify-between items-start mb-6">
        <div className="w-16 h-16 bg-white border border-slate-100 rounded-2xl shadow-sm p-2 flex items-center justify-center overflow-hidden">
          <img 
            src={agency.logoUrl || 'https://images.unsplash.com/photo-1586773860418-d373a558ef39?auto=format&fit=crop&q=80&w=100'} 
            alt={agency.agencyName}
            className="w-full h-full object-contain"
          />
        </div>
        {agency.verified && (
          <div className="flex items-center text-primary-600 bg-primary-50 px-3 py-1 rounded-full text-xs font-bold border border-primary-100">
            <ShieldCheck className="w-3 h-3 mr-1" />
            Verified
          </div>
        )}
      </div>

      <h3 className="text-xl text-slate-900 group-hover:text-primary-600 transition-colors mb-2">{agency.agencyName}</h3>
      <div className="space-y-2 mb-6">
        <div className="flex items-center text-slate-500 text-sm">
          <MapPin className="w-4 h-4 mr-2" />
          {agency.location}
        </div>
        <div className="flex items-center text-slate-500 text-sm">
          <Mail className="w-4 h-4 mr-2" />
          {agency.contactEmail}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-50">
        <div className="text-center">
          <p className="text-xs text-slate-400 uppercase font-semibold mb-1">Caregivers</p>
          <div className="flex items-center justify-center text-slate-900 font-bold">
            <Users className="w-4 h-4 mr-1 text-primary-500" />
            {caregiverCount}
          </div>
        </div>
        <div className="text-center">
          <p className="text-xs text-slate-400 uppercase font-semibold mb-1">Avg Rating</p>
          <div className="flex items-center justify-center text-slate-900 font-bold">
            <Star className="w-4 h-4 mr-1 text-amber-500 fill-current" />
            4.8
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

const Agencies = () => {
  const [agencies, setAgencies] = useState([]);
  const [caregivers, setCaregivers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [agenciesRes, caregiversRes] = await Promise.all([
          agencyService.getAll(),
          caregiverService.getAll()
        ]);
        setAgencies(agenciesRes.data);
        setCaregivers(caregiversRes.data);
      } catch (err) {
        console.error('Error fetching agencies data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getCaregiverCount = (agencyName) => {
    return caregivers.filter(cg => cg.affiliatedAgency === agencyName).length;
  };

  return (
    <div className="py-20 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl text-slate-900 mb-6"
          >
            Registered Nursing Agencies
          </motion.h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Partnering with the top professional care providers to ensure the highest standards of home nursing and assistance.
          </p>
        </header>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 text-primary-600 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {agencies.map((agency, idx) => (
              <motion.div
                key={agency._id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
              >
                <AgencyCard 
                  agency={agency} 
                  caregiverCount={getCaregiverCount(agency.agencyName)} 
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Agencies;
