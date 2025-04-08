import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { jwtDecode as jwt_decode } from 'jwt-decode';

const Login = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleCredentials = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const submitHandler = async () => {
    setLoading(true);

    if (!credentials.email || !credentials.password) {
      toast({
        title: "Please Fill all the Fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
        variant: "left-accent",
      });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      const data = await response.json();

      toast({
        title: data.message,
        status: !data.success ? "error" : "success",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
        variant: !data.success ? "left-accent" : "solid",
      });

      if (data.success) {
        // Store user ID and userType in localStorage
        localStorage.setItem("user", JSON.stringify({
          userId: data._id,
          email: data.email,
          userType: data.userType,
        }));
        localStorage.setItem("userType", data.userType);
        console.log(data.user);

        setLoading(false);

        // Navigate based on user type
        if (data.userType === "Patient") {
          navigate("/patient");
        } else if (data.userType === "Doctor") {
          navigate("/doctor");
        } else {
          navigate("/yetobedone");
        }
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
        variant: "solid",
      });
    }
  };

  const handleGoogleSuccess = (response) => {
    const decoded = jwt_decode(response.credential);
    const { email } = decoded;
    const token = response.credential;

    fetch('http://localhost:5000/api/users/google-auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, token }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          toast({
            title: "Login successful!",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "bottom-right",
          });

          localStorage.setItem("user", JSON.stringify({
            userId: data._id,
            email: data.email,
            userType: data.userType,
          }));

          // Navigate based on userType
          if (data.userType === "Patient") {
            navigate("/patient");
          } else if (data.userType === "Doctor") {
            navigate("/doctor");
          } else {
            navigate("/yetobedone");
          }
        } else {
          toast({
            title: data.message,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom-right",
          });
        }
      })
      .catch(error => {
        toast({
          title: "Google Authentication Failed",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-right",
        });
      });
  };

  const handleGoogleFailure = (error) => {
    toast({
      title: "Google Sign-In failed",
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "bottom-right",
    });
  };

  const client_id = "975808440625-hnfk34mcrc68lb4349tf6cuifcsqvk0c.apps.googleusercontent.com"

  return (
    <Stack
      spacing="6"
      p="4"
      bg="rgba(255, 255, 255, 0)" // Added transparency to the background
    >
      <Stack spacing="5">
        <FormControl isRequired>
          <FormLabel htmlFor="email" color="gray.600">
            Email
          </FormLabel>
          <Input
            background="rgba(255, 255, 255, 0)" // Added transparency to the input field
            type="email"
            name="email"
            value={credentials.email}
            placeholder="Enter Your Email"
            onChange={handleCredentials}
            focusBorderColor="darkblue" // Change focus border color
            borderColor="darkblue" // Change outline color
          />
        </FormControl>
      </Stack>

      <Stack spacing="5">
        <FormControl isRequired>
          <FormLabel htmlFor="password" color="gray.600">
            Password
          </FormLabel>
          <InputGroup>
            <InputRightElement w="4.5rem">
              <Button
                h="1.75rem"
                size="sm"
                onClick={() => setShow(!show)}
                variant="ghost"
                colorScheme="blue" // Adjust button color scheme if needed
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
              background="rgba(255, 255, 255, 0)" // Added transparency to the input field
              focusBorderColor="darkblue" // Change focus border color
              borderColor="darkblue" // Change outline color
            />
          </InputGroup>
        </FormControl>
      </Stack>

      <Button
        colorScheme="blue" // Change button color scheme
        width="100%"
        mt={4}
        onClick={submitHandler}
        isLoading={loading}
        borderRadius="full"
      >
        Login
      </Button>

      {/* Google OAuth Button */}
      <GoogleOAuthProvider clientId={client_id}>
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onFailure={handleGoogleFailure}
          shape="rectangular"
          theme="outline"
        />
      </GoogleOAuthProvider>
    </Stack>
  );
};

export default Login;
