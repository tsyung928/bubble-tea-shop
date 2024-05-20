import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Stepper, Step, StepLabel, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Product } from '../types';
import ShoppingCartReview from './Cart/ShoppingCartReview';
import CustomerInfoForm from './Cart/CustomerInfoForm';
import OrderConfirmation from './Cart/OrderConfirmation';

interface CartProps {
  cartItems: { product: Product; quantity: number }[];
  setCartItems: React.Dispatch<React.SetStateAction<{ product: Product; quantity: number }[]>>; 
}

const Cart: React.FC<CartProps> = ({ cartItems, setCartItems }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    contactNumber: '',
    remarks: '',
  });
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  const navigate = useNavigate();

  const steps = ['Shopping Cart', 'Fill Information', 'Order Confirmation'];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCustomerInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handlePlaceOrder = () => {
    setIsOrderPlaced(true);
  };

  const handleDialogClose = () => {
    setIsOrderPlaced(false);
    setCartItems([]); 
    navigate('/'); 
  };

  const updateQuantity = (productId: number, quantity: number) => {
    setCartItems((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId: number) => {
    setCartItems((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <ShoppingCartReview 
            cartItems={cartItems} 
            handleNext={handleNext} 
            handleBackToProducts={() => navigate('/')}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
          />
        );
      case 1:
        return (
          <CustomerInfoForm
            customerInfo={customerInfo}
            handleInputChange={handleInputChange}
            handleNext={handleNext}
            handleBack={handleBack}
          />
        );
      case 2:
        return (
          <OrderConfirmation
            cartItems={cartItems}
            customerInfo={customerInfo}
            handleBack={handleBack}
            handlePlaceOrder={handlePlaceOrder}
          />
        );
      default:
        return <Typography variant="body1">Unknown step</Typography>;
    }
  };

  return (
    <Container>
      <Box mt={4}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box mt={4}>{renderStepContent(activeStep)}</Box>
      </Box>
      <Dialog open={isOrderPlaced} onClose={handleDialogClose}>
        <DialogTitle>Order Successful</DialogTitle>
        <DialogContent>
          <Typography>Your order has been placed successfully.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">OK</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Cart;
