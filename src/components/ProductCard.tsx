import React from 'react';
import { Box, Typography, CardMedia, Divider } from '@mui/material';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const imagePath = product.assetPath ? `/Media/${product.assetPath}` : '';

  return (
    <Box mb={2} onClick={() => onClick(product)} sx={{ cursor: 'pointer' }}>
      <Box display="flex" alignItems="center">
        <Box flex="1">
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            {product.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ fontWeight: 'bold' }}>
            {product.currency}: {product.price}
          </Typography>
          {product.description && (
            <Typography variant="body2" color="text.secondary">
              {product.description}
            </Typography>
          )}
        </Box>
        {product.assetPath && (
          <CardMedia
            component="img"
            sx={{ width: 100, height: 100, borderRadius: '50%', marginLeft: 2 }}
            image={imagePath}
            alt={product.name}
          />
        )}
      </Box>
      <Divider sx={{ marginTop: 2 }} />
    </Box>
  );
};

export default ProductCard;
