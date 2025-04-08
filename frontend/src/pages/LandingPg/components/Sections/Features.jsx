import React from "react";
import styled from "styled-components";

export default function Features() {
  return (
    <Wrapper id="features">
      <div className="container">
        <HeaderInfo>
          <h1 className="font40 extraBold" style={{ textAlign: 'center' }}>Features</h1>
          <p className="font20" style={{ textAlign: 'center' }}>Empowering Our Users with Comprehensive Tools</p>
        </HeaderInfo>
        <FeatureCards className="flex">
          {featuresData.map((feature, index) => (
            <FeatureCard key={index}>
              <CardIcon>
                <i className={feature.icon}></i>
              </CardIcon>
              <h2>{feature.title}</h2>
              <p>{feature.subtitle}</p>
            </FeatureCard>
          ))}
        </FeatureCards>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 100%;
  padding: 60px 0;
  background-color: #f8f9fa;
`;

const HeaderInfo = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const FeatureCards = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 30px;

  @media (max-width: 860px) {
    flex-direction: column;
    align-items: center;
  }
`;

const FeatureCard = styled.div`
  background: #fff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  flex: 1 1 calc(33.33% - 30px);
  max-width: 100%;
  transition: all 0.3s ease;

  &:hover {
    background-color: #2563eb; /* Changed to blue-600 */
    color: #fff;
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3); /* Increased shadow */
    
    h2, p {
      color: #fff;
    }
  }

  h2 {
    font-size: 24px;
    margin-bottom: 15px;
  }

  p {
    font-size: 16px;
    color: #666;
  }

  @media (max-width: 860px) {
    flex: 1 1 100%;
  }
`;

const CardIcon = styled.div`
  font-size: 48px;
  color: #2563eb; /* Changed to blue-600 */
  margin-bottom: 20px;
`;

const featuresData = [
  {
    icon: "fa fa-calendar-check-o",
    title: "Doctor-Patient Appointment Management System",
    subtitle: "Browse and filter doctors based on specialties, book appointments, and manage schedules. Syncs with Video Conferencing Applications like Zoom or Google Meet for easy access.",
  },
  {
    icon: "fa fa-pills",
    title: "Automated Pill Dispenser",
    subtitle: "An IoT-enabled device that dispenses medications as per prescriptions, ensuring patients receive their doses on time without errors.",
  },
  {
    icon: "fa fa-heartbeat",
    title: "Symptom-based Disease Detection System",
    subtitle: "AI models analyze symptoms input by patients, offering preliminary assessments to help with early diagnosis and timely interventions.",
  },
  {
    icon: "fa fa-robot",
    title: "Dr. MediBot (AI Chatbot)",
    subtitle: "An AI-powered chatbot that provides real-time medical advice and recommendations, guiding patients on whether a doctor's consultation is needed.",
  },
  {
    icon: "fa fa-stethoscope",
    title: "Personalized Healthcare Tips Recommendations",
    subtitle: "AI-based personalized health tips tailored to each patient’s medical history, symptoms, and preferences, encouraging proactive health management.",
  },
  {
    icon: "fa fa-file-medical",
    title: "Prescription Summarization System",
    subtitle: "Easily view, download, and manage digital prescriptions with simplified summaries, making it easier for patients to understand their treatment plans.",
  },
  {
    icon: "fa fa-database",
    title: "Centralized Database and User Dashboards",
    subtitle: "A secure database for all patient and doctor information. Separate dashboards for doctors, patients, and admin to manage appointments, profiles, and more.",
  },
  {
    icon: "fa fa-diagnoses",
    title: "Specific Disease Prediction Models",
    subtitle: "AI-driven models analyze EHRs to predict diseases, assisting doctors in making informed decisions with accurate predictive analytics.",
  }
];
