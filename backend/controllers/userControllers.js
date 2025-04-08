const { User, Doctor, Patient } = require("../models");
const {
  generateToken,
  generateHashedPassword,
  verifyPassword,
} = require("../config");
const { OAuth2Client } = require('google-auth-library');
const dotenv = require("dotenv");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// @description     Auth the user
// @route           POST /api/users/login
// @access          Public
const authUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please enter all the fields",
    });
  }

  const userExists = await User.findOne({ email }).exec();

  if (userExists && (await verifyPassword(password, userExists.password))) {
    return res.status(200).json({
      success: true,
      _id: userExists._id,
      email: userExists.email,
      userType: userExists.userType,
      token: generateToken(userExists._id, userExists.email),
      message: "Authenticated Successfully",
    });
  } else {
    return res.status(400).json({
      success: false,
      message: "Invalid Email or Password",
    });
  }
};

const googleAuth = async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { email } = payload;

    // Check if the user exists in the database
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'User Not Found',
      });
    }

    // Send a response with the user info and a token
    res.json({
      success: true,
      _id: user._id,
      email: user.email,
      userType: user.userType,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Google Authentication Failed',
    });
  }
};

// @description     Signup Doctor
// @route           POST /api/users/signup/doctor
// @access          Public
const signupDoctor = async (req, res) => {
  try {
    const { name, email, password, specialization, yearsOfExperience, phone, clinicAddress, qualifications, availability, profileImage } = req.body;

    const user = new User({
      email,
      password: await generateHashedPassword(password),
      userType: 'Doctor',
    });
    await user.save();

    const doctor = new Doctor({
      doctor_Userid: user._id,
      name,
      specialization,
      yearsOfExperience,
      phone,
      clinicAddress,
      qualifications,
      availability,
      profileImage, // Store the Cloudinary URL
    });
    await doctor.save();

    res.status(201).json({ success: true, message: 'Doctor registered successfully', data: doctor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error during signup', error: error.message });
  }
};


// @description     Signup Patient
// @route           POST /api/users/signup/patient
// @access          Public
const signupPatient = async (req, res) => {
  try {
    const { name, email, password, age, gender, phone, address, medicalHistory, currentMedications, allergies, profileImage } = req.body;

    const user = new User({
      email,
      password: await generateHashedPassword(password),
      userType: 'Patient',
    });
    await user.save();

    const patient = new Patient({
      patient_Userid: user._id,
      name,
      age,
      gender,
      phone,
      address,
      medicalHistory,
      currentMedications,
      allergies,
      profileImage, // Store the Cloudinary URL
    });
    await patient.save();

    res.status(201).json({ success: true, message: 'Patient registered successfully', data: patient });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error during signup', error: error.message });
  }
};


// @description Get doctor's profile
// @route GET /api/doctor/profile/:userId
// @access Private (Doctor only)
const getDoctorProfile = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ doctor_Userid: req.params.userId });
    if (!doctor) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }
    res.json({ success: true, data: doctor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// @description Update doctor's profile
// @route PUT /api/doctor/profile/:userId
// @access Private (Doctor only)
const updateDoctorProfile = async (req, res) => {
  try {
    const updates = req.body;
    const doctor = await Doctor.findOneAndUpdate(
      { doctor_Userid: req.params.userId },
      updates,
      { new: true }
    );

    if (!doctor) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }

    res.json({ success: true, message: "Profile updated successfully", data: doctor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// userControllers.js
const getPatientProfile = async (req, res) => {
  const { userId } = req.params;

  try {
    const patient = await Patient.findOne({ patient_Userid: userId });
    if (patient) {
      return res.status(200).json({ success: true, data: patient });
    } else {
      return res.status(404).json({ success: false, message: "Patient not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

const updatePatientProfile = async (req, res) => {
  const { userId } = req.params;

  try {
    const updatedPatient = await Patient.findOneAndUpdate(
      { patient_Userid: userId },
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedPatient) {
      return res.status(404).json({ success: false, message: "Patient not found" });
    }
    
    return res.status(200).json({ success: true, data: updatedPatient });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { authUser, signupDoctor, signupPatient, googleAuth, getDoctorProfile, updateDoctorProfile, getPatientProfile, updatePatientProfile };