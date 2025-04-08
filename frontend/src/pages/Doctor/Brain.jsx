import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Alert,
  AlertIcon,
  AlertDescription,
  Text,
  VStack,
  Spinner,
  Heading,
} from '@chakra-ui/react';
import { Upload } from 'lucide-react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const ImageUpload = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      setFile(selectedFile);
      setError('');
      setResult(null);
    } else {
      setFile(null);
      setError('Please select a valid image file.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select an image to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:8080/predict_hemorrhage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const data = response.data;
      setResult({
        healthy: (data[0][0] || 0) * 100,
        hemorrhage: (data[0][1] || 0) * 100,
      });
      setError('');
    } catch (error) {
      setError('Error during prediction. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const pieData = result
    ? [
        { name: 'Healthy', value: result.healthy },
        { name: 'Possible Hemorrhage', value: result.hemorrhage },
      ]
    : [];

  const COLORS = ['#4CAF50', '#F44336'];

  return (
    <Box maxW="3xl" mx="auto" p={6}>
      <Box p={8} shadow="xl" borderWidth="1px" borderRadius="2xl" bg="white">
        <Heading as="h2" size="xl" textAlign="center" mb={6}>
          Brain Hemorrhage Detection
        </Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={6}>
            <FormControl>
              <FormLabel htmlFor="dropzone-file" textAlign="center">
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  borderWidth="2px"
                  borderRadius="2xl"
                  borderColor="gray.300"
                  borderStyle="dashed"
                  p={10}
                  bg="gray.50"
                  cursor="pointer"
                  _hover={{ bg: 'gray.100' }}
                  minHeight="150px"
                  textAlign="center"
                >
                  <Upload size={32} style={{ marginRight: 12 }} />
                  <Text fontSize="lg">Click to upload or drag and drop an image</Text>
                </Box>
                <Input
                  id="dropzone-file"
                  type="file"
                  display="none"
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </FormLabel>
              {file && (
                <Text fontSize="md" color="gray.600" mt={2}>
                  Selected file: <strong>{file.name}</strong>
                </Text>
              )}
            </FormControl>
            {error && (
              <Alert status="error" borderRadius="md">
                <AlertIcon />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Button
              type="submit"
              width="full"
              colorScheme="blue"
              size="lg"
              isDisabled={!file || isLoading}
            >
              {isLoading ? <Spinner size="sm" mr={2} /> : 'Upload and Predict'}
            </Button>
          </VStack>
        </form>

        {result && (
          <Box mt={10} p={6} bg="gray.100" borderRadius="2xl">
            <Heading as="h3" size="lg" mb={4}>
              Prediction Result:
            </Heading>
            <Text fontSize="lg" mb={2}>
              <strong>Healthy:</strong> {result.healthy.toFixed(2)}%
            </Text>
            <Text fontSize="lg" mb={6}>
              <strong>Possible Hemorrhage:</strong> {result.hemorrhage.toFixed(2)}%
            </Text>

            <Box display="flex" justifyContent="center">
              <PieChart width={400} height={400}>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={140}
                  dataKey="value"
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ImageUpload;
