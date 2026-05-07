const mongoose = require('mongoose');

const AgencySchema = new mongoose.Schema({
    agencyName: { type: String, required: true },
    location: { type: String, required: true },
    logoUrl: { type: String },
    contactEmail: { type: String, required: true },
    verified: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Agency', AgencySchema);