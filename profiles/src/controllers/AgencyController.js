const Agency = require('../models/Agencies_schema');

// Create a new agency profile
exports.createAgency = async (req, res) => {
    try {
        const agency = new Agency(req.body);
        await agency.save();
        res.status(201).json({ message: "Agency created successfully", data: agency });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all Agencies
exports.getAllAgencies = async (req, res) => {
    try {
        const agencies = await Agency.find();
        res.status(200).json(agencies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single agency by ID
exports.getAgencyById = async (req, res) => {
    try {
        const agency = await Agency.findById(req.params.id);
        if (!agency) {
            return res.status(404).json({ message: "Agency not found" });
        }
        res.status(200).json(agency);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update an agency profile
exports.updateAgency = async (req, res) => {
    try {
        const agency = await Agency.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!agency) {
            return res.status(404).json({ message: "Agency not found" });
        }
        res.status(200).json({ message: "Agency updated successfully", data: agency });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete an agency profile
exports.deleteAgency = async (req, res) => {
    try {
        const agency = await Agency.findByIdAndDelete(req.params.id);
        if (!agency) {
            return res.status(404).json({ message: "Agency not found" });
        }
        res.status(200).json({ message: "Agency deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};  