import { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useToast,
  Textarea,
} from "@chakra-ui/react";
import axios from "axios";

const DoctorProfile = () => {
  const [doctorProfile, setDoctorProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formValues, setFormValues] = useState({
    hospitals: [],
    colleges: [],
  });
  const toast = useToast();
  const userId = JSON.parse(localStorage.getItem("user"))?.userId;

  useEffect(() => {
    if (userId) {
      fetchDoctorProfile();
    }
  }, [userId]);

  const fetchDoctorProfile = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/users/doctors/getprofile/${userId}`);
      if (data.success) {
        setDoctorProfile(data.data);
        setFormValues(data.data); // Set form values for editing
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Failed to fetch profile",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleListChange = (name, index, value) => {
    const newList = [...formValues[name]];
    newList[index] = value;
    setFormValues((prev) => ({
      ...prev,
      [name]: newList,
    }));
  };

  const addCollege = () => {
    setFormValues((prev) => ({
      ...prev,
      colleges: [...prev.colleges, { name: "", degree: "" }],
    }));
  };

  const addHospital = () => {
    setFormValues((prev) => ({
      ...prev,
      hospitals: [...prev.hospitals, ""],
    }));
  };

  const removeCollege = (index) => {
    const newColleges = formValues.colleges.filter((_, i) => i !== index);
    setFormValues((prev) => ({
      ...prev,
      colleges: newColleges,
    }));
  };

  const removeHospital = (index) => {
    const newHospitals = formValues.hospitals.filter((_, i) => i !== index);
    setFormValues((prev) => ({
      ...prev,
      hospitals: newHospitals,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/users/doctors/updateprofile/${userId}`, formValues);
      if (response.data.success) {
        toast({
          title: "Profile updated successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom-right",
        });
        setDoctorProfile(response.data.data);
        setIsEditing(false);
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Failed to update profile",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      });
    }
  };

  return (
    <Stack spacing={4} p={4}>
      {doctorProfile ? (
        <>
          <FormControl isReadOnly={!isEditing}>
            <FormLabel>Name</FormLabel>
            <Input
              name="name"
              value={formValues.name || ""}
              onChange={handleChange}
              readOnly={!isEditing}
            />
          </FormControl>
          <FormControl isReadOnly={!isEditing}>
            <FormLabel>Specialization</FormLabel>
            <Input
              name="specialization"
              value={formValues.specialization || ""}
              onChange={handleChange}
              readOnly={!isEditing}
            />
          </FormControl>
          <FormControl isReadOnly={!isEditing}>
            <FormLabel>Years of Experience</FormLabel>
            <Input
              name="yearsOfExperience"
              type="number"
              value={formValues.yearsOfExperience || ""}
              onChange={handleChange}
              readOnly={!isEditing}
            />
          </FormControl>
          <FormControl isReadOnly={!isEditing}>
            <FormLabel>Phone</FormLabel>
            <Input
              name="phone"
              value={formValues.phone || ""}
              onChange={handleChange}
              readOnly={!isEditing}
            />
          </FormControl>
          <FormControl isReadOnly={!isEditing}>
            <FormLabel>Clinic Address</FormLabel>
            <Textarea
              name="clinicAddress"
              value={formValues.clinicAddress || ""}
              onChange={handleChange}
              readOnly={!isEditing}
            />
          </FormControl>
          <FormControl isReadOnly={!isEditing}>
            <FormLabel>Bio</FormLabel>
            <Textarea
              name="bio"
              value={formValues.bio || ""}
              onChange={handleChange}
              readOnly={!isEditing}
            />
          </FormControl>
          <FormControl isReadOnly={!isEditing}>
            <FormLabel>Qualifications</FormLabel>
            <Input
              name="qualifications"
              value={formValues.qualifications || ""}
              onChange={handleChange}
              readOnly={!isEditing}
            />
          </FormControl>
          <FormControl isReadOnly={!isEditing}>
            <FormLabel>Availability</FormLabel>
            <Input
              name="availability"
              value={formValues.availability || ""}
              onChange={handleChange}
              readOnly={!isEditing}
            />
          </FormControl>
          {/* <FormControl isReadOnly={!isEditing}>
            <FormLabel>Profile Image URL</FormLabel>
            <Input
              name="profileImage"
              value={formValues.profileImage || ""}
              onChange={handleChange}
              readOnly={!isEditing}
            />
          </FormControl> */}
          <FormControl isReadOnly={!isEditing}>
            <FormLabel>Consultation Fee</FormLabel>
            <Input
              name="consultationFee"
              type="number"
              value={formValues.consultationFee || ""}
              onChange={handleChange}
              readOnly={!isEditing}
            />
          </FormControl>
          <FormControl isReadOnly={!isEditing}>
            <FormLabel>Awards</FormLabel>
            <Input
              name="awards"
              value={formValues.awards.join(", ") || ""}
              onChange={handleChange}
              readOnly={!isEditing}
            />
          </FormControl>
          <FormControl isReadOnly={!isEditing}>
            <FormLabel>Languages Spoken</FormLabel>
            <Input
              name="languagesSpoken"
              value={formValues.languagesSpoken.join(", ") || ""}
              onChange={handleChange}
              readOnly={!isEditing}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Hospitals</FormLabel>
            {formValues.hospitals.map((hospital, index) => (
              <Stack key={index} direction="row" spacing={2}>
                <Input
                  value={hospital}
                  onChange={(e) => handleListChange("hospitals", index, e.target.value)}
                  readOnly={!isEditing}
                />
                {isEditing && (
                  <Button onClick={() => removeHospital(index)} colorScheme="red">
                    Remove
                  </Button>
                )}
              </Stack>
            ))}
            {isEditing && (
              <Button onClick={addHospital} colorScheme="teal" mt={2}>
                Add Hospital
              </Button>
            )}
          </FormControl>
          <FormControl>
            <FormLabel>Colleges</FormLabel>
            {formValues.colleges.map((college, index) => (
              <Stack key={index} direction="row" spacing={2}>
                <Input
                  value={college.name}
                  placeholder="College Name"
                  onChange={(e) => handleListChange("colleges", index, { ...college, name: e.target.value })}
                  readOnly={!isEditing}
                />
                <Input
                  value={college.degree}
                  placeholder="Degree"
                  onChange={(e) => handleListChange("colleges", index, { ...college, degree: e.target.value })}
                  readOnly={!isEditing}
                />
                {isEditing && (
                  <Button onClick={() => removeCollege(index)} colorScheme="red">
                    Remove
                  </Button>
                )}
              </Stack>
            ))}
            {isEditing && (
              <Button onClick={addCollege} colorScheme="teal" mt={2}>
                Add College
              </Button>
            )}
          </FormControl>
          {isEditing ? (
            <Button colorScheme="blue" onClick={handleSave}>
              Save
            </Button>
          ) : (
            <Button colorScheme="blue" onClick={() => setIsEditing(true)}>
              Edit Profile
            </Button>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </Stack>
  );
};

export default DoctorProfile;
