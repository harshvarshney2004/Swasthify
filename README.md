# Swasthify
### Bridging Distances, Enhancing Care—Empowering Health with AI, IoT, and Virtual Connectivity

## 🌐 Overview

With the global rise in chronic diseases and limited access to healthcare, there is an urgent need for innovative solutions to improve accessibility and efficiency. Chronic diseases like **heart disease, cancer, and diabetes** account for **71% of global deaths** (WHO), while nearly half the global population lacks access to essential healthcare services, especially in rural regions.

Urban populations face long wait times, while rural patients often travel long distances for basic medical attention. Our platform addresses these issues by integrating **AI, IoT**, and **virtual healthcare** to bridge the accessibility gap, enable early diagnosis, improve medication adherence, and enhance patient-doctor interaction.

---

## ❓ Problem Statement

Develop a comprehensive **AI-powered virtual healthcare platform** that connects rural and urban patients with qualified doctors via **virtual consultations**. The system should:
- Enable **AI-assisted diagnostics** for early detection of chronic diseases.
- Provide **digital prescription management**.
- Integrate an **IoT-powered pill dispenser** for automated medication dispensing.
- Support a **secure payment system** with escrow logic.
- Offer an **AI-driven medical chatbot** for real-time health advice.

---

## 💡 Idea / Solution

### 1. Doctor-Patient Appointment Management System
- Patients can filter/search doctors by specialization.
- Book and manage appointments.
- Sync with **Google Calendar** and support **Google Meet/Zoom** video consultations.

### 2. Automated IoT-Powered Pill Dispenser
- An **IoT-integrated pill dispenser** built using Arduino + ESP8266 automatically dispenses medication based on prescriptions.
- Ensures medication adherence and reduces dosage errors.

### 3. Symptom-based Disease Detection
- Input symptoms to receive **AI-driven preliminary disease analysis**.
- Early diagnosis for conditions like **heart disease, skin cancer, and diabetes**.

### 4. Dr. MediBot - AI Medical Chatbot
- A virtual assistant to answer medical queries in real time.
- Offers guidance on symptoms and recommends next steps.

### 5. Personalized Healthcare Tips
- AI-driven health tips based on medical history, vitals, and symptoms.
- Encourages proactive health management.

### 6. Prescription Summarization System
- Doctors add prescriptions digitally.
- Patients view/download summaries with medication info, timing, and duration.

### 7. Centralized Database & Dashboards
- **MongoDB-based secure database** to manage users, prescriptions, and appointments.
- Separate dashboards for:
  - Patients
  - Doctors
  - Admin

### 8. Drug Recommendation & Treatment Duration
- AI models suggest the most suitable drugs and expected treatment time.
- Available on the doctor dashboard for enhanced decision-making.

### 9. Mini-Escrow Payment System
- Secure payments held until consultation is completed.
- Builds trust between patients and doctors.

### 10. Specific Disease Prediction Models
- Use AI to analyze EHR (Electronic Health Records) for diseases.
- Doctors can run these models for personalized diagnosis and treatment planning.

---

## 🧠 Technologies Used

### 💻 Frontend
- HTML / CSS
- **TailwindCSS**, **ChakraUI**, **MaterialUI**, **Shadcn**
- Framer Motion
- JavaScript / React.js
- **Accertinity UI** & **Spline** for 3D interactions

### 🔧 Backend
- Node.js
- Express.js
- Flask (Python - for ML Model APIs)

### 🔐 Authentication & Security
- JSON Web Tokens (JWT)
- Google OAuth 2.0

### 🧠 Machine Learning / AI
- Python
- PyTorch
- TensorFlow
- LLaMA (for chatbot)
- Jupyter Notebook

### 🛢️ Database
- MongoDB

### 🔌 IoT / Hardware Integration
- Arduino UNO
- ESP8266 WiFi Module
- Servo Motor
- Real-time sync with database and mobile/web app

### 🌐 External APIs Used
- Google OAuth 2.0
- Google Calendar API
- Google Meet API
- Zoom API
- Cloudinary (Image uploads)
- National Medical Council of India API (Doctor verification)

---

## 🔐 Security & Compliance
- Encrypted user credentials using JWT
- OAuth 2.0 for secure login
- Mini-Escrow protects payments until service delivery
- Role-based access controls for doctors, patients, and admins

---

## 📊 Demo / Presentation

📽️ [Click here to view the Project Presentation](./Swasthify)

---

## 🚀 How to Run the Project Locally

### 1. Clone the Repository
```bash
git clone [https://github.com/ayush14189/Swasthify](https://github.com/ayush14189/Swasthify).git
cd Swasthify
