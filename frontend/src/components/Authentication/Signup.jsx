import {
  Stack,
  Select,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";
import Patient from "./UserBasedSignUp/Patient";
import Doctor from "./UserBasedSignUp/Doctor";

const Signup = ({ switchToLogin }) => {
  const [userType, setuserType] = useState("");

  return (
    <Stack
      spacing="6"
      maxWidth="xl"
      margin="auto"
      padding={4}
      bg="rgba(255, 255, 255, 0)" // Set transparent background
      // borderRadius="md"
      // boxShadow="md"
      overflow="hidden" // Ensure the container does not overflow
    >
      <Select
        placeholder='Select role'
        background="rgba(255, 255, 255, 0)" // Set transparent background for Select
        onChange={(event) => setuserType(event?.target?.value)}
      >
        <option value='Patient'>Patient</option>
        <option value='Doctor'>Doctor</option>
      </Select>
      <Box
        maxHeight="60vh" // Set a maximum height for the content
        overflowY="auto" // Enable vertical scrolling
        padding={4}
      >
        {userType === "Patient" && <Patient switchToLogin={switchToLogin}/>}
        {userType === "Doctor" && <Doctor switchToLogin={switchToLogin}/>}
      </Box>
    </Stack>
  );
};

export default Signup;
