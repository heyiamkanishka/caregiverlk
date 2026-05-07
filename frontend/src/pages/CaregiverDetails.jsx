import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { caregiverService, reviewService } from '../services/api';
import { 
  Star, Clock, DollarSign, Award, ShieldCheck, 
  ChevronLeft, MessageSquare, User, Calendar, Briefcase 
} from 'lucide-react';
import { motion } from 'framer-motion';

const ReviewCard = ({ review }) => (
  <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
    <div className="flex justify-between items-start mb-4">
      <div className="flex items-center">
        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-bold mr-3">
          {review.user_name?.[0]?.toUpperCase() || 'U'}
        </div>
        <div>
          <h4 className="font-semibold text-slate-900">{review.user_name}</h4>
          <p className="text-xs text-slate-500">
            {review.created_at ? new Date(review.created_at).toLocaleDateString() : 'Recently'}
          </p>
        </div>
      </div>
      <div className="flex text-amber-500">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'text-slate-300'}`} />
        ))}
      </div>
    </div>
    <p className="text-slate-600 leading-relaxed italic">"{review.comment}"</p>
  </div>
);

const CaregiverDetails = () => {
  const { id } = useParams();
  const [caregiver, setCaregiver] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [cgRes, revRes] = await Promise.all([
          caregiverService.getById(id),
          reviewService.getByTarget(id)
        ]);
        setCaregiver(cgRes.data);
        setReviews(revRes.data);
      } catch (err) {
        console.error('Error fetching caregiver details:', err);
        setError('Could not load profile details.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
    </div>
  );

  if (error || !caregiver) return (
    <div className="max-w-2xl mx-auto py-20 text-center">
      <h2 className="text-2xl font-bold text-slate-900 mb-4">Oops! Profile not found</h2>
      <Link to="/caregivers" className="btn-primary inline-flex items-center">
        <ChevronLeft className="mr-2" /> Back to Caregivers
      </Link>
    </div>
  );

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Link to="/caregivers" className="inline-flex items-center text-slate-500 hover:text-primary-600 mb-8 transition-colors">
          <ChevronLeft className="w-5 h-5 mr-1" /> Back to listings
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Sidebar Info */}
          <div className="lg:col-span-1 space-y-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 text-center"
            >
              <div className="relative w-48 h-48 mx-auto mb-6">
                <img 
                  src={caregiver.imageUrl || 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=400'} 
                  alt={caregiver.name}
                  className="w-full h-full object-cover rounded-2xl"
                />
                <div className="absolute -bottom-2 -right-2 bg-green-500 p-2 rounded-full border-4 border-white">
                  <ShieldCheck className="w-6 h-6 text-white" />
                </div>
              </div>
              <h1 className="text-3xl mb-1">{caregiver.name}</h1>
              <p className="text-primary-600 font-semibold mb-4">{caregiver.specialty}</p>
              
              <div className="flex justify-center items-center space-x-4 mb-6">
                <div className="text-center">
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Hourly Rate</p>
                  <p className="text-xl font-bold text-slate-900">${caregiver.hourlyRate}</p>
                </div>
                <div className="w-px h-10 bg-slate-100" />
                <div className="text-center">
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Experience</p>
                  <p className="text-xl font-bold text-slate-900">{caregiver.experience} Years</p>
                </div>
              </div>

              <button className="w-full btn-primary mb-3">Book Now</button>
              <button className="w-full btn-secondary">Send Message</button>
            </motion.div>

            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold mb-4">Affiliated Agency</h3>
              <div className="flex items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mr-4">
                  <Briefcase className="w-6 h-6 text-slate-400" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{caregiver.affiliatedAgency || 'Independent'}</h4>
                  <p className="text-xs text-slate-500">Verified Partner</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100"
            >
              <h2 className="text-2xl mb-6 flex items-center">
                <User className="w-6 h-6 mr-3 text-primary-600" />
                About {caregiver.name}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-8 text-lg">
                {caregiver.bio}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                <div className="p-4 bg-primary-50/50 rounded-2xl">
                  <Calendar className="w-5 h-5 text-primary-600 mb-2" />
                  <p className="text-xs text-slate-500 mb-1">Age</p>
                  <p className="font-bold text-slate-900">{caregiver.age} years</p>
                </div>
                <div className="p-4 bg-primary-50/50 rounded-2xl">
                  <User className="w-5 h-5 text-primary-600 mb-2" />
                  <p className="text-xs text-slate-500 mb-1">Gender</p>
                  <p className="font-bold text-slate-900">{caregiver.gender}</p>
                </div>
                <div className="p-4 bg-primary-50/50 rounded-2xl">
                  <Clock className="w-5 h-5 text-primary-600 mb-2" />
                  <p className="text-xs text-slate-500 mb-1">Availability</p>
                  <p className="font-bold text-slate-900">Flexible</p>
                </div>
              </div>
            </motion.div>

            {/* Reviews Section */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl flex items-center">
                  <Star className="w-6 h-6 mr-3 text-amber-500 fill-current" />
                  Patient Reviews ({reviews.length})
                </h2>
                <div className="flex items-center bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
                  <Star className="w-5 h-5 text-amber-500 fill-current mr-2" />
                  <span className="text-xl font-bold text-slate-900">4.9</span>
                  <span className="text-slate-400 text-sm ml-1">/ 5.0</span>
                </div>
              </div>

              {reviews.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {reviews.map((rev) => (
                    <ReviewCard key={rev._id} review={rev} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                  <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-500">No reviews yet for this caregiver.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaregiverDetails;
