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

const ImageUploadClassifier = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      setFile(selectedFile);
      setError('');
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
    formData.append('image', file);

    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:8080/classify', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setResult({
        disease: response.data.disease,
        confidence: response.data.confidence,
      });
      setError('');
    } catch (error) {
      setError('Error classifying the image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const pieData = result
    ? [
        { name: result.disease, value: result.confidence },
        { name: 'Other', value: 100 - result.confidence },
      ]
    : [];

  const COLORS = ['#0088FE', '#FF8042'];

  return (
    <Box maxW="3xl" mx="auto" p={6}>
      <Box p={8} shadow="xl" borderWidth="1px" borderRadius="2xl" bg="white">
        <Heading as="h2" size="xl" textAlign="center" mb={6}>
          Skin Disease Classification
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
              {isLoading ? <Spinner size="sm" mr={2} /> : 'Upload and Classify'}
            </Button>
          </VStack>
        </form>

        {result && (
          <Box mt={10} p={6} bg="gray.100" borderRadius="2xl">
            <Heading as="h3" size="lg" mb={4}>
              Classification Result:
            </Heading>
            <Text fontSize="lg" mb={2}>
              <strong>Disease:</strong> {result.disease}
            </Text>
            <Text fontSize="lg" mb={6}>
              <strong>Confidence:</strong> {result.confidence.toFixed(2)}%
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

export default ImageUploadClassifier;