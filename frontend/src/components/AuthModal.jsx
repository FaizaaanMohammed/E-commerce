// src/components/AuthModal.jsx
import React, { useState } from 'react';
import { Box, Typography, Button, Stack, IconButton, Modal, Fade, Backdrop, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const AuthModal = ({ open, handleClose }) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{ backdrop: { timeout: 500 } }}
    >
      <Fade in={open}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', sm: '400px' },
          bgcolor: '#f8f6f3',
          border: '1px solid #111',
          p: 5,
          boxShadow: 24,
          boxSizing: 'border-box',
          zIndex: 1300
        }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Typography variant="h5" sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 700 }}>
              {isLogin ? 'Login' : 'Sign Up'}
            </Typography>
            <IconButton onClick={handleClose} sx={{ color: '#111', p: 0 }}>
              <CloseIcon />
            </IconButton>
          </Box>
          
          <Stack spacing={2.5}>
            {!isLogin && (
              <TextField fullWidth label="Full Name" variant="standard" InputLabelProps={{ style: { fontFamily: 'Montserrat' } }} inputProps={{ style: { fontFamily: 'Montserrat' } }} />
            )}
            <TextField fullWidth label="Email Address" variant="standard" InputLabelProps={{ style: { fontFamily: 'Montserrat' } }} inputProps={{ style: { fontFamily: 'Montserrat' } }} />
            <TextField fullWidth label="Password" type="password" variant="standard" InputLabelProps={{ style: { fontFamily: 'Montserrat' } }} inputProps={{ style: { fontFamily: 'Montserrat' } }} />
            
            <Button 
              fullWidth 
              variant="outlined" 
              sx={{
                borderColor: '#111', color: '#111', borderRadius: 0, py: 1.5, mt: 2, fontFamily: 'Montserrat', fontWeight: 600,
                '&:hover': { backgroundColor: '#111', color: '#fff', borderColor: '#111' }
              }}
            >
              {isLogin ? 'Sign In' : 'Register'}
            </Button>

            <Typography 
              variant="body2" 
              onClick={() => setIsLogin(!isLogin)}
              sx={{ fontFamily: 'Montserrat', textAlign: 'center', mt: 2, cursor: 'pointer', textDecoration: 'underline', '&:hover': { color: '#cda587' } }}
            >
              {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
            </Typography>
          </Stack>
        </Box>
      </Fade>
    </Modal>
  );
};

export default AuthModal;