import React from "react";
import styled from "styled-components";
import { Link } from "react-scroll";

export default function Contact() {
  const getCurrentYear = () => {
    return new Date().getFullYear();
  };

  return (
    <Wrapper>
      <FooterContainer>
        <div className="container">
          <InnerWrapper>
            {/* About Us Section */}
            <Section className="pr-8" id="about">
              <h3 className="text-white font-bold text-xl">About Us</h3>
              <p className="text-gray-300 mt-4">
              Our platform leverages cutting-edge technology to transform healthcare, bridging the gap between patients and professionals. We offer tools that streamline care, improve medication adherence, and empower proactive health management. </p>
            </Section>

            {/* Services Section */}
            <Section className="px-8">
              <h5 className="uppercase tracking-wider font-semibold text-gray-400">Services</h5>
              <ul className="mt-4">
                <li className="mt-2">
                  <a href="#" className="text-gray-300 hover:text-white opacity-80 hover:opacity-100">Automated Pill Dispenser</a>
                </li>
                <li className="mt-2">
                  <a href="#" className="text-gray-300 hover:text-white opacity-80 hover:opacity-100">Dr. MediBot</a>
                </li>
                <li className="mt-2">
                  <a href="#" className="text-gray-300 hover:text-white opacity-80 hover:opacity-100">Healthcare Tips Recommendations</a>
                </li>
                <li className="mt-2">
                  <a href="#" className="text-gray-300 hover:text-white opacity-80 hover:opacity-100">Prescription Summarization</a>
                </li>
                <li className="mt-2">
                  <a href="#" className="text-gray-300 hover:text-white opacity-80 hover:opacity-100">Symptom Detection</a>
                </li>
              </ul>
            </Section>

            {/* Subscribe for Newsletter Section */}
            <Section className="pl-8">
              <h5 className="uppercase tracking-wider font-semibold text-gray-400">Subscribe for our Newsletter</h5>
              <form className="flex items-center mt-6">
                <div className="w-full">
                  <div className="relative">
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-4 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      type="email"
                      placeholder="Enter Your Email Address"
                    />
                    <button
                      type="submit"
                      className="bg-teal-500 hover:bg-teal-400 text-white px-4 py-1 text-sm font-bold rounded absolute top-1 bottom-1 right-0 my-2 mr-2"
                    >
                      Subscribe
                    </button>
                  </div>
                </div>
              </form>
            </Section>
          </InnerWrapper>
        </div>
      </FooterContainer>

      {/* Footer Bottom Section */}
      <FooterBottom>
        <hr className="border-gray-600" />
        <BottomContent className="flex justify-center items-center pt-4">
          <p className="text-sm text-gray-400 text-center">
            © {getCurrentYear()} NirogCare Private Limited &nbsp; | &nbsp; All Rights Reserved
          </p>
        </BottomContent>

        <BackToTop className="flex justify-center mt-2">
          <Link
            className="text-gray-400 hover:text-white animate pointer font13"
            to="home"
            smooth={true}
            offset={-80}
          >
            Back to top
          </Link>
        </BackToTop>
      </FooterBottom>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
`;

const InnerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 10px; /* Reduced gap between upper section and footer bottom */
`;

const Section = styled.div`
  width: 100%;
  margin-bottom: 20px; /* Reduced space between sections */
  @media (min-width: 768px) {
    width: 30%;
  }
`;

const FooterContainer = styled.div`
  background: #111827;
  padding: 30px 20px;
  @media (min-width: 768px) {
    padding: 30px 60px;
  }
`;

const FooterBottom = styled.div`
  background: #111827;
  padding: 10px 20px; /* Reduced gap */
  text-align: center;
  @media (min-width: 768px) {
    padding: 10px 60px;
  }
`;


const BottomContent = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 10px;
`;

const BackToTop = styled.div`
  margin-top: 5px;
`;
