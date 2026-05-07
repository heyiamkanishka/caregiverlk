require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// --- CRITICAL: IMPORT THE ROUTE FILES ---
const agencyRoutes = require('./routes/AgencyRoutes');
const caregiverRoutes = require('./routes/CaregiverRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
    res.send("Profiles Service is ALIVE");
});

// Routes
app.use('/api/agencies', agencyRoutes);
app.use('/api/caregivers', caregiverRoutes);

// Database Connection
const dbURI = process.env.MONGO_URI;
mongoose.connect(dbURI)
    .then(() => console.log('✅ Connected to MongoDB Atlas'))
    .catch((err) => {
        console.error('❌ MongoDB connection error:', err.message);
        process.exit(1); 
    });

const PORT = process.env.PORT || 5001; // Using 5001 to avoid AirPlay conflict
app.listen(PORT, () => {
    console.log(`🚀 Profiles service running on port ${PORT}`);
});