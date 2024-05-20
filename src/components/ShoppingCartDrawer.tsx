import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Drawer, Box, Typography, IconButton, List, ListItem, ListItemText, ListItemAvatar, Avatar, Button, useMediaQuery, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { Product } from '../types';

interface ShoppingCartDrawerProps {
  cartItems: { product: Product; quantity: number }[];
  open: boolean;
  onClose: () => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
}

const ShoppingCartDrawer: React.FC<ShoppingCartDrawerProps> = ({ cartItems, open, onClose, removeFromCart, updateQuantity }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleCheckout = () => {
    onClose();
    navigate('/cart');
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose} disableScrollLock>
      <Box sx={{ width: isSmallScreen ? '100vw' : 400, padding: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">Shopping Cart</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        {cartItems.length === 0 ? (
          <Typography>Your Shopping Cart is empty.</Typography>
        ) : (
          <List>
            {cartItems.map(({ product, quantity }) => (
              <ListItem key={product.id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <ListItemAvatar sx={{ marginRight: 2 }}>
                  <Avatar
                    src={`/Media/${product.assetPath}`}
                    alt={product.name}
                    variant="rounded"
                    sx={{ width: 56, height: 56 }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={product.name}
                  secondary={`Price: ${product.currency} ${product.price} x ${quantity}`}
                />
                <IconButton edge="end" aria-label="delete" onClick={() => removeFromCart(product.id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
        )}
        {cartItems.length > 0 && (
          <Button variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }} onClick={handleCheckout}>
            Checkout
          </Button>
        )}
      </Box>
    </Drawer>
  );
};

export default ShoppingCartDrawer;
