import React, { useEffect, useState } from 'react';
import {
  Box,
  Text,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  useToast,
  Flex,
  Avatar,
  Tooltip,
  Heading,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import axios from 'axios';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [appointmentTime, setAppointmentTime] = useState('');
  const toast = useToast();

  // Fetch doctorId from local storage after successful login
  const doctor = JSON.parse(localStorage.getItem('user'));
  const doctorId = doctor.userId;

  useEffect(() => {
    if (doctorId) {
      fetchPendingAppointments();
    }
  }, [doctorId]);

  const fetchPendingAppointments = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/appointments/pending/${doctorId}`
      );
      setAppointments(response.data);
    } catch (error) {
      toast({
        title: 'Error fetching appointments',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom-right',
      });
    }
  };

  const handleStatusUpdate = async (appointmentId, status) => {
    if (status === 'Accepted') {
      setSelectedAppointment(appointmentId);
      setIsOpen(true);
    } else {
      updateStatus(appointmentId, status);
    }
  };

  const updateStatus = async (appointmentId, status) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/appointments/${appointmentId}`,
        { status }
      );
      toast({
        title: `Appointment ${status}`,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom-right',
      });
      fetchPendingAppointments(); // Refresh appointments after status update
    } catch (error) {
      toast({
        title: 'Error updating status',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom-right',
      });
    }
  };

  const handleAcceptAppointment = async () => {
    try {
      await axios.patch(
        `http://localhost:5000/api/appointments/${selectedAppointment}`,
        { status: 'Accepted', appointmentTime } // Include appointment time
      );
      toast({
        title: 'Appointment Accepted',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom-right',
      });
      fetchPendingAppointments(); // Refresh appointments after accepting
      closeModal();
    } catch (error) {
      toast({
        title: 'Error accepting appointment',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom-right',
      });
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedAppointment(null);
    setAppointmentTime('');
  };

  return (
    <Box p={8} bg="gray.50" minH="100vh">
      <Heading mb={6} fontSize="2xl" fontWeight="bold" textAlign="center">
        Pending Appointments
      </Heading>
      <TableContainer borderRadius="md" bg="white" boxShadow="lg" p={4}>
        <Table variant="unstyled">
          <Thead>
            <Tr>
              <Th fontWeight="bold" fontSize="md" color="gray.700" textAlign="left">Patient</Th>
              <Th fontWeight="bold" fontSize="md" color="gray.700" textAlign="left">Appointment Date</Th>
              <Th fontWeight="bold" fontSize="md" color="gray.700" textAlign="left">Reason</Th>
              <Th fontWeight="bold" fontSize="md" color="gray.700" textAlign="left">Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {appointments.length === 0 ? (
              <Tr>
                <Td colSpan={4}>
                  <Text textAlign="center" py={4} color="gray.500">
                    No pending appointments
                  </Text>
                </Td>
              </Tr>
            ) : (
              appointments.map((appointment) => (
                <Tr key={appointment._id} _hover={{ bg: 'gray.50' }}>
                  <Td>
                    <Flex align="center">
                      <Avatar
                        src={appointment.patientDetails?.profileImage}
                        name={appointment.patientDetails.name}
                        size="md"
                        mr={4}
                      />
                      <Box>
                        <Text fontWeight="bold" fontSize="md">
                          {appointment.patientDetails.name}
                        </Text>
                        <Text fontSize="sm" color="gray.600">
                          {appointment.patientDetails.gender}, {appointment.patientDetails.age} years
                        </Text>
                      </Box>
                    </Flex>
                  </Td>
                  <Td>
                    <Tooltip label={new Date(appointment.appointmentDate).toLocaleTimeString()} hasArrow>
                      <Text fontSize="md">
                        {new Date(appointment.appointmentDate).toLocaleDateString()}
                      </Text>
                    </Tooltip>
                  </Td>
                  <Td>
                    <Text noOfLines={2} fontSize="md" wordBreak="break-word">
                      {appointment.reason}
                    </Text>
                  </Td>
                  <Td>
                    <Stack direction="row" spacing={3}>
                      <Button
                        size="sm"
                        variant="outline"
                        colorScheme="green"
                        onClick={() => handleStatusUpdate(appointment._id, 'Accepted')}
                      >
                        Accept
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        colorScheme="red"
                        onClick={() => handleStatusUpdate(appointment._id, 'Rejected')}
                      >
                        Reject
                      </Button>
                    </Stack>
                  </Td>
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
      </TableContainer>

      {/* Modal for accepting appointment */}
      <Modal isOpen={isOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Accept Appointment</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="appointment-time" isRequired>
              <FormLabel>Appointment Time</FormLabel>
              <Input
                type="time"
                value={appointmentTime}
                onChange={(e) => setAppointmentTime(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleAcceptAppointment}>
              Accept
            </Button>
            <Button variant="ghost" onClick={closeModal}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Appointments;
