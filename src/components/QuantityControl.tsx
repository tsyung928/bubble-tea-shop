import React from 'react';
import { Box, IconButton, TextField } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

interface QuantityControlProps {
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
}

const QuantityControl: React.FC<QuantityControlProps> = ({ quantity, onQuantityChange }) => {
  const handleIncrement = () => {
    onQuantityChange(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    if (value >= 1) {
      onQuantityChange(value);
    }
  };

  return (
    <Box display="flex" alignItems="center">
      <IconButton onClick={handleDecrement}>
        <RemoveIcon />
      </IconButton>
      <TextField
        value={quantity}
        onChange={handleChange}
        inputProps={{ style: { textAlign: 'center' } }}
        sx={{ width: '50px', mx: 1 }}
      />
      <IconButton onClick={handleIncrement}>
        <AddIcon />
      </IconButton>
    </Box>
  );
};

export default QuantityControl;