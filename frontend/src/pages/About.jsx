import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Shield, Users, Award, Mail, Phone, MapPin } from 'lucide-react';

const About = () => {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative py-24 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 -left-20 w-96 h-96 bg-primary-500 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 -right-20 w-96 h-96 bg-blue-500 rounded-full blur-[120px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl text-white mb-6"
          >
            Our Mission is <span className="text-primary-400">Compassion</span>
          </motion.h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            CaregiversLk was founded with a simple goal: to make finding high-quality, professional care for loved ones accessible, transparent, and trustworthy.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl text-slate-900 mb-4">Why Families Trust Us</h2>
            <div className="w-20 h-1 bg-primary-600 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100">
              <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-primary-600 mb-6">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">Safety First</h3>
              <p className="text-slate-600 leading-relaxed">
                We implement a rigorous 5-step verification process for every caregiver and agency on our platform.
              </p>
            </div>
            <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100">
              <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-primary-600 mb-6">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">Expert Match</h3>
              <p className="text-slate-600 leading-relaxed">
                Our smart matching system helps you find specialists tailored to specific medical and personal needs.
              </p>
            </div>
            <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100">
              <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-primary-600 mb-6">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">Quality Care</h3>
              <p className="text-slate-600 leading-relaxed">
                We continuously monitor performance through community feedback to maintain the highest standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl text-slate-900 mb-6">Get in Touch</h2>
              <p className="text-lg text-slate-600 mb-10">
                Have questions about our services or need help finding a caregiver? Our team is here to support you 24/7.
              </p>
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary-600 mr-4">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Email us at</p>
                    <p className="font-bold text-slate-900">support@caregiverslk.com</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary-600 mr-4">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Call us</p>
                    <p className="font-bold text-slate-900">+94 11 234 5678</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary-600 mr-4">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Our HQ</p>
                    <p className="font-bold text-slate-900">Colombo, Sri Lanka</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-10 rounded-[40px] shadow-2xl shadow-primary-900/5 border border-slate-100">
              <form className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <input className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-primary-500" placeholder="First Name" />
                  <input className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-primary-500" placeholder="Last Name" />
                </div>
                <input className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-primary-500" placeholder="Email Address" />
                <textarea rows="4" className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-primary-500" placeholder="How can we help?"></textarea>
                <button type="button" className="w-full btn-primary">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
