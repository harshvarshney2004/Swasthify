const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
  patient_Userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true,
  },
  doctor_Userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true,
  },
  appointmentDate: {
    type: Date,
    required: true,
  },
  appointmentTime: { 
    type: String,
    required: false,
  },
  status: {
    type: String,
    enum: ['Pending', 'Accepted', 'Rejected'],
    default: 'Pending',
  },
  reason: { type: String, required: true }, // Reason for the appointment
  // notes: { type: String }, // Additional notes
  symptoms: { type: String }, // Patient symptoms
  medicines: [{
    name: String,
    timesPerDay: String,
    days: String
  }],
  summary: [{
    name: String,
    timesPerDay: String,
    days: String,
    purpose: String,
    instructions: String
  }],
  meetLink: { type: String }, // Add this line to store the meet link
  reportLink: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);