import React, { useState, useEffect } from 'react';
import { caregiverService, agencyService, reviewService } from '../services/api';
import { 
  Users, Building2, MessageSquare, Plus, Save, 
  Trash2, CheckCircle, AlertCircle, Loader2 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('caregivers');
  const [status, setStatus] = useState({ type: null, message: '' });
  const [loading, setLoading] = useState(false);
  const [agencies, setAgencies] = useState([]);
  const [caregivers, setCaregivers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [aRes, cRes] = await Promise.all([
          agencyService.getAll(),
          caregiverService.getAll()
        ]);
        setAgencies(aRes.data);
        setCaregivers(cRes.data);
      } catch (err) {
        console.error('Error fetching admin data:', err);
      }
    };
    fetchData();
  }, []);

  const showAlert = (type, message) => {
    setStatus({ type, message });
    setTimeout(() => setStatus({ type: null, message: '' }), 5000);
  };

  const handleCreateCaregiver = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    data.age = parseInt(data.age);
    data.hourlyRate = parseInt(data.hourlyRate);
    data.experience = parseInt(data.experience);

    try {
      await caregiverService.create(data);
      showAlert('success', 'Caregiver profile created successfully!');
      e.target.reset();
    } catch (err) {
      showAlert('error', 'Failed to create caregiver. Please check the backend.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAgency = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    data.verified = formData.get('verified') === 'on';

    try {
      await agencyService.create(data);
      showAlert('success', 'Agency registered successfully!');
      e.target.reset();
    } catch (err) {
      showAlert('error', 'Failed to register agency.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateReview = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    data.rating = parseInt(data.rating);
    data.created_at = new Date().toISOString();

    try {
      await reviewService.create(data);
      showAlert('success', 'Review posted successfully!');
      e.target.reset();
    } catch (err) {
      showAlert('error', 'Failed to post review.');
    } finally {
      setLoading(false);
    }
  };

  const TabButton = ({ id, label, icon: Icon }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center px-6 py-4 border-b-2 font-medium transition-all ${
        activeTab === id
          ? 'border-primary-600 text-primary-600 bg-primary-50/50'
          : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'
      }`}
    >
      <Icon className="w-5 h-5 mr-3" />
      {label}
    </button>
  );

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        <header className="mb-10">
          <h1 className="text-3xl font-display font-bold text-slate-900">Admin Management Console</h1>
          <p className="text-slate-500">Add and manage caregivers, agencies, and reviews.</p>
        </header>

        <AnimatePresence>
          {status.message && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`mb-8 p-4 rounded-2xl flex items-center ${
                status.type === 'success' ? 'bg-green-50 text-green-800 border border-green-100' : 'bg-red-50 text-red-800 border border-red-100'
              }`}
            >
              {status.type === 'success' ? <CheckCircle className="w-5 h-5 mr-3" /> : <AlertCircle className="w-5 h-5 mr-3" />}
              {status.message}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="flex border-b border-slate-100 overflow-x-auto">
            <TabButton id="caregivers" label="New Caregiver" icon={Users} />
            <TabButton id="agencies" label="New Agency" icon={Building2} />
            <TabButton id="reviews" label="Add Review" icon={MessageSquare} />
          </div>

          <div className="p-8">
            {activeTab === 'caregivers' && (
              <form onSubmit={handleCreateCaregiver} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                    <input name="name" required className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-primary-500" placeholder="e.g. Jane Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Gender</label>
                    <select name="gender" required className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-primary-500">
                      <option>Female</option>
                      <option>Male</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Age</label>
                    <input name="age" type="number" required className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-primary-500" placeholder="30" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Specialty</label>
                    <input name="specialty" required className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-primary-500" placeholder="e.g. Elderly Care" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Experience (Years)</label>
                    <input name="experience" type="number" required className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-primary-500" placeholder="5" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Hourly Rate ($)</label>
                    <input name="hourlyRate" type="number" required className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-primary-500" placeholder="25" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Image URL</label>
                    <input name="imageUrl" required className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-primary-500" placeholder="https://images.unsplash.com/..." />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Affiliated Agency</label>
                    <select name="affiliatedAgency" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-primary-500">
                      <option value="">None (Independent)</option>
                      {agencies.map(a => <option key={a._id} value={a.agencyName}>{a.agencyName}</option>)}
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Bio / Description</label>
                    <textarea name="bio" required rows="4" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-primary-500" placeholder="Tell us about the caregiver's background and skills..."></textarea>
                  </div>
                </div>
                <button disabled={loading} type="submit" className="w-full btn-primary flex items-center justify-center">
                  {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <Save className="w-5 h-5 mr-2" />}
                  Register Caregiver
                </button>
              </form>
            )}

            {activeTab === 'agencies' && (
              <form onSubmit={handleCreateAgency} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Agency Name</label>
                    <input name="agencyName" required className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-primary-500" placeholder="e.g. HealthCare Plus" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Location</label>
                    <input name="location" required className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-primary-500" placeholder="e.g. New York, NY" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Contact Email</label>
                    <input name="contactEmail" type="email" required className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-primary-500" placeholder="contact@agency.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Logo URL</label>
                    <input name="logoUrl" required className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-primary-500" placeholder="https://..." />
                  </div>
                  <div className="flex items-center md:col-span-2">
                    <input name="verified" type="checkbox" id="verified" className="w-5 h-5 rounded text-primary-600 focus:ring-primary-500" />
                    <label htmlFor="verified" className="ml-3 text-sm font-semibold text-slate-700">Verified Agency</label>
                  </div>
                </div>
                <button disabled={loading} type="submit" className="w-full btn-primary flex items-center justify-center">
                  {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <Save className="w-5 h-5 mr-2" />}
                  Register Agency
                </button>
              </form>
            )}

            {activeTab === 'reviews' && (
              <form onSubmit={handleCreateReview} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Target ID (Caregiver/Agency)</label>
                    <select name="target_id" required className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-primary-500">
                      <option value="">Select Target...</option>
                      <optgroup label="Caregivers">
                        {caregivers.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                      </optgroup>
                      <optgroup label="Agencies">
                        {agencies.map(a => <option key={a._id} value={a._id}>{a.agencyName}</option>)}
                      </optgroup>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">User Name</label>
                    <input name="user_name" required className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-primary-500" placeholder="Your Name" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Rating (1-5)</label>
                    <select name="rating" required className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-primary-500">
                      {[5, 4, 3, 2, 1].map(n => <option key={n} value={n}>{n} Stars</option>)}
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Comment</label>
                    <textarea name="comment" required rows="4" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-primary-500" placeholder="Write your review here..."></textarea>
                  </div>
                </div>
                <button disabled={loading} type="submit" className="w-full btn-primary flex items-center justify-center">
                  {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <Save className="w-5 h-5 mr-2" />}
                  Post Review
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
