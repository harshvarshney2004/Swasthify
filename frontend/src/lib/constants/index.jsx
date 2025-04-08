import {
    HiOutlineCube,
    HiOutlineDocumentText,
    HiOutlineDocumentReport,
    HiOutlineQuestionMarkCircle,
    HiOutlineUser,
    HiOutlineChatAlt2,
  } from 'react-icons/hi';
  import { MdDashboard, MdOutlineSupportAgent } from 'react-icons/md';
  import {
    FaHeartbeat,
    FaStethoscope,
    FaMicroscope,
    FaBrain,
    FaSyringe,
    FaPills,
    FaCalendarCheck,
  } from 'react-icons/fa';
  
  // DOCTOR SIDEBAR LINKS
  export const DOCTOR_SIDEBAR_LINKS = [
    {
      key: 'doctor',
      label: 'Your Appointments',
      path: '/doctor',
      icon: <FaCalendarCheck size={24} />,
    },
    {
      key: 'appointments',
      label: 'Appointment Requests',
      path: 'appointments',
      icon: <HiOutlineDocumentReport size={24} />,
    },
    {
      key: 'medicalchatbot',
      label: 'Dr. MediBot',
      path: 'medicalchatbot',
      icon: <HiOutlineChatAlt2 size={24} />,
    },
    {
      key: 'heart',
      label: 'Heart Risk Prediction',
      path: 'heart',
      icon: <FaHeartbeat size={24} />,
    },
    {
      key: 'diabetes',
      label: 'Diabetes Detection',
      path: 'diabetes',
      icon: <FaSyringe size={24} />,
    },
    {
      key: 'breast',
      label: 'Breast Cancer Detection',
      path: 'breast',
      icon: <FaMicroscope size={24} />,
    },
    {
      key: 'brain',
      label: 'Brain Hemorrhage',
      path: 'brain',
      icon: <FaBrain size={24} />,
    },
    {
      key: 'skindisease',
      label: 'Skin Disease Classification',
      path: 'skindisease',
      icon: <FaStethoscope size={24} />,
    },
  ];
  
  export const DOCTOR_SIDEBAR_BOTTOM_LINKS = [
    {
      key: 'profile',
      label: 'Your Profile',
      path: '/doctor/profile',
      icon: <HiOutlineUser size={24} />,
    },
    {
      key: 'support',
      label: 'Help & Support',
      path: '/doctor/profile',
      icon: <MdOutlineSupportAgent size={24} />,
    },
  ];
  
  // PATIENT SIDEBAR LINKS
  export const PATIENT_SIDEBAR_LINKS = [
    {
      key: 'patient',
      label: 'Book Appointment',
      path: '/patient',
      icon: <FaCalendarCheck size={24} />,
    },
    {
      key: 'appointments',
      label: 'Your Appointments',
      path: 'appointments',
      icon: <HiOutlineCube size={24} />,
    },
    {
      key: 'medichatbot',
      label: 'Dr. MediBot',
      path: 'medichatbot',
      icon: <HiOutlineChatAlt2 size={24} />,
    },
    {
      key: 'symptomdetect',
      label: 'Check Your Symptoms',
      path: 'symptomdetect',
      icon: <HiOutlineDocumentText size={24} />,
    },
    {
      key: 'recommend',
      label: 'Personalized Health Tips',
      path: 'recommend',
      icon: <FaHeartbeat size={24} />,
    },
    {
      key: 'addtimeslots',
      label: 'Pill Dispenser',
      path: 'addtimeslots',
      icon: <FaPills size={24} />,
    },
  ];
  
  export const PATIENT_SIDEBAR_BOTTOM_LINKS = [
    {
      key: 'settings',
      label: 'Your Profile',
      path: '/patient/profile',
      icon: <HiOutlineUser size={24} />,
    },
    {
      key: 'support',
      label: 'Help & Support',
      path: '/patient/profile',
      icon: <MdOutlineSupportAgent size={24} />,
    },
  ];
  