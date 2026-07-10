// src/components/QuickViewModal.jsx
import React from 'react';
import { Box, Modal, Fade, Backdrop, Typography, Stack, IconButton, Button, Rating,Grid } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const QuickViewModal = ({ open, handleClose, product }) => {
  if (!product) return null;

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{ backdrop: { timeout: 400 } }}
    >
      <Fade in={open}>
        <Box sx={{
          position: 'absolute',
          top: {md:'50%',xs:"70%"},
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', md: '800px' },
          bgcolor: '#f8f6f3',
          border: '1px solid #d5cfc6',
          p: { xs: 3, md: 5 },
          boxShadow: 24,
          boxSizing: 'border-box',
          zIndex: 1400
        }}>
          {/* Close Action Trigger */}
          <IconButton onClick={handleClose} sx={{ position: 'absolute', top: 15, right: 15, color: '#111' }}>
            <CloseIcon />
          </IconButton>

          <Grid container spacing={2} disableEqualOverflow>
            {/* Left Side: Main Product Image preview */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Box component="img" src={product.images[0]} alt={product.tittle} sx={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover' }} />
            </Grid>

            {/* Right Side: Metadata specs */}
            <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Typography variant="h4" sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 600, mb: 1, fontSize: '26px' }}>{product.title}</Typography>
              
              {product.rating > 0 && (
                <Rating value={product.rating} precision={0.5} readOnly sx={{ fontSize: '16px', color: '#111', mb: 2 }} />
              )}

              <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
                <Typography sx={{ fontFamily: 'Montserrat', fontWeight: 600, fontSize: '18px', color: '#111' }}>${product.price}</Typography>
                <Typography sx={{ fontFamily: 'Montserrat', fontSize: '15px', color: '#888', textDecoration: 'line-through' }}>${product.price}</Typography>
              </Stack>

              <Typography variant="body2" sx={{ fontFamily: 'Montserrat', color: '#555', lineHeight: 1.6, mb: 2 }}>
               {product?.description}
              </Typography>
              <Typography variant="body2" sx={{ fontFamily: 'Montserrat', color: '#555', lineHeight: 1.6, mb: 2 }}>
               Stock : {product?.stock}
              </Typography>

              <Button variant="outlined" sx={{ borderColor: '#111', color: '#111', borderRadius: 0, py: 1.5, fontFamily: 'Montserrat', fontWeight: 600, '&:hover': { bgcolor: '#111', color: '#fff', borderColor: '#111' } }}>
                Add To Cart
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Fade>
    </Modal>
  );
};

// Internal minimal grid patch for the detached component layout routing wrapper
const Grid2 = ({ children, container, size, sx, ...props }) => (
  <Box sx={{ display: container ? 'flex' : 'block', flexWrap: 'wrap', ...sx }} {...props}>
    {container ? children : <Box sx={{ width: size?.md ? `${(size.md / 12) * 100}%` : '100%', p: 1, boxSizing: 'border-box' }}>{children}</Box>}
  </Box>
);

export default QuickViewModal;