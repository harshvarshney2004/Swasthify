import React from 'react';
import {heroImg} from '../../assets/hero.jpg';

const Hero = () => {
    return (
        <div className="LandingPage overflow-hidden antialiased bg-white font-sans text-gray-900">
            <main className="w-full">
                {/* Start hero */}
                <div className="bg-gray-100">
                    <section className="cover bg-blue-teal-gradient relative bg-blue-600 px-4 sm:px-8 lg:px-16 xl:px-40 2xl:px-64 overflow-hidden py-48 flex items-center min-h-screen">
                        <div className="h-full absolute top-0 left-0 z-0">
                            <img
                                src={heroImg}
                                alt=""
                                className="w-full h-full object-cover opacity-20"
                            />
                        </div>
                        <div className="lg:w-3/4 xl:w-2/4 relative z-10 h-100 lg:mt-16">
                            <div className="animate-fade-in">
                                <h1 className="text-white text-left text-4xl md:text-5xl xl:text-6xl font-bold leading-tight">
                                    Online Medical Care, Right at Your Fingertips
                                </h1>
                                <p className="text-blue-100 text-left text-xl md:text-2xl leading-snug mt-4">
                                    Experience a new level of convenience and control over your healthcare with our AI-Enhanced Medical Diagnostics System.
                                </p>
                                <div className="mt-8 flex justify-start">
                                    <a
                                        href="#features"
                                        className="px-8 py-4 bg-rose-500 hover:bg-rose-700 text-white rounded-lg inline-block font-bold border-2 border-yellow-700"
                                        style={{ transition: 'background-color 0.3s ease' }} // Add smooth transition
                                    >
                                        Learn More
                                    </a>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default Hero;
