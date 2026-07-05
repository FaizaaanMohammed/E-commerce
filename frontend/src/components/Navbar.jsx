// src/components/Navbar.jsx
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Stack } from '@mui/material';

const Navbar = () => {
  return (
    <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: '1px solid #eaeaea', px: 4 }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h5" sx={{ fontFamily: 'serif', fontWeight: 'bold', letterSpacing: '1px' }}>
          airi.
        </Typography>
        <Stack direction="row" spacing={3}>
          <Button color="inherit">Home</Button>
          <Button color="inherit">Shop</Button>
          <Button color="inherit">Collections</Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;