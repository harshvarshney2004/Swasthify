import React from "react"; 
import TopNavbar from "../components/Nav/TopNavbar";
import Features from "../components/Sections/Features";
import Contact from "../components/Sections/Contact";
import Footer from "../components/Sections/Footer";
import AIChatbot from '../components/AIChatbot';
import heroImg from '../assets/hero.jpg'; // Ensure this path is correct
import "./Landing.css";

export default function Landing() {
  return (
    <div className="landing" style={{ display: "flex", flexDirection: "column" }}>
      <TopNavbar />

      {/* Start Hero Section */}
      <div className="hero-section">
        <img src={heroImg} alt="Hero Background" className="w-full h-full object-cover" />
        <section className="hero-content px-4 sm:px-8 lg:px-16 xl:px-40 2xl:px-64 py-48 flex items-center min-h-screen">
          <div className="lg:w-3/4 xl:w-2/4 h-100 lg:mt-16">
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold leading-tight">
                Online Medical Care, Right at Your Fingertips
              </h1>
              <p className="text-xl md:text-2xl leading-snug mt-4">
                Experience a new level of convenience and control over your healthcare with our AI-Enhanced Medical Diagnostics System.
              </p>
              <div className="mt-8 flex justify-start">
                <a href="#features" className="hero-button">
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* End Hero Section */}

      <Features />
      <Contact />
      <Footer />

      {/* Fixed chatbot component */}
      <div className="fixed bottom-5 right-5">
        <AIChatbot />
      </div>
    </div>
  );
}
