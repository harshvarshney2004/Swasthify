import {
  Container,
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Login, Signup } from "../components/";
import backgroundImage from "../assets/bgImg/bgImage.jpg"; // Adjust the path accordingly
import AIChatbot from '../components/AIChatbot'; // Import the AIChatbot component

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [tabIndex, setTabIndex] = useState(location.state?.tabIndex || 0);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    if (!userInfo) {
      navigate("/home");
    }
  }, [navigate]);

  const handleTabsChange = (index) => {
    setTabIndex(index);
  };

  return (
    <Container
      maxWidth="100vw"
      height="100vh"
      p={0}
      m={0}
      centerContent
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgImage={`url(${backgroundImage})`}
      bgSize="cover"
      bgPosition="center"
    >
      <Box
        bg="rgba(255, 255, 255, 0.4)" // Added transparency (80% opacity)
        w="100%"
        maxWidth="lg" // Increased width for better layout
        p={8}
        borderRadius="lg"
        boxShadow="xl"
      >
        <Tabs
          isFitted
          variant="soft-rounded"
          index={tabIndex}
          onChange={handleTabsChange}
        >
          <TabList mb="1em" gap="6px">
            <Tab
              fontWeight="bold"
              color="gray.600"
              _selected={{ color: "white", bg: "blue.500" }}
              borderRadius="lg"
              p={3}
            >
              Login
            </Tab>
            <Tab
              fontWeight="bold"
              color="gray.600"
              _selected={{ color: "white", bg: "blue.500" }}
              borderRadius="lg"
              p={3}
            >
              Sign Up
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login switchToSignup={() => setTabIndex(1)} />
            </TabPanel>
            <TabPanel>
              <Signup switchToLogin={() => setTabIndex(0)} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>

      {/* Fixed chatbot component */}
      <div className="fixed bottom-5 right-5">
        <AIChatbot />
      </div>
    </Container>
  );
};

export default Home;
