import React from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import { Product } from '../../types';

interface OrderConfirmationProps {
  cartItems: { product: Product; quantity: number }[];
  customerInfo: {
    name: string;
    contactNumber: string;
    remarks: string;
  };
  handleBack: () => void;
  handlePlaceOrder: () => void;
}

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({ cartItems, customerInfo, handleBack, handlePlaceOrder }) => {
  const totalAmount = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const remarks = customerInfo.remarks.trim() === '' ? 'N/A' : customerInfo.remarks;

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6">Order Confirmation</Typography>
      <Typography variant="body1">Review your order details before confirming.</Typography>
      {cartItems.map((item) => (
        <Paper key={item.product.id} sx={{ mb: 2, p: 2 }}>
          <Box display="flex" alignItems="center">
            <Box sx={{ width: '15%', mr: 2 }}>
              <img src={`/Media/${item.product.assetPath}`} alt={item.product.name} style={{ width: '100%' }} />
            </Box>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="body1">{item.product.name}</Typography>
              <Typography variant="body2">Price: HKD {item.product.price}</Typography>
              <Typography variant="body2">Quantity: {item.quantity}</Typography>
            </Box>
          </Box>
        </Paper>
      ))}
      <Box mt={2}>
        <Typography variant="body1"><strong>Full Name:</strong> {customerInfo.name}</Typography>
        <Typography variant="body1"><strong>Contact Number:</strong> {customerInfo.contactNumber}</Typography>
        <Typography variant="body1"><strong>Remarks for Shop:</strong> {remarks}</Typography>
        <Typography variant="h6" align="right" mt={2}>
          Total Amount: HKD {totalAmount}
        </Typography>
      </Box>
      <Box display="flex" justifyContent="space-between" mt={4}>
        <Button variant="outlined" onClick={handleBack}>
          Back
        </Button>
        <Button variant="contained" color="primary" onClick={handlePlaceOrder}>
          Place Order
        </Button>
      </Box>
    </Box>
  );
};

export default OrderConfirmation;
