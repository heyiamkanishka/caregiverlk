import React, { useState } from 'react';
import axios from 'axios';
import { 
  Users, Building2, Lock, LogOut, 
  ChevronRight, Save, CheckCircle, AlertCircle, Loader2 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// API instance for the admin panel
const api = axios.create({
  baseURL: '/', // Proxied via Vite
});

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === '12345') {
      onLogin();
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f2f5] p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white rounded-2xl shadow-xl p-10 border border-slate-100"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mx-auto mb-4">
            <Lock className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Admin Login</h1>
          <p className="text-slate-500">CaregiversLk Management System</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Username</label>
            <input 
              type="text" 
              className="input-field" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
            <input 
              type="password" 
              className="input-field" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="•••••"
              required
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm flex items-center bg-red-50 p-3 rounded-lg border border-red-100">
              <AlertCircle className="w-4 h-4 mr-2" />
              {error}
            </div>
          )}

          <button type="submit" className="w-full btn-admin py-3 text-lg">
            Sign In
          </button>
        </form>
      </motion.div>
    </div>
  );
};

const Dashboard = ({ onLogout }) => {
  const [activeForm, setActiveForm] = useState('caregiver'); // 'caregiver' or 'agency'
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: null, message: '' });

  const showAlert = (type, message) => {
    setStatus({ type, message });
    setTimeout(() => setStatus({ type: null, message: '' }), 5000);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    // Type conversion
    if (data.age) data.age = parseInt(data.age);
    if (data.hourlyRate) data.hourlyRate = parseInt(data.hourlyRate);
    if (data.experience) data.experience = parseInt(data.experience);
    if (data.verified) data.verified = data.verified === 'on';

    const endpoint = activeForm === 'caregiver' ? '/api/caregivers' : '/api/agencies';

    try {
      await api.post(endpoint, data);
      showAlert('success', `${activeForm === 'caregiver' ? 'Caregiver' : 'Agency'} created successfully!`);
      e.target.reset();
    } catch (err) {
      showAlert('error', `Failed to create ${activeForm}. Check your backend services.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f2f5]">
      {/* Top Navbar */}
      <nav className="bg-white border-b border-slate-200 px-8 h-16 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center text-white">
            <Users className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold text-slate-800">Admin Control Panel</span>
        </div>
        <button 
          onClick={onLogout}
          className="flex items-center text-slate-500 hover:text-red-600 transition-colors"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Logout
        </button>
      </nav>

      <div className="max-w-7xl mx-auto px-8 py-10">
        <div className="grid grid-cols-12 gap-8">
          
          {/* Left Side: 2 Boxes (Sidebar) */}
          <div className="col-span-12 lg:col-span-3 space-y-4">
            <div 
              onClick={() => setActiveForm('caregiver')}
              className={`sidebar-box ${activeForm === 'caregiver' ? 'sidebar-box-active' : 'sidebar-box-inactive'}`}
            >
              <Users className={`w-10 h-10 ${activeForm === 'caregiver' ? 'text-blue-600' : 'text-slate-400'}`} />
              <div>
                <h3 className="font-bold text-lg">Caregiver</h3>
                <p className="text-sm opacity-80 text-current">Register Profile</p>
              </div>
            </div>

            <div 
              onClick={() => setActiveForm('agency')}
              className={`sidebar-box ${activeForm === 'agency' ? 'sidebar-box-active' : 'sidebar-box-inactive'}`}
            >
              <Building2 className={`w-10 h-10 ${activeForm === 'agency' ? 'text-blue-600' : 'text-slate-400'}`} />
              <div>
                <h3 className="font-bold text-lg">Agency</h3>
                <p className="text-sm opacity-80 text-current">Register Entity</p>
              </div>
            </div>
          </div>

          {/* Right Side: Forms */}
          <div className="col-span-12 lg:col-span-9">
            <AnimatePresence mode="wait">
              {status.message && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`mb-6 p-4 rounded-xl flex items-center ${
                    status.type === 'success' ? 'bg-green-50 text-green-800 border border-green-100' : 'bg-red-50 text-red-800 border border-red-100'
                  }`}
                >
                  {status.type === 'success' ? <CheckCircle className="w-5 h-5 mr-3" /> : <AlertCircle className="w-5 h-5 mr-3" />}
                  {status.message}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              key={activeForm}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="admin-card"
            >
              <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-100">
                <div className="bg-slate-100 p-2 rounded-lg">
                  {activeForm === 'caregiver' ? <Users className="text-slate-700" /> : <Building2 className="text-slate-700" />}
                </div>
                <h2 className="text-2xl font-bold text-slate-800">
                  {activeForm === 'caregiver' ? 'New Caregiver Registration' : 'New Agency Registration'}
                </h2>
              </div>

              <form onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {activeForm === 'caregiver' ? (
                  <>
                    <div className="space-y-1">
                      <label className="text-sm font-semibold text-slate-600">Full Name</label>
                      <input name="name" required className="input-field" placeholder="John Doe" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-semibold text-slate-600">Gender</label>
                      <select name="gender" required className="input-field">
                        <option>Female</option>
                        <option>Male</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-semibold text-slate-600">Age</label>
                      <input name="age" type="number" required className="input-field" placeholder="32" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-semibold text-slate-600">Specialty</label>
                      <input name="specialty" required className="input-field" placeholder="Elderly Care" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-semibold text-slate-600">Experience (Years)</label>
                      <input name="experience" type="number" required className="input-field" placeholder="5" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-semibold text-slate-600">Hourly Rate ($)</label>
                      <input name="hourlyRate" type="number" required className="input-field" placeholder="25" />
                    </div>
                    <div className="md:col-span-2 space-y-1">
                      <label className="text-sm font-semibold text-slate-600">Image URL</label>
                      <input name="imageUrl" required className="input-field" placeholder="https://..." />
                    </div>
                    <div className="md:col-span-2 space-y-1">
                      <label className="text-sm font-semibold text-slate-600">Bio</label>
                      <textarea name="bio" required rows="3" className="input-field" placeholder="Brief background..."></textarea>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-1">
                      <label className="text-sm font-semibold text-slate-600">Agency Name</label>
                      <input name="agencyName" required className="input-field" placeholder="HealthCare Plus" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-semibold text-slate-600">Location</label>
                      <input name="location" required className="input-field" placeholder="Colombo, SL" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-semibold text-slate-600">Contact Email</label>
                      <input name="contactEmail" type="email" required className="input-field" placeholder="info@agency.com" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-semibold text-slate-600">Logo URL</label>
                      <input name="logoUrl" required className="input-field" placeholder="https://..." />
                    </div>
                    <div className="flex items-center md:col-span-2 py-4">
                      <input name="verified" type="checkbox" id="v-check" className="w-5 h-5 rounded text-blue-600" />
                      <label htmlFor="v-check" className="ml-3 font-semibold text-slate-700">Verified Partner Agency</label>
                    </div>
                  </>
                )}

                <div className="md:col-span-2 pt-6 border-t border-slate-100 flex justify-end">
                  <button 
                    disabled={loading}
                    type="submit" 
                    className="btn-admin flex items-center justify-center min-w-[200px]"
                  >
                    {loading ? (
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    ) : (
                      <Save className="w-5 h-5 mr-2" />
                    )}
                    {activeForm === 'caregiver' ? 'Create Caregiver Profile' : 'Register Agency'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('admin_auth') === 'true');

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('admin_auth', 'true');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('admin_auth');
  };

  return (
    <div>
      {isLoggedIn ? (
        <Dashboard onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
