// userRoutes.js
const express = require('express');
const router = express.Router();
const { authUser, signupDoctor, signupPatient, googleAuth, getDoctorProfile, updateDoctorProfile, getPatientProfile, updatePatientProfile } = require('../controllers/userControllers');

// User routes
router.post('/login', authUser);
router.post('/signup/doctor', signupDoctor);
router.post('/signup/patient', signupPatient);
router.post('/google-auth', googleAuth);
router.get('/doctors/getprofile/:userId', getDoctorProfile);
router.put('/doctors/updateprofile/:userId', updateDoctorProfile);
router.get('/patients/getprofile/:userId', getPatientProfile); // New route for getting patient profile
router.put('/patients/updateprofile/:userId', updatePatientProfile); // New route for updating patient profile

module.exports = router;
