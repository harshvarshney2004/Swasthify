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

📽️ [Click here to view the Project Presentation](./assets/Swasthify.pdf)

---

## 🚀 How to Run the Project Locally

### 1. Clone the Repository
```bash
git clone https://github.com/ayush14189/Swasthify.git
cd Swasthify
```

### 2. Install Requirements
#### a. Backend (Node.js + Express)
``` bash
cd backend
npm install
```
Create a .env file in the server directory with the following (example):
``` bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
ZOOM_API_KEY=your_zoom_key
ZOOM_API_SECRET=your_zoom_secret
```

Run the backend server:
``` bash
npm run dev
```

#### b. Frontend (React + TailwindCSS + UI libraries)
``` bash
cd frontend
npm install
```
Create a .env file in the client folder:
``` bash
REACT_APP_BASE_URL=http://localhost:5000
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
```
Run the frontend:
``` bash
npm start
```

#### c. ML API (Python + Flask)
Make sure you have Python 3.8 or later and pip installed.

``` bash
cd ../flask
python -m venv venv
source venv/bin/activate       # For macOS/Linux
venv\Scripts\activate          # For Windows
pip install -r requirements.txt
```
Run the Flask server:
``` bash
python app.py
```
This will serve AI endpoints like symptom analysis, disease prediction, drug recommendation, etc.

### 3. IoT Device Setup (ESP8266 + Arduino UNO)
#### Required Components:
Arduino UNO  
ESP8266 WiFi Module  
Servo Motor (for pill dispenser slots)  
Buzzer  
I2C OLED Screen  
Jumper wires
Breadboard  
Power Source

#### Steps:  
1. Install Arduino IDE & Libraries:
- Download and install Arduino IDE.
- In Arduino IDE, go to Preferences and add the ESP8266 board URL:
``` bash
http://arduino.esp8266.com/stable/package_esp8266com_index.json
```
- Then, go to Boards Manager, search for `esp8266`, and install it.

- Also install the following libraries:  
`ESP8266WiFi.h`  
`HTTPClient.h`  
`Servo.h`

2. Flash the code from the `/pill_dispenser` folder (e.g., pill_dispenser.ino).  

3. Update these variables in code:  
const char* ssid = "your_wifi_ssid";  
const char* password = "your_wifi_password";  
const String serverEndpoint = "http://your-server-ip/get_times";  
Upload and monitor `Serial Monitor` for success logs.

