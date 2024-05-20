import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import ProductCard from './ProductCard';
import { Product } from '../types';

interface ProductListProps {
  products: Product[];
  onProductClick: (product: Product) => void;
}

const formatLabel = (label: string) => {
  return label
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

const ProductList: React.FC<ProductListProps> = ({ products, onProductClick }) => {

    const groupedProducts = products.reduce((acc: { [key: string]: Product[] }, product) => {
    product.labels.forEach((label) => {
      if (!acc[label]) {
        acc[label] = [];
      }
      acc[label].push(product);
    });
    return acc;
  }, {});

  const sortedLabels = Object.keys(groupedProducts).sort((a, b) => {
    if (a === 'popular') return -1;
    if (b === 'popular') return 1;
    return a.localeCompare(b);
  });

  return (
    <Box>
      {sortedLabels.map((label) => (
        <Box key={label} mb={4}>
          <Typography
            variant="h6"
            component="h2"
            gutterBottom
            sx={{ fontWeight: 'bold', color: 'text.secondary', textTransform: 'none', letterSpacing: 0.5 }}
          >
            {formatLabel(label)}
          </Typography>
          <Divider sx={{ mb: 2 }} />
          {groupedProducts[label].map((product) => (
            <ProductCard key={product.id} product={product} onClick={onProductClick} />
          ))}
        </Box>
      ))}
    </Box>
  );
};

export default ProductList;
