import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box, CardMedia } from '@mui/material';
import { Product } from '../types';
import QuantityControl from './QuantityControl';

interface ProductModalProps {
  product: Product | null;
  open: boolean;
  onClose: () => void;
  addToCart: (product: Product, quantity: number) => void;
  cartItems: { product: Product; quantity: number }[]; 
}

const ProductModal: React.FC<ProductModalProps> = ({ product, open, onClose, addToCart, cartItems }) => {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (product) {
      const cartItem = cartItems.find((item) => item.product.id === product.id);
      setQuantity(cartItem ? cartItem.quantity : 1);
    }
  }, [product, cartItems]);

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{product.name}</DialogTitle>
      <DialogContent>
        {product.assetPath && (
          <CardMedia
            component="img"
            image={`/Media/${product.assetPath}`}
            alt={product.name}
            sx={{ width: '100%', borderRadius: '8px', marginBottom: 2 }}
          />
        )}
        <Typography variant="body1">{product.description}</Typography>
        <Typography variant="h6" sx={{ fontWeight: 'bold', marginTop: 2 }}>Price: {product.currency} {product.price}</Typography>
        <Box sx={{ marginTop: 2 }}>
          <QuantityControl 
            quantity={quantity} 
            onQuantityChange={(newQuantity) => setQuantity(newQuantity)} 
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancel</Button>
        <Button onClick={handleAddToCart} color="primary">Add to Cart</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductModal;
