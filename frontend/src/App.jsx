import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Caregivers from './pages/Caregivers';
import CaregiverDetails from './pages/CaregiverDetails';
import Agencies from './pages/Agencies';
import Admin from './pages/Admin';
import About from './pages/About';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="caregivers" element={<Caregivers />} />
        <Route path="caregivers/:id" element={<CaregiverDetails />} />
        <Route path="agencies" element={<Agencies />} />
        <Route path="about" element={<About />} />
        <Route path="admin" element={<Admin />} />
      </Route>
    </Routes>
  );
}

export default App;
