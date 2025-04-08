import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/shared/Layout'
import LandingPg from './pages/LandingPg'
import Home from './pages/Home'

import Appointments from './pages/Doctor/Appointments'
import DiabetesPredictionForm from './pages/Doctor/DiabetesPredictionForm'
import BreastCancerPredictor from './pages/Doctor/BreastCancerPredictor'
import DoctorAcceptedAppointments from './pages/Doctor/AcceptedAppointments'
import DoctorProfile from './pages/Doctor/DoctorProfile'
import ImageUpload from './pages/Doctor/Brain'
import ImageUploadClassifier from './pages/Doctor/SkinDiseaseClassification'
import MedicalChatbot from './pages/Doctor/MedicalChatbot'
import HeartRiskPredictionForm from './pages/Doctor/HeartRiskPredictionForm'

import BookAppointments from './pages/Patients/BookAppointments'
import AcceptedAppointments from './pages/Patients/AcceptedAppointments'
import SymptomDetection from './pages/Patients/SymptomDetection'
import HealthTips from './pages/Patients/HealthTips'
import PatientProfile from './pages/Patients/PatientProfile'
import SetServoTimes from './pages/Patients/SetServoTimes'
import MediChatbot from './pages/Patients/MediChatbot'


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPg />} />
                <Route path="/home" element={<Home/>} />
                <Route path='/patient' element={<Layout />}>
                    <Route index element={<BookAppointments />} />
                    <Route path="appointments" element = {<AcceptedAppointments />} />
                    <Route path="profile" element = {<PatientProfile/>} />
                    <Route path="symptomdetect" element = {<SymptomDetection/>} />
                    <Route path="recommend" element = {<HealthTips/>} />
                    <Route path="addtimeslots" element = {<SetServoTimes/>} /> 
                    <Route path="medichatbot" element = {<MediChatbot/>} />  
                                      
                </Route>
                <Route path='/doctor' element={<Layout />}>
                    <Route index element={<DoctorAcceptedAppointments />} />
                    <Route path="appointments" element = {<Appointments />} />
                    <Route path="profile" element = {<DoctorProfile/>} />
                    <Route path="diabetes" element = {<DiabetesPredictionForm/>} />
                    <Route path="brain" element = {<ImageUpload/>} />
                    <Route path="heart" element = {<HeartRiskPredictionForm/>} />
                    <Route path="skindisease" element = {<ImageUploadClassifier/>} />
                    <Route path="breast" element = {<BreastCancerPredictor/>} />
                    <Route path="medicalchatbot" element = {<MedicalChatbot/>} />                    
                </Route>
            </Routes>
        </Router>
    )
}

export default App
