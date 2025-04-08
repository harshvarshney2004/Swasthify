const express = require('express');
const router = express.Router();
const {
  getAllDoctors,
  bookAppointment,
  getPendingAppointments,
  updateAppointmentStatus,
  getAcceptedAppointmentsForDoctor,
  getAcceptedAppointmentsForPatient,
  savePrescriptions,
  updateAppointment
} = require('../controllers/appointmentController');

// Appointment routes
router.get('/doctors', getAllDoctors);
router.post('/', bookAppointment);
router.get('/pending/:doctorId', getPendingAppointments);
router.patch('/:appointmentId', updateAppointmentStatus);
router.patch('/update/:appointmentId', updateAppointment);
router.get('/accepted/doctor/:doctorId', getAcceptedAppointmentsForDoctor);
router.get('/accepted/patient/:patientId', getAcceptedAppointmentsForPatient);
router.post('/prescriptions/:appointmentId', savePrescriptions);

module.exports = router;