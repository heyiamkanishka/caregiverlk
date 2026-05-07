const Caregiver = require('../models/Caregiver_schema');

// Create a new caregiver profile
exports.createCaregiver = async (req, res) => {
    try {
        const caregiver = new Caregiver(req.body);
        await caregiver.save();
        res.status(201).json({ message: "Caregiver created successfully", data: caregiver });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all Caregivers
exports.getAllCaregivers = async (req, res) => {
    try {
        const caregivers = await Caregiver.find();
        res.status(200).json(caregivers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single caregiver by ID
exports.getCaregiverById = async (req, res) => {
    try {
        const caregiver = await Caregiver.findById(req.params.id);
        if (!caregiver) {
            return res.status(404).json({ message: "Caregiver not found" });
        }
        res.status(200).json(caregiver);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a caregiver profile
exports.updateCaregiver = async (req, res) => {
    try {
        const caregiver = await Caregiver.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!caregiver) {
            return res.status(404).json({ message: "Caregiver not found" });
        }
        res.status(200).json({ message: "Caregiver updated successfully", data: caregiver });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a caregiver profile
exports.deleteCaregiver = async (req, res) => {
    try {
        const caregiver = await Caregiver.findByIdAndDelete(req.params.id);
        if (!caregiver) {
            return res.status(404).json({ message: "Caregiver not found" });
        }
        res.status(200).json({ message: "Caregiver deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};  