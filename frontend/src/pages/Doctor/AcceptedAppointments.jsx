import React, { useEffect, useState } from 'react';
import {
  Box,
  Text,
  Button,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  Textarea,
  useDisclosure,
  Flex,
  VStack,
  HStack,
  Avatar,
  Card,
  CardBody,
  Collapse,
  Divider,
  ScaleFade, // For smooth animation
  SlideFade, // For smooth animation
  useBreakpointValue, // Responsive values
} from '@chakra-ui/react';
import { FiPlus, FiEye, FiLink } from 'react-icons/fi';
import axios from 'axios';

const DoctorAcceptedAppointments = () => {
  const [acceptedAppointments, setAcceptedAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [meetLink, setMeetLink] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [medicines, setMedicines] = useState([{ name: '', timesPerDay: '', days: '' }]);
  const [isDetailsOpen, setDetailsOpen] = useState(false);
  const { isOpen: isMeetOpen, onOpen: onMeetOpen, onClose: onMeetClose } = useDisclosure();

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const doctor = JSON.parse(localStorage.getItem('user'));
  const doctorId = doctor.userId;

  useEffect(() => {
    if (doctorId) {
      fetchAcceptedAppointments();
    }
  }, [doctorId]);

  const fetchAcceptedAppointments = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/appointments/accepted/doctor/${doctorId}`
      );
      setAcceptedAppointments(response.data);
    } catch (error) {
      toast({
        title: 'Error fetching accepted appointments',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom-right',
      });
    }
  };

  const openPrescriptionForm = (appointment) => {
    setSelectedAppointment(appointment);
    setSymptoms('');
    setMedicines([{ name: '', timesPerDay: '', days: '' }]);
    onOpen();
  };

  const addMedicine = () => {
    setMedicines([...medicines, { name: '', timesPerDay: '', days: '' }]);
  };

  const updateMedicine = (index, field, value) => {
    const updatedMedicines = medicines.map((medicine, i) => {
      if (i === index) {
        return { ...medicine, [field]: value };
      }
      return medicine;
    });
    setMedicines(updatedMedicines);
  };

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:8080/prescription-summary', {
        appointmentId: selectedAppointment._id,
        symptoms,
        medicines,
      });
      toast({
        title: 'Prescription submitted successfully!',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom-right',
      });
      onClose();
    } catch (error) {
      toast({
        title: 'Error submitting prescription',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom-right',
      });
    }
  };

  const handleMeetLink = async (appointmentId) => {
    try {
      const response = await axios.patch(`http://localhost:5000/api/appointments/update/${appointmentId}`, {
        meetLink: meetLink,
      });
      toast({
        title: 'Meet link updated successfully!',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom-right',
      });
      fetchAcceptedAppointments(); // Refresh the appointments after updating
      onMeetClose();
    } catch (error) {
      toast({
        title: 'Error updating meet link',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom-right',
      });
    }
  };  

  const openMeetModal = (appointment) => {
    setSelectedAppointment(appointment);
    setMeetLink(appointment.meetLink || ''); // Set the existing meet link if available
    onMeetOpen();
  };
  const toggleDetails = (appointment) => {
    setSelectedAppointment(appointment);
    setDetailsOpen(!isDetailsOpen);
  };

  return (
    <Box p={8} bg="gray.100" minH="100vh">
      <Text fontSize="2xl" fontWeight="bold" mb={4} textAlign="center">
        Accepted Appointments
      </Text>
      <VStack spacing={6}>
        {acceptedAppointments.length === 0 ? (
          <Text>No accepted appointments found</Text>
        ) : (
          acceptedAppointments.map((appointment) => (
            <Card key={appointment._id} boxShadow="lg" borderRadius="lg" p={4} w="full">
              <Flex justifyContent="space-between" alignItems="center">
                <Flex alignItems="center">
                  <Avatar
                    src={appointment.patientDetails?.profileImage}
                    name={appointment.patientDetails?.name}
                    size="2xl"
                    mr={8} // Increased margin to create more space
                  />
                  <VStack align="start" spacing={4}>
                    <HStack spacing={6}>
                      <VStack align="start">
                        <Text fontWeight="bold">Name:</Text>
                        <Text>{appointment.patientDetails?.name}</Text>
                      </VStack>
                      <VStack align="start">
                        <Text fontWeight="bold">Date:</Text>
                        <Text>{new Date(appointment.appointmentDate).toLocaleDateString()}</Text>
                      </VStack>
                      <VStack align="start">
                        <Text fontWeight="bold">Time:</Text>
                        <Text>{new Date(appointment.appointmentDate).toLocaleTimeString()}</Text>
                      </VStack>
                      <VStack align="start">
                        <Text fontWeight="bold">Reason:</Text>
                        <Text>{appointment.reason}</Text>
                      </VStack>
                      <VStack>
                      </VStack>
                    </HStack>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toggleDetails(appointment)}
                      transition="all 0.3s ease"
                      _hover={{ bg: 'gray.200' }}
>
  {/* Keep the button text visible regardless of the details state */}
  {isDetailsOpen && selectedAppointment?._id === appointment._id ? 'Hide Details' : 'View Details'}
</Button>
                  </VStack>
                </Flex>

                {/* Action buttons on the right */}
                <Flex direction="column" alignItems="flex-start">
                  <HStack spacing={8} mb={4}>
                    <VStack alignItems="flex-start" spacing={1}>
                      {/* <Text fontWeight="bold">Meet</Text> */}
                      <Button leftIcon={<FiLink />} size="sm" variant="solid" colorScheme="blue" onClick={() => openMeetModal(appointment)}>
                        {appointment.meetLink ? 'Join Meet' : 'Add Link'}
                      </Button>
                    </VStack>

                    <VStack alignItems="flex-start" spacing={1}>
                      {/* <Text fontWeight="bold">Prescriptions</Text> */}
                      <Button
                        leftIcon={<FiPlus />}
                        size="sm"
                        variant="solid"
                        colorScheme="green"
                        onClick={() => openPrescriptionForm(appointment)}
                      >
                        {appointment.prescription ? 'View  Prescription' : 'Add Prescription'}
                      </Button>
                    </VStack>

                    <VStack alignItems="flex-start" spacing={1}>
                      {/* <Text fontWeight="bold">Report</Text> */}
                      <Button leftIcon={<FiEye />} size="sm" variant="solid" colorScheme="purple">
                        View Report
                      </Button>
                    </VStack>
                  </HStack>
                </Flex>
              </Flex>

              {/* Details Collapse with Animation */}
              <Collapse in={isDetailsOpen && selectedAppointment?._id === appointment._id} animateOpacity>
                <Divider my={4} />
                <CardBody>
                  <Text fontSize="lg" fontWeight="medium" mb={2}>
                    Patient Details:
                  </Text>
                  <Text><strong>Gender:</strong> {appointment.patientDetails?.gender || 'Not provided'}</Text>
                  <Text><strong>Age:</strong> {appointment.patientDetails?.age || 'Not provided'} Years</Text>
                  <Text><strong>Medical History:</strong> {appointment.patientDetails?.medicalHistory || 'Not provided'}</Text>
                  <Text><strong>Current Medications:</strong> {appointment.patientDetails?.currentMedications || 'Not provided'}</Text>
                  <Text><strong>Allergies:</strong> {appointment.patientDetails?.allergies || 'Not provided'}</Text>
                </CardBody>
              </Collapse>
            </Card>
          ))
        )}
      </VStack>

      {/* Modal for Prescription Form */}
      <Modal size="xl" isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent borderRadius="2xl" boxShadow="lg" bg="white" p={6}>
          <ModalHeader fontSize="2xl" fontWeight="bold">Add Prescription for {selectedAppointment?.patientDetails?.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea
              placeholder="Symptoms"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              mb={4}
              borderColor="gray.300"
              focusBorderColor="blue.400"
              borderRadius="lg"
              size="lg"
            />

            {medicines.map((medicine, index) => (
              <HStack key={index} mb={4}>
                <Input
                  placeholder="Medicine Name"
                  value={medicine.name}
                  onChange={(e) => updateMedicine(index, 'name', e.target.value)}
                  borderColor="gray.300"
                  focusBorderColor="blue.400"
                  borderRadius="lg"
                  size="lg"
                />
                <Input
                  placeholder="Times per Day"
                  value={medicine.timesPerDay}
                  onChange={(e) => updateMedicine(index, 'timesPerDay', e.target.value)}
                  borderColor="gray.300"
                  focusBorderColor="blue.400"
                  borderRadius="lg"
                  size="lg"
                />
                <Input
                  placeholder="Days"
                  value={medicine.days}
                  onChange={(e) => updateMedicine(index, 'days', e.target.value)}
                  borderColor="gray.300"
                  focusBorderColor="blue.400"
                  borderRadius="lg"
                  size="lg"
                />
              </HStack>
            ))}

            <Button
              colorScheme="blue"
              variant="outline"
              onClick={addMedicine}
              leftIcon={<FiPlus />}
              mb={4}
            >
              Add Medicine
            </Button>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSubmit}>
              Submit Prescription
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={isMeetOpen} onClose={onMeetClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Meet Link</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Enter Meet Link"
              value={meetLink}
              onChange={(e) => setMeetLink(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={() => handleMeetLink(selectedAppointment._id)}>
              Save Link
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default DoctorAcceptedAppointments;
