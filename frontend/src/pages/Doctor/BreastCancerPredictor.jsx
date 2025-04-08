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

// Just the mean, se, worst values of 10 features (scaled)
const radarFields = [
  'radius', 'texture', 'perimeter', 'area',
  'smoothness', 'compactness', 'concavity',
  'concave_points', 'symmetry', 'fractal_dimension'
];

const suffixes = ['mean', 'se', 'worst'];

const BreastCancerPredictor = () => {
  const [formData, setFormData] = useState(() => {
    const initial = {};
    suffixes.forEach(suffix => {
      radarFields.forEach(field => {
        const key = `${field}_${suffix}`;
        initial[key] = '';
      });
    });
    return initial;
  });

  const [prediction, setPrediction] = useState(null);
  const [probabilities, setProbabilities] = useState({});
  const [radarData, setRadarData] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/predict_breast_cancer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setPrediction(data.label);
      setProbabilities(data.probabilities);
    } catch (error) {
      console.error('Prediction error:', error);
    }
  };

  useEffect(() => {
    const prepareRadarData = () => {
      const datasets = suffixes.map((suffix, index) => ({
        label: suffix.charAt(0).toUpperCase() + suffix.slice(1),
        data: radarFields.map(field => parseFloat(formData[`${field}_${suffix}`]) || 0),
        backgroundColor: `rgba(${index * 60 + 60}, 99, 132, 0.2)`,
        borderColor: `rgba(${index * 60 + 60}, 99, 132, 1)`,
        pointBackgroundColor: `rgba(${index * 60 + 60}, 99, 132, 1)`,
        fill: true
      }));

      return {
        labels: radarFields.map(f => f.charAt(0).toUpperCase() + f.replace('_', ' ').slice(1)),
        datasets
      };
    };

    setRadarData(prepareRadarData());
  }, [formData]);

  return (
    <ChakraProvider>
      <Box className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <Box className="max-w-6xl mx-auto bg-white rounded-lg shadow-md overflow-hidden p-6">
          <Heading as="h2" size="lg" textAlign="center" mb={6}>
            Breast Cancer Predictor
          </Heading>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
            {/* Input Form */}
            <Box>
              <form onSubmit={handleSubmit}>
                <VStack spacing={4} align="stretch">
                  {suffixes.map(suffix => (
                    <Box key={suffix}>
                      <Heading size="sm" mb={2} textTransform="capitalize">
                        {suffix.replace('_', ' ')} Values
                      </Heading>
                      {radarFields.map(field => {
                        const key = `${field}_${suffix}`;
                        return (
                          <FormControl key={key}>
                            <FormLabel htmlFor={key}>
                              {field.replace('_', ' ')}
                            </FormLabel>
                            <Input
                              type="number"
                              step="any"
                              id={key}
                              name={key}
                              value={formData[key]}
                              onChange={handleInputChange}
                              required
                            />
                          </FormControl>
                        );
                      })}
                    </Box>
                  ))}
                  <Button type="submit" colorScheme="pink" width="full">
                    Predict
                  </Button>
                </VStack>
              </form>

              {prediction && (
                <Box mt={6} textAlign="center">
                  <Text fontSize="xl" fontWeight="bold">
                    Prediction: <span style={{ color: prediction === 'Benign' ? 'green' : 'red' }}>{prediction}</span>
                  </Text>
                  <Text>Benign Probability: {probabilities.benign}</Text>
                  <Text>Malignant Probability: {probabilities.malignant}</Text>
                </Box>
              )}
            </Box>

            {/* Radar Chart */}
            <Box>
              <Heading as="h3" size="md" mb={4}>
                Radar Chart of Cell Nuclei Measurements
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

export default BreastCancerPredictor;
