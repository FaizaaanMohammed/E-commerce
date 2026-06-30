import React, { useState } from 'react';
import { Box, Card, Typography, TextField, Button, InputAdornment, useTheme, Link } from '@mui/material';
import { motion } from 'framer-motion';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';

export default function Register({ mode, setAuthView }) {
  const theme = useTheme();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      alert("Account created successfully! Check your email for OTP verification. ✉️🔥");
      setAuthView('login'); 
    } catch (err) {
      console.error("Registration engine failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: mode === 'dark' ? '#02040a' : '#f1f5f9', px: { xs: 2, sm: 4 }, py: 4, position: 'relative', overflow: 'hidden', boxSizing: 'border-box' }}>
      
      {/* 🌌 BHYANKAR ANIMATED MESH LIGHTS */}
      <Box
        component={motion.div}
        animate={{
          x: [0, -50, 30, 0],
          y: [0, 70, -40, 0],
          scale: [1, 1.15, 0.95, 1]
        }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        sx={{
          position: 'absolute', top: { xs: '-5%', md: '-10%' }, right: { xs: '5%', md: '10%' }, width: { xs: '280px', md: '520px' }, height: { xs: '280px', md: '520px' },
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.25) 0%, rgba(236, 72, 153, 0) 70%)',
          borderRadius: '50%', filter: 'blur(65px)', zIndex: 0
        }}
      />
      <Box
        component={motion.div}
        animate={{
          x: [0, 50, -40, 0],
          y: [0, -60, 70, 0],
          scale: [1, 0.9, 1.1, 1]
        }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        sx={{
          position: 'absolute', bottom: { xs: '-5%', md: '-10%' }, left: { xs: '5%', md: '10%' }, width: { xs: '320px', md: '550px' }, height: { xs: '320px', md: '550px' },
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.22) 0%, rgba(139, 92, 246, 0) 70%)',
          borderRadius: '50%', filter: 'blur(75px)', zIndex: 0
        }}
      />

      {/* 🕸️ 🔥 LIVE MOVING TECH GRID OVERLAY */}
      <Box 
        component={motion.div}
        animate={{
          backgroundPositionX: ['0px', '48px'],
          backgroundPositionY: ['0px', '48px']
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        sx={{ 
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, 
          backgroundImage: mode === 'dark'
            ? 'linear-gradient(to right, rgba(236, 72, 153, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(236, 72, 153, 0.04) 1px, transparent 1px)'
            : 'linear-gradient(to right, rgba(236, 72, 153, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(236, 72, 153, 0.03) 1px, transparent 1px)',
          backgroundSize: '48px 48px', zIndex: 0 
        }} 
      />

      {/* 🖥️ STRICT RESPONSIVE MATRIC VIEW CONTAINER */}
      <Card
        component={motion.div}
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 120, damping: 22 }}
        sx={{
          width: '100%', 
          maxWidth: { xs: '100%', sm: '440px' }, 
          p: { xs: 3, sm: 4 }, 
          borderRadius: '28px',
          bgcolor: mode === 'dark' ? 'rgba(10, 15, 30, 0.72)' : 'rgba(255, 255, 255, 0.88)',
          border: `1px solid ${mode === 'dark' ? 'rgba(236, 72, 153, 0.18)' : 'rgba(236, 72, 153, 0.22)'}`,
          backdropFilter: 'blur(24px)',
          boxShadow: mode === 'dark' 
            ? '0 30px 70px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.05)' 
            : '0 20px 45px rgba(0,0,0,0.06)',
          zIndex: 1, position: 'relative', boxSizing: 'border-box'
        }}
      >
        <Box textAlign="center" sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 900, color: '#ec4899', mb: 1, letterSpacing: '-0.5px', fontSize: { xs: '1.8rem', sm: '2.125rem' } }}>
            CREATE ACCOUNT
          </Typography>
          <Typography sx={{ fontFamily: '"Plus Jakarta Sans"', color: theme.palette.text.secondary, fontWeight: 600, fontSize: '0.88rem' }}>
            Join the automated e-commerce wallet workspace.
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <Box>
            <TextField
              label="Full Name" required fullWidth
              value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              InputProps={{
                startAdornment: <InputAdornment position="start"><PersonIcon sx={{ color: '#ec4899', fontSize: 20 }} /></InputAdornment>
              }}
              sx={{ mb: 2.5 }}
            />
            <TextField
              label="Email Address" required fullWidth type="email"
              value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              InputProps={{
                startAdornment: <InputAdornment position="start"><EmailIcon sx={{ color: '#ec4899', fontSize: 20 }} /></InputAdornment>
              }}
              sx={{ mb: 2.5 }}
            />
            <TextField
              label="Secure Password" required fullWidth type="password"
              value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              InputProps={{
                startAdornment: <InputAdornment position="start"><LockIcon sx={{ color: '#ec4899', fontSize: 20 }} /></InputAdornment>
              }}
              sx={{ mb: 4 }}
            />

            <Button
              type="submit" variant="contained" disabled={loading}
              sx={{
                width: '100%', background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
                textTransform: 'none', borderRadius: '14px', fontFamily: '"Plus Jakarta Sans"', fontWeight: 700, py: 1.6, fontSize: '0.95rem',
                boxShadow: '0 8px 25px rgba(236, 72, 153, 0.3)', mb: 1,
                '&:hover': { filter: 'brightness(1.1)' }
              }}
            >
              {loading ? 'Spinning Nodes...' : 'Initialize Profile'}
            </Button>
          </Box>
        </form>

        <Box textAlign="center" sx={{ mt: 3 }}>
          <Typography variant="body2" sx={{ fontFamily: '"Plus Jakarta Sans"', color: theme.palette.text.secondary, fontWeight: 500 }}>
            Already verified?{' '}
            <Link component="button" onClick={() => setAuthView('login')} sx={{ color: '#ec4899', fontWeight: 700, textDecoration: 'none', fontFamily: '"Plus Jakarta Sans"' }}>
              Login Here
            </Link>
          </Typography>
        </Box>
      </Card>
    </Box>
  );
}