import React from 'react';
import { Box, Typography, Paper, Button, IconButton, useMediaQuery, useTheme } from '@mui/material';
import { Product } from '../../types';
import QuantityControl from '../QuantityControl';
import DeleteIcon from '@mui/icons-material/Delete';

interface ShoppingCartReviewProps {
  cartItems: { product: Product; quantity: number }[];
  handleNext: () => void;
  handleBackToProducts: () => void;
  updateQuantity: (productId: number, quantity: number) => void;
  removeFromCart: (productId: number) => void;
}

const ShoppingCartReview: React.FC<ShoppingCartReviewProps> = ({
  cartItems,
  handleNext,
  handleBackToProducts,
  updateQuantity,
  removeFromCart
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const totalAmount = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);

  return (
    <Box sx={{mb:2}}>
      <Typography variant="h6">
        Shopping Cart ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
      </Typography>
      {cartItems.map((item) => (
        <Paper key={item.product.id} sx={{ mb: 2, p: 2 }}>
          <Box display="flex" flexDirection={isSmallScreen ? 'column' : 'row'} alignItems={isSmallScreen ? 'flex-start' : 'center'}>
            <Box sx={{ width: isSmallScreen ? '100%' : '15%', mb: isSmallScreen ? 2 : 0, mr: isSmallScreen ? 0 : 2 }}>
              <img src={`/Media/${item.product.assetPath}`} alt={item.product.name} style={{ width: '100%' }} />
            </Box>
            <Box sx={{ flexGrow: 1, minWidth: '200px', mb: isSmallScreen ? 2 : 0 }}>
              <Typography variant="body1">{item.product.name}</Typography>
              <Typography variant="body2">Price: {item.product.currency} {item.product.price}</Typography>
              <Typography variant="body2">Quantity: {item.quantity}</Typography>
            </Box>
            <Box display="flex"  alignItems="center" sx={{ width: isSmallScreen ? '100%' : 'auto' }}>
              <QuantityControl
                quantity={item.quantity}
                onQuantityChange={(newQuantity) => updateQuantity(item.product.id, newQuantity)}
              />
              <IconButton onClick={() => removeFromCart(item.product.id)} sx={{ ml: isSmallScreen ? 2 : 0 }}>
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
        </Paper>
      ))}
      <Box mt={4}>
        <Typography variant="h6" align="right">
          Total Amount: HKD {totalAmount}
        </Typography>
      </Box>
      <Box display="flex" justifyContent="space-between" mt={4}>
        <Button variant="outlined" onClick={handleBackToProducts}>
          Back to Products
        </Button>
        <Button variant="contained" color="primary" onClick={handleNext}>
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default ShoppingCartReview;
