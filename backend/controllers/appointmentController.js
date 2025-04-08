const { Appointment, Doctor, Patient, User } = require("../models");

// Get all doctors
const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error. Could not fetch doctors." });
  }
};

// Book an appointment
const bookAppointment = async (req, res) => {
  const { patient_id, doctor_id, appointmentDate, reason } = req.body;

  if (!patient_id || !doctor_id || !appointmentDate || !reason) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
    const patientExists = await User.findById(patient_id);
    const doctorExists = await Doctor.findById(doctor_id);

    if (!patientExists || !doctorExists) {
      return res.status(404).json({ success: false, message: "Patient or Doctor not found" });
    }
    
    const patient_Userid = patient_id;
    const doctor_Userid = doctorExists.doctor_Userid.toString();

    const appointment = new Appointment({
      patient_Userid,
      doctor_Userid,
      appointmentDate,
      reason,
    });

    await appointment.save();
    res.status(201).json({ success: true, message: 'Appointment booked successfully', data: appointment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get pending appointments for a doctor
const getPendingAppointments = async (req, res) => {
  const { doctorId } = req.params;

  try {
    // Fetch all pending appointments for the given doctor
    const pendingAppointments = await Appointment.find({
      doctor_Userid: doctorId,
      status: 'Pending',
    });
    // console.log(pendingAppointments)

    // Fetch patient details for each appointment
    const appointmentsWithPatientDetails = await Promise.all(
      pendingAppointments.map(async (appointment) => {
        const patient = await Patient.findOne({ patient_Userid: appointment.patient_Userid })
          .select('name age gender profileImage'); // Only select necessary patient fields

        return {
          ...appointment._doc, // Copy appointment details
          patientDetails: patient, // Attach patient details
        };
      })
    );
    res.status(200).json(appointmentsWithPatientDetails);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching pending appointments' });
  }
};


// Update appointment status (Accept/Reject)
const updateAppointmentStatus = async (req, res) => {
  const { appointmentId } = req.params;
  const { status, appointmentTime } = req.body; // Capture appointmentTime

  if (!['Accepted', 'Rejected'].includes(status)) {
    return res.status(400).json({ success: false, message: 'Invalid status' });
  }

  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { status, appointmentTime }, // Update with appointmentTime
      { new: true }
    );
    if (!updatedAppointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    res.status(200).json({
      success: true,
      message: `Appointment ${status} successfully`,
      data: updatedAppointment,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating appointment status' });
  }
};

// Get accepted appointments for a doctor
const getAcceptedAppointmentsForDoctor = async (req, res) => {
  const doctorId = req.params.doctorId; // Fetch doctorId from request parameters

  try {
    // Fetch all accepted appointments for the doctor
    const appointments = await Appointment.find({
      doctor_Userid: doctorId,
      status: 'Accepted',
    });

    // For each appointment, populate patient details
    const populatedAppointments = await Promise.all(
      appointments.map(async (appointment) => {
        // Fetch the patient details using patient_Userid in the appointment
        const patient = await Patient.findOne({ patient_Userid: appointment.patient_Userid })
          .select('name age gender profileImage phone'); // Select only the necessary fields

        // Return the appointment object with patient details added
        return {
          ...appointment.toObject(),
          patientDetails: patient, // Attach patient details to the appointment object
        };
      })
    );

    res.status(200).json(populatedAppointments);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// Get accepted appointments for a patient
const getAcceptedAppointmentsForPatient = async (req, res) => {
  const patient_id = req.params.patientId;

  try {
    // Fetch all appointments for the patient with status 'Accepted'
    const appointments = await Appointment.find({ patient_Userid: patient_id, status: 'Accepted' });

    // For each appointment, find the doctor using doctor_Userid
    const populatedAppointments = await Promise.all(
      appointments.map(async (appointment) => {
        const doctor = await Doctor.findOne({ doctor_Userid: appointment.doctor_Userid })
          .select('name specialization profileImage'); // Only select necessary fields

        return {
          ...appointment.toObject(),
          doctorDetails: doctor, // Add doctor details to the appointment object
        };
      })
    );

    res.status(200).json(populatedAppointments);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update appointment with prescription data
const savePrescriptions = async (req, res) => {
  const { appointmentId } = req.params;
  const { symptoms, medicines, summary } = req.body;
  console.log(appointmentId);
  console.log(symptoms, medicines, summary);
  try {
    // Find the appointment by ID
    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    // Update the appointment with prescription data
    appointment.symptoms = symptoms;
    appointment.medicines = medicines;
    appointment.summary = summary;

    // Save the updated appointment
    await appointment.save();

    res.status(200).json({
      success: true,
      message: 'Prescription added to appointment successfully',
      data: appointment
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating appointment with prescription' });
  }
};
const updateAppointment = async (req, res) => {
  const { id } = req.params; // Get appointment ID from request parameters
  const { meetLink } = req.body; // Get meet link from request body

  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      id,
      meetLink,
    );

    if (!updatedAppointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }
    return res.status(200).json({ success: true, data: updatedAppointment });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error updating appointment' });
  }
};


module.exports = {
  getAllDoctors,
  bookAppointment,
  getPendingAppointments,
  updateAppointmentStatus,
  updateAppointment,
  getAcceptedAppointmentsForDoctor,
  getAcceptedAppointmentsForPatient,
  savePrescriptions
};
