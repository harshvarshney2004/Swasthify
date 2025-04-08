import React, { useState, useEffect } from 'react';
import {
  ChakraProvider, Box, VStack, Heading, FormControl, FormLabel, Input,
  Button, Text, SimpleGrid
} from '@chakra-ui/react';
import {
  Radar
} from 'react-chartjs-2';
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
  age: '54', sex: '1', cp: '0', trestbps: '130', chol: '250',
  fbs: '0', restecg: '1', thalach: '170', exang: '0',
  oldpeak: '1.0', slope: '2', ca: '0', thal: '1'
};

const keyFields = ['age', 'trestbps', 'chol', 'thalach', 'oldpeak'];
const fieldLabels = {
  age: 'Age',
  trestbps: 'Rest BP',
  chol: 'Cholesterol',
  thalach: 'Max HR',
  oldpeak: 'Oldpeak'
};

const HeartRiskPredictionForm = () => {
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
      const response = await fetch('http://localhost:8080/predict-heart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.prediction !== undefined) {
        setPrediction(data.message);
      } else {
        setPrediction("Error: Invalid response from server");
      }
    } catch (error) {
      console.error('Error:', error);
      setPrediction("Error: Could not connect to server");
    }
  };

  const prepareRadarData = () => {
    return {
      labels: keyFields.map(k => fieldLabels[k]),
      datasets: [
        {
          label: 'Patient Input',
          data: keyFields.map(k => parseFloat(formData[k]) || 0),
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          pointBackgroundColor: 'rgba(54, 162, 235, 1)'
        }
      ]
    };
  };

  useEffect(() => {
    setRadarData(prepareRadarData());
  }, [formData]);

  return (
    <ChakraProvider>
      <Box className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <Box className="max-w-6xl mx-auto bg-white rounded-lg shadow-md overflow-hidden p-6">
          <Heading as="h2" size="lg" textAlign="center" mb={6}>
            Heart Risk Predictor
          </Heading>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
            {/* Form Section */}
            <Box>
              <form onSubmit={handleSubmit}>
                <VStack spacing={4} align="stretch">
                  {[
                    ['age', 'Age'], ['sex', 'Sex (0=F, 1=M)'], ['cp', 'Chest Pain Type (0–3)'],
                    ['trestbps', 'Resting BP'], ['chol', 'Cholesterol'], ['fbs', 'Fasting BS >120 (0/1)'],
                    ['restecg', 'RestECG (0–2)'], ['thalach', 'Max Heart Rate'], ['exang', 'Exercise Induced Angina (0/1)'],
                    ['oldpeak', 'Oldpeak'], ['slope', 'Slope (0–2)'], ['ca', 'CA (0–3)'], ['thal', 'Thal (0–3)']
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

export default HeartRiskPredictionForm;
