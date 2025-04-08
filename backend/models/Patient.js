const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientSchema = new Schema({
  patient_Userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  medicalHistory: { type: String },
  currentMedications: { type: String },
  allergies: { type: String },
  profileImage: { type: String, required: true }, // Add profile image URL field
  emergencyContact: {
    name: { type: String, required: false }, // Emergency contact name
    relationship: { type: String, required: false }, // Relationship to the patient
    phone: { type: String, required: false }, // Emergency contact phone
  },
  dateOfBirth: { type: Date, required: false }, // Date of birth
  languagesSpoken: [{ type: String }], // Languages spoken by the patient
}, { timestamps: true });

module.exports = mongoose.model('Patient', patientSchema);