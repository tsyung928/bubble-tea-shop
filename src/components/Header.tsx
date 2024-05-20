import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

interface HeaderProps {
  onDrawerOpen: () => void;
}

const Header: React.FC<HeaderProps> = ({ onDrawerOpen }) => {
  return (
    <Box 
      sx={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100%', 
        zIndex: 1000, 
        backgroundColor: 'white', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        p: 2, 
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', 
        py: 1
      }}
    >
      <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold', textAlign: 'center', flexGrow: 1}}>
        Bubble Tea Shop
      </Typography>
      <IconButton onClick={onDrawerOpen}>
        <ShoppingCartIcon />
      </IconButton>
    </Box>
  );
};

export default Header;
