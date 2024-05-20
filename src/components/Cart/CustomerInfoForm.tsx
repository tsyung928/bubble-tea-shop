import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';

interface CustomerInfoFormProps {
  customerInfo: {
    name: string;
    contactNumber: string;
    remarks: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleNext: () => void;
  handleBack: () => void;
}

const CustomerInfoForm: React.FC<CustomerInfoFormProps> = ({ customerInfo, handleInputChange, handleNext, handleBack }) => {
  const [contactNumberError, setContactNumberError] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);
  const [isNextDisabled, setIsNextDisabled] = useState(true);

  const validateContactNumber = (contactNumber: string) => {
    const phoneNumberPattern = /^[0-9]*$/;
    return phoneNumberPattern.test(contactNumber);
  };

  const handleInputChangeWithValidation = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    handleInputChange(e);
    if (name === 'contactNumber') {
      if (value.trim() === '') {
        setContactNumberError('Contact number cannot be empty.');
      } else if (!validateContactNumber(value)) {
        setContactNumberError('Contact number must contain only numbers.');
      } else {
        setContactNumberError(null);
      }
    }
    if (name === 'name') {
      if (value.trim() === '') {
        setNameError('Name cannot be empty.');
      } else {
        setNameError(null);
      }
    }
  };

  useEffect(() => {
    if (
      customerInfo.name.trim() !== '' &&
      customerInfo.contactNumber.trim() !== '' &&
      !contactNumberError &&
      !nameError
    ) {
      setIsNextDisabled(false);
    } else {
      setIsNextDisabled(true);
    }
  }, [customerInfo, contactNumberError, nameError]);

  const handleNextClick = () => {
    if (!isNextDisabled) {
      handleNext();
    }
  };

  return (
    <Box>
      <Typography variant="h6">Fill Information</Typography>
      <Box display="flex" flexDirection="column" gap={2} mt={2}>
        <TextField
          name="name"
          label="Name *"
          fullWidth
          value={customerInfo.name}
          onChange={handleInputChangeWithValidation}
          error={!!nameError}
          helperText={nameError}
        />
        <TextField
          name="contactNumber"
          label="Contact Number *"
          fullWidth
          value={customerInfo.contactNumber}
          onChange={handleInputChangeWithValidation}
          error={!!contactNumberError}
          helperText={contactNumberError}
        />
        <TextField
          name="remarks"
          label="Remarks for Shop"
          fullWidth
          multiline
          rows={4}
          value={customerInfo.remarks}
          onChange={handleInputChange}
        />
      </Box>
      <Box display="flex" justifyContent="space-between" mt={4}>
        <Button variant="outlined" onClick={handleBack}>
          Back
        </Button>
        <Button variant="contained" color="primary" onClick={handleNextClick} disabled={isNextDisabled}>
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default CustomerInfoForm;
