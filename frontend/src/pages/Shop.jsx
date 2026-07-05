// src/pages/Shop.jsx
import React from 'react';
import { Box, Typography } from '@mui/material';

const Shop = () => {
  return (
    <Box sx={{ p: 8, textAlign: 'center' }}>
      <Typography variant="h3" sx={{ fontFamily: 'serif' }}>Shop Category Page</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
        This page automatically loaded under the standard top navigation bar!
      </Typography>
    </Box>
  );
};

export default Shop;