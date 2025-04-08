const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const doctorSchema = new Schema({
  doctor_Userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  yearsOfExperience: { type: Number, required: true },
  phone: { type: String, required: true },
  clinicAddress: { type: String, required: true },
  qualifications: { type: String, required: true },
  availability: { type: String, required: true },
  profileImage: { type: String, required: true },
  bio: { type: String, required: true },
  hospitals: [{ type: String }],
  colleges: [
    {
      name: { type: String, required: true },
      degree: { type: String, required: true },
    }
  ],
  awards: [{ type: String }],
  consultationFee: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  languagesSpoken: [{ type: String }]
});

const Doctor = mongoose.model('Doctor', doctorSchema);
module.exports = Doctor;
