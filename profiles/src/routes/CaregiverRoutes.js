const express = require('express');
const router = express.Router();
const CaregiverController = require('../controllers/CaregiverController');

// Create a new caregiver
router.post('/', CaregiverController.createCaregiver);

// Get all caregivers
router.get('/', CaregiverController.getAllCaregivers);

// Get a single caregiver by ID
router.get('/:id', CaregiverController.getCaregiverById);

// Update a caregiver by ID
router.put('/:id', CaregiverController.updateCaregiver);

// Delete a caregiver by ID
router.delete('/:id', CaregiverController.deleteCaregiver);

module.exports = router;