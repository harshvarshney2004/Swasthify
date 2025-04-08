import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  useToast,
  Box,
  IconButton,
} from "@chakra-ui/react";
import { AttachmentIcon } from "@chakra-ui/icons"; // Use any icon of your choice
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // For file uploads

const PatientSignUp = ({ switchToLogin }) => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(null);

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
    gender: "",
    phone: "",
    address: "",
    medicalHistory: "",
    currentMedications: "",
    allergies: ""
  });

  const handleCredentials = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
  };

  const submitHandler = async () => {
    setLoading(true);

    if (
      !credentials.name ||
      !credentials.email ||
      !credentials.password ||
      !credentials.confirmPassword ||
      !credentials.age ||
      !credentials.gender ||
      !credentials.phone ||
      !credentials.address ||
      !profileImage
    ) {
      setLoading(false);
      return toast({
        title: "Please fill all the required fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      });
    }

    if (credentials.password !== credentials.confirmPassword) {
      setLoading(false);
      return toast({
        title: "Passwords do not match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      });
    }

    try {
      const formData = new FormData();
      formData.append("file", profileImage);
      formData.append("upload_preset", "patient_preset");
      const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/dvvhsfazd/image/upload", formData);
      const imageUrl = uploadRes.data.secure_url;

      const patientData = { ...credentials, profileImage: imageUrl };
      const response = await fetch("http://localhost:5000/api/users/signup/patient", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patientData),
      });
      const data = await response.json();

      if (data) {
        localStorage.setItem("userInfo", JSON.stringify(data));
        setLoading(false);
        switchToLogin(); // Switch to Login tab
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      return toast({
        title: "Internal server error",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      });
    }
  };

  return (
    <Stack spacing="6" p="4" bg="rgba(255, 255, 255, 0)" borderRadius="lg"> {/* Transparent background */}
      <FormControl isRequired>
        <FormLabel htmlFor="name" color="gray.600">Name</FormLabel>
        <Input
          background="rgba(255, 255, 255, 0)" // Semi-transparent background
          type="text"
          name="name"
          value={credentials.name}
          placeholder="Enter Your Name"
          onChange={handleCredentials}
          focusBorderColor="darkblue" // Change focus border color
          borderColor="darkblue" // Change outline color
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel htmlFor="email" color="gray.600">Email</FormLabel>
        <Input
          background="rgba(255, 255, 255, 0)" // Semi-transparent background
          type="email"
          name="email"
          value={credentials.email}
          placeholder="Enter Your Email"
          onChange={handleCredentials}
          focusBorderColor="darkblue" // Change focus border color
          borderColor="darkblue" // Change outline color
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel htmlFor="age" color="gray.600">Age</FormLabel>
        <Input
          background="rgba(255, 255, 255, 0)" // Semi-transparent background
          type="number"
          name="age"
          value={credentials.age}
          placeholder="Enter Your Age"
          onChange={handleCredentials}
          focusBorderColor="darkblue" // Change focus border color
          borderColor="darkblue" // Change outline color
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel htmlFor="gender" color="gray.600">Gender</FormLabel>
        <Input
          background="rgba(255, 255, 255, 0)" // Semi-transparent background
          type="text"
          name="gender"
          value={credentials.gender}
          placeholder="Enter Your Gender"
          onChange={handleCredentials}
          focusBorderColor="darkblue" // Change focus border color
          borderColor="darkblue" // Change outline color
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel htmlFor="phone" color="gray.600">Phone</FormLabel>
        <Input
          background="rgba(255, 255, 255, 0)" // Semi-transparent background
          type="text"
          name="phone"
          value={credentials.phone}
          placeholder="Enter Your Phone Number"
          onChange={handleCredentials}
          focusBorderColor="darkblue" // Change focus border color
          borderColor="darkblue" // Change outline color
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel htmlFor="address" color="gray.600">Address</FormLabel>
        <Input
          background="rgba(255, 255, 255, 0)" // Semi-transparent background
          type="text"
          name="address"
          value={credentials.address}
          placeholder="Enter Your Address"
          onChange={handleCredentials}
          focusBorderColor="darkblue" // Change focus border color
          borderColor="darkblue" // Change outline color
        />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="medicalHistory" color="gray.600">Medical History</FormLabel>
        <Input
          background="rgba(255, 255, 255, 0)" // Semi-transparent background
          type="text"
          name="medicalHistory"
          value={credentials.medicalHistory}
          placeholder="Enter Your Medical History"
          onChange={handleCredentials}
          focusBorderColor="darkblue" // Change focus border color
          borderColor="darkblue" // Change outline color
        />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="currentMedications" color="gray.600">Current Medications</FormLabel>
        <Input
          background="rgba(255, 255, 255, 0)" // Semi-transparent background
          type="text"
          name="currentMedications"
          value={credentials.currentMedications}
          placeholder="Enter Your Current Medications"
          onChange={handleCredentials}
          focusBorderColor="darkblue" // Change focus border color
          borderColor="darkblue" // Change outline color
        />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="allergies" color="gray.600">Allergies</FormLabel>
        <Input
          background="rgba(255, 255, 255, 0)" // Semi-transparent background
          type="text"
          name="allergies"
          value={credentials.allergies}
          placeholder="Enter Your Allergies"
          onChange={handleCredentials}
          focusBorderColor="darkblue" // Change focus border color
          borderColor="darkblue" // Change outline color
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel htmlFor="password" color="gray.600">Password</FormLabel>
        <InputGroup background="rgba(255, 255, 255, 0)"> {/* Semi-transparent background */}
          <InputRightElement w="4.5rem">
            <Button
              h="1.75rem"
              size="sm"
              onClick={() => setShow(!show)}
              variant="ghost"
              colorScheme="blue"
            >
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
          <Input
            type={show ? "text" : "password"}
            name="password"
            value={credentials.password}
            placeholder="Password"
            onChange={handleCredentials}
            focusBorderColor="darkblue" // Change focus border color
            borderColor="darkblue" // Change outline color
          />
        </InputGroup>
      </FormControl>

      <FormControl isRequired>
        <FormLabel htmlFor="confirmPassword" color="gray.600">Confirm Password</FormLabel>
        <InputGroup background="rgba(255, 255, 255, 0)">
          <InputRightElement w="4.5rem">
            <Button
              h="1.75rem"
              size="sm"
              onClick={() => setShow(!show)}
              variant="ghost"
              colorScheme="blue"
            >
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
          <Input
            type={show ? "text" : "password"}
            name="confirmPassword"
            value={credentials.confirmPassword}
            placeholder="Confirm Password"
            onChange={handleCredentials}
            focusBorderColor="darkblue" // Change focus border color
            borderColor="darkblue" // Change outline color
          />
        </InputGroup>
      </FormControl>

      {/* File Upload for Profile Image */}
      <FormControl isRequired>
        <FormLabel htmlFor="profileImage" color="gray.600">
          Profile Image
        </FormLabel>
        <Box
          border="2px dashed blue" // Blue dashed border
          borderRadius="md"
          padding="4"
          textAlign="center"
          cursor="pointer"
          _hover={{ background: "rgba(0, 0, 255, 0.1)" }} // Light blue on hover
        >
          <Input
            type="file"
            name="profileImage"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: "none" }} // Hide default input
            focusBorderColor="#6f42c1"
          />
          <IconButton
            aria-label="Upload Image"
            icon={<AttachmentIcon />} // Upload icon
            onClick={() => document.querySelector('input[type="file"]').click()} // Trigger file input
            variant="outline"
            colorScheme="blue"
          />
          <p>{profileImage ? profileImage.name : "Upload your profile image"}</p>
        </Box>
      </FormControl>

      <Button
        colorScheme="blue"
        isLoading={loading}
        loadingText="Signing up"
        onClick={submitHandler}
      >
        Sign Up
      </Button>

      <Button variant="link" onClick={switchToLogin}>
        Already have an account? Log in
      </Button>
    </Stack>
  );
};

export default PatientSignUp;
