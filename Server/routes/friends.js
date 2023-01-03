// has passwords
const { getRounds } = require('bcrypt');
const express = require('express');
const router = express.Router();
const PatientController = require('../controllers/Patient');

const { ensureAuth } = require('../middleware/auth');

// protect all route to stop artificial requests
router.use('/', ensureAuth);
router.get('/', PatientController.getPatients);

// required to serve static files
router.use('/edit', express.static('public'));
router.get('/edit/:PatientId', PatientController.getPatientPage);

router.put('/edit', PatientController.editPatient);

router.post('/createPatient', PatientController.createPatient);

router.delete('/deletePatient', PatientController.deletePatient);

module.exports = router;
