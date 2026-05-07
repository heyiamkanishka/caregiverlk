import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShieldCheck, Clock, Award } from 'lucide-react';
import { motion } from 'framer-motion';

export const CaregiverCard = ({ caregiver }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="card group"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <img 
          src={caregiver.imageUrl || 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=400'} 
          alt={caregiver.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-primary-700 text-xs font-bold rounded-full shadow-sm border border-primary-100">
            {caregiver.specialty}
          </span>
        </div>
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-lg text-slate-900 group-hover:text-primary-600 transition-colors">{caregiver.name}</h3>
            <p className="text-sm text-slate-500">{caregiver.gender}, {caregiver.age} years old</p>
          </div>
          <div className="flex items-center text-amber-500">
            <Star className="w-4 h-4 fill-current" />
            <span className="ml-1 text-sm font-semibold text-slate-700">4.9</span>
          </div>
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-bold text-slate-900">
            ${caregiver.hourlyRate}<span className="text-sm font-normal text-slate-500">/hr</span>
          </span>
          <Link 
            to={`/caregivers/${caregiver._id}`}
            className="text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors"
          >
            View Profile →
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

const Feature = ({ icon: Icon, title, description }) => (
  <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl border border-slate-100">
    <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center text-primary-600 mb-4">
      <Icon className="w-6 h-6" />
    </div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
  </div>
);

const Home = () => {
  // Mock data for featured caregivers
  const featuredCaregivers = [
    { _id: '1', name: 'Sarah Johnson', gender: 'Female', age: 34, specialty: 'Elderly Care', imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400', hourlyRate: 25 },
    { _id: '2', name: 'Michael Chen', gender: 'Male', age: 29, specialty: 'Physiotherapy', imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400', hourlyRate: 35 },
    { _id: '3', name: 'Elena Rodriguez', gender: 'Female', age: 42, specialty: 'Special Needs', imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400', hourlyRate: 30 },
  ];

  return (
    <div className="pb-20">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-50/50 to-transparent -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-bold mb-6">
                Verified Professionals
              </span>
              <h1 className="text-5xl lg:text-7xl font-display font-bold text-slate-900 leading-tight mb-6">
                Exceptional Care for Your <span className="text-primary-600">Loved Ones</span>
              </h1>
              <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-lg">
                Find the perfect caregiver or nursing agency with our verified and trusted community of care professionals.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/caregivers" className="btn-primary flex items-center justify-center">
                  Find a Caregiver
                </Link>
                <Link to="/agencies" className="btn-secondary flex items-center justify-center">
                  Browse Agencies
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1581578731522-aa029f6f6874?auto=format&fit=crop&q=80&w=800" 
                  alt="Caregiver with elderly person"
                  className="w-full h-auto"
                />
              </div>
              {/* Floating badges */}
              <div className="absolute -bottom-6 -left-6 glass p-6 rounded-2xl shadow-xl max-w-xs hidden sm:block">
                <div className="flex items-center space-x-4">
                  <div className="bg-primary-100 p-3 rounded-xl text-primary-600">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">100% Verified</h4>
                    <p className="text-sm text-slate-500">Strict background checks</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Feature 
              icon={ShieldCheck}
              title="Vetted Professionals"
              description="Every caregiver on our platform undergoes a multi-stage background and identity verification process."
            />
            <Feature 
              icon={Clock}
              title="Flexible Scheduling"
              description="Whether you need help for a few hours a week or 24/7 live-in care, find someone who fits your needs."
            />
            <Feature 
              icon={Award}
              title="Quality Guaranteed"
              description="Read transparent reviews from other families to ensure you're getting the best possible care."
            />
          </div>
        </div>
      </section>

      {/* Featured Caregivers */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl text-slate-900 mb-2">Featured Caregivers</h2>
              <p className="text-slate-500">Meet some of our top-rated professionals</p>
            </div>
            <Link to="/caregivers" className="text-primary-600 font-bold hover:underline">
              View All Caregivers
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCaregivers.map((cg) => (
              <CaregiverCard key={cg._id} caregiver={cg} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
