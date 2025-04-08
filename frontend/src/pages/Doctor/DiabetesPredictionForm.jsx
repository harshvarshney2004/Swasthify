import React, { useState, useEffect } from 'react';
import {
  ChakraProvider, Box, VStack, Heading, FormControl, FormLabel, Input,
  Button, Text, SimpleGrid
} from '@chakra-ui/react';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const defaultFormData = {
  preg: '2',
  glucose: '120',
  bp: '70',
  skin: '20',
  insulin: '85',
  bmi: '28',
  dpf: '0.5',
  age: '30'
};

const keyFields = ['glucose', 'bp', 'insulin', 'bmi', 'age'];
const fieldLabels = {
  glucose: 'Glucose',
  bp: 'Blood Pressure',
  insulin: 'Insulin',
  bmi: 'BMI',
  age: 'Age'
};

const DiabetesPredictionForm = () => {
  const [formData, setFormData] = useState(defaultFormData);
  const [prediction, setPrediction] = useState('');
  const [radarData, setRadarData] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/predict_diabetes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setPrediction(`Prediction: ${data.label}`);
    } catch (error) {
      console.error('Error:', error);
      setPrediction("Error: Unable to connect to backend");
    }
  };

  const prepareRadarData = () => ({
    labels: keyFields.map(k => fieldLabels[k]),
    datasets: [
      {
        label: 'Patient Input',
        data: keyFields.map(k => parseFloat(formData[k]) || 0),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        pointBackgroundColor: 'rgba(255, 99, 132, 1)'
      }
    ]
  });

  useEffect(() => {
    setRadarData(prepareRadarData());
  }, [formData]);

  return (
    <ChakraProvider>
      <Box className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <Box className="max-w-6xl mx-auto bg-white rounded-lg shadow-md overflow-hidden p-6">
          <Heading as="h2" size="lg" textAlign="center" mb={6}>
            Diabetes Risk Predictor
          </Heading>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
            {/* Form Section */}
            <Box>
              <form onSubmit={handleSubmit}>
                <VStack spacing={4} align="stretch">
                  {[
                    ['preg', 'Number of Pregnancies'], ['glucose', 'Glucose Level'], ['bp', 'Blood Pressure'],
                    ['skin', 'Skin Thickness'], ['insulin', 'Insulin Level'], ['bmi', 'BMI'],
                    ['dpf', 'Diabetes Pedigree Function'], ['age', 'Age']
                  ].map(([field, label]) => (
                    <FormControl key={field}>
                      <FormLabel htmlFor={field}>{label}</FormLabel>
                      <Input
                        type="number"
                        name={field}
                        id={field}
                        value={formData[field]}
                        onChange={handleInputChange}
                        required
                      />
                    </FormControl>
                  ))}
                  <Button type="submit" colorScheme="blue" width="full">
                    Predict
                  </Button>
                </VStack>
              </form>

              {prediction && (
                <Text mt={6} fontWeight="bold" textAlign="center" fontSize="lg">
                  {prediction}
                </Text>
              )}
            </Box>

            {/* Radar Chart Section */}
            <Box>
              <Heading as="h3" size="md" mb={4}>
                Radar Chart of Key Features
              </Heading>
              {radarData ? (
                <Radar data={radarData} />
              ) : (
                <Text color="gray.500">Loading chart...</Text>
              )}
            </Box>
          </SimpleGrid>
        </Box>
      </Box>
    </ChakraProvider>
  );
};

export default DiabetesPredictionForm;
