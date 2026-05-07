const mongoose = require('mongoose');

const CaregiverSchema = new mongoose.Schema({
    name: { type: String, required: true},
    gender: { type: String, required: true},
    age : { type: Number, required: true},
    specialty: { type: String, required: true },
    experience: { type: Number, required: true},
    imageUrl: { type: String }, // For the images you mentioned
    bio: String,
    availability: { type: Boolean, default: true}
},{ timestamps: true}
);
module.exports = mongoose.model('Caregiver', CaregiverSchema);