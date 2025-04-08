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
import axios from "axios"; // For file uploads
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AttachmentIcon } from "@chakra-ui/icons"; // You can use any icon of your choice

const DoctorSignup = ({ switchToLogin }) => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(null);

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    specialization: "",
    yearsOfExperience: "",
    clinicAddress: "",
    qualifications: "",
    availability: "",
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
      !credentials.phone ||
      !credentials.specialization ||
      !credentials.yearsOfExperience ||
      !credentials.clinicAddress ||
      !credentials.qualifications ||
      !credentials.availability || 
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

    try {
      // Upload image to Cloudinary
      const formData = new FormData();
      formData.append("file", profileImage);
      formData.append("upload_preset", "doctor_preset"); // Set upload preset in Cloudinary
      const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/dvvhsfazd/image/upload", formData);
      const imageUrl = uploadRes.data.secure_url;
      // Include image URL in credentials
      const doctorData = { ...credentials, profileImage: imageUrl };
      // Send signup request with image URL
      const response = await fetch("http://localhost:5000/api/users/signup/doctor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(doctorData),
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
        <FormLabel htmlFor="name" color="gray.600">
          Name
        </FormLabel>
        <Input
          background="rgba(255, 255, 255, 0)" // Semi-transparent background
          type="text"
          name="name"
          value={credentials.name}
          placeholder="Enter your name"
          onChange={handleCredentials}
          focusBorderColor="darkblue" // Change focus border color
          borderColor="darkblue" // Change outline color
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel htmlFor="email" color="gray.600">
          Email
        </FormLabel>
        <Input
          background="rgba(255, 255, 255, 0)" // Semi-transparent background
          type="email"
          name="email"
          value={credentials.email}
          placeholder="Enter your email"
          onChange={handleCredentials}
          focusBorderColor="darkblue" // Change focus border color
          borderColor="darkblue" // Change outline color
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel htmlFor="phone" color="gray.600">
          Phone Number
        </FormLabel>
        <Input
          background="rgba(255, 255, 255, 0)" // Semi-transparent background
          type="tel"
          name="phone"
          value={credentials.phone}
          placeholder="Enter your phone number"
          onChange={handleCredentials}
          focusBorderColor="darkblue" // Change focus border color
          borderColor="darkblue" // Change outline color
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel htmlFor="password" color="gray.600">
          Password
        </FormLabel>
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
        <FormLabel htmlFor="specialization" color="gray.600">
          Specialization
        </FormLabel>
        <Input
          background="rgba(255, 255, 255, 0)" // Semi-transparent background
          type="text"
          name="specialization"
          value={credentials.specialization}
          placeholder="Enter your specialization"
          onChange={handleCredentials}
          focusBorderColor="darkblue" // Change focus border color
          borderColor="darkblue" // Change outline color
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel htmlFor="yearsOfExperience" color="gray.600">
          Years of Experience
        </FormLabel>
        <Input
          background="rgba(255, 255, 255, 0)" // Semi-transparent background
          type="number"
          name="yearsOfExperience"
          value={credentials.yearsOfExperience}
          placeholder="Enter your years of experience"
          onChange={handleCredentials}
          focusBorderColor="darkblue" // Change focus border color
          borderColor="darkblue" // Change outline color
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel htmlFor="clinicAddress" color="gray.600">
          Clinic Address
        </FormLabel>
        <Input
          background="rgba(255, 255, 255, 0)" // Semi-transparent background
          type="text"
          name="clinicAddress"
          value={credentials.clinicAddress}
          placeholder="Enter your clinic address"
          onChange={handleCredentials}
          focusBorderColor="darkblue" // Change focus border color
          borderColor="darkblue" // Change outline color
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel htmlFor="qualifications" color="gray.600">
          Qualifications
        </FormLabel>
        <Input
          background="rgba(255, 255, 255, 0)" // Semi-transparent background
          type="text"
          name="qualifications"
          value={credentials.qualifications}
          placeholder="Enter your qualifications"
          onChange={handleCredentials}
          focusBorderColor="darkblue" // Change focus border color
          borderColor="darkblue" // Change outline color
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel htmlFor="availability" color="gray.600">
          Availability
        </FormLabel>
        <Input
          background="rgba(255, 255, 255, 0)" // Semi-transparent background
          type="text"
          name="availability"
          value={credentials.availability}
          placeholder="Enter your availability (e.g., Monday: 9am-5pm)"
          onChange={handleCredentials}
          focusBorderColor="darkblue" // Change focus border color
          borderColor="darkblue" // Change outline color
        />
      </FormControl>

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
        Already have an account? Login
      </Button>
    </Stack>
  );
};

export default DoctorSignup;
