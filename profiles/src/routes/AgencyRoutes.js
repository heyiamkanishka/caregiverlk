const express = require('express');
const router = express.Router();
const AgencyController = require('../controllers/AgencyController');

// Create a new agency
router.post('/', AgencyController.createAgency);

// Get all agencies
router.get('/', AgencyController.getAllAgencies);

// Get a single agency by ID
router.get('/:id', AgencyController.getAgencyById);

// Update an agency by ID
router.put('/:id', AgencyController.updateAgency);

// Delete an agency by ID
router.delete('/:id', AgencyController.deleteAgency);

module.exports = router;