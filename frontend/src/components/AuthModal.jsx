import React, { useState } from 'react';
import { 
  Box, Typography, Button, Stack, IconButton, Modal, Fade, Backdrop, TextField, Alert 
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import endpoints from '../Auth/endpoints';
import api from '../Auth/AxiosInstance';



const AuthModal = ({ open, handleClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState(''); // रजिस्ट्रेशन सक्सेस मैसेज के लिए

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errorMsg) setErrorMsg(''); 
  };

  const handleTabSwitch = () => {
    setIsLogin(!isLogin);
    setErrorMsg('');
    setSuccessMsg('');
    setFormData({ name: '', email: '', password: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    const activeEndpoint = isLogin 
      ? endpoints.authentication.login 
      : endpoints.authentication.register;

    const payload = isLogin 
      ? { email: formData.email, password: formData.password }
      : { name: formData.name, email: formData.email, password: formData.password , role:"user" };

    try {
      const response = await api.post(activeEndpoint, payload);
      const data = response.data;

      if (isLogin) {
        // --- LOGIN FLOW ---
        if (data.token) localStorage.setItem('token', data.token);
        if (data.user) localStorage.setItem('nexus_user', JSON.stringify(data.user));

        handleClose();
        setFormData({ name: '', email: '', password: '' });
        navigate('/profile');
      } else {
        // --- REGISTER FLOW ---
        // टोकन सेव नहीं करेंगे और न ही रीडायरेक्ट करेंगे
        setSuccessMsg('Registration successful! Please verify your email first.');
        setIsLogin(true); // यूज़र को वापस लॉगिन टैब पर भेज दो
        setFormData({ name: '', email: formData.email, password: '' }); // ईमेल भरा हुआ छोड़ दो ताकि लॉगिन आसान हो
      }

    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Authentication flow failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{ backdrop: { timeout: 400 } }}
    >
      <Fade in={open}>
        <Box 
          component="form"
          onSubmit={handleSubmit}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '92%', sm: '420px' },
            bgcolor: '#FAF8F5', 
            border: '1px solid #EDEDED',
            p: { xs: 4, sm: 5 },
            boxShadow: '0px 20px 50px rgba(0,0,0,0.08)',
            boxSizing: 'border-box',
            zIndex: 1300,
            borderRadius: 0
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', mb: 4 }}>
            <Box>
              <Typography sx={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#A57C5A', fontWeight: 700, mb: 0.5, fontFamily: 'Montserrat, sans-serif' }}>
                NEXUS OS. GATEWAY
              </Typography>
              <Typography variant="h4" sx={{ fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 400, color: '#1A1A1A' }}>
                {isLogin ? 'Sign In' : 'Join Us'}
              </Typography>
            </Box>
            <IconButton onClick={handleClose} sx={{ color: '#1A1A1A', p: 0, '&:hover': { color: '#9C2B2B' } }}>
              <CloseIcon sx={{ fontSize: '20px' }} />
            </IconButton>
          </Box>

          <AnimatePresence>
            {/* Error Message Alert */}
            {errorMsg && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <Alert 
                  severity="error" 
                  sx={{ 
                    borderRadius: 0, mb: 3, fontSize: '12px', fontFamily: 'Montserrat, sans-serif', 
                    bgcolor: '#FFEBEE', color: '#C62828', '& .MuiAlert-icon': { color: '#C62828' }
                  }}
                >
                  {errorMsg}
                </Alert>
              </motion.div>
            )}

            {/* Success Message Alert (यहाँ दिखेगा) */}
            {successMsg && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <Alert 
                  severity="success" 
                  sx={{ 
                    borderRadius: 0, mb: 3, fontSize: '12px', fontFamily: 'Montserrat, sans-serif', 
                    bgcolor: '#E8F5E9', color: '#2E7D32', '& .MuiAlert-icon': { color: '#2E7D32' }
                  }}
                >
                  {successMsg}
                </Alert>
              </motion.div>
            )}
          </AnimatePresence>
          
          <Stack spacing={3}>
            {!isLogin && (
              <TextField 
                required
                fullWidth 
                label="Full Name" 
                name="name"
                variant="standard" 
                value={formData.name}
                onChange={handleInputChange}
                slotProps={{
                  input: { sx: { borderRadius: 0, fontSize: '13px', fontFamily: 'Montserrat, sans-serif' } },
                  inputLabel: { sx: { fontSize: '13px', fontFamily: 'Montserrat, sans-serif', '&.Mui-focused': { color: '#1A1A1A' } } }
                }}
              />
            )}
            
            <TextField 
              required
              fullWidth 
              label="Email Address" 
              name="email"
              type="email"
              variant="standard" 
              value={formData.email}
              onChange={handleInputChange}
              slotProps={{
                input: { sx: { borderRadius: 0, fontSize: '13px', fontFamily: 'Montserrat, sans-serif' } },
                inputLabel: { sx: { fontSize: '13px', fontFamily: 'Montserrat, sans-serif', '&.Mui-focused': { color: '#1A1A1A' } } }
              }}
            />
            
            <TextField 
              required
              fullWidth 
              label="Password" 
              name="password"
              type="password" 
              variant="standard" 
              value={formData.password}
              onChange={handleInputChange}
              slotProps={{
                input: { sx: { borderRadius: 0, fontSize: '13px', fontFamily: 'Montserrat, sans-serif' } },
                inputLabel: { sx: { fontSize: '13px', fontFamily: 'Montserrat, sans-serif', '&.Mui-focused': { color: '#1A1A1A' } } }
              }}
            />
            
            <Button 
              fullWidth 
              type="submit"
              disabled={loading}
              variant="contained" 
              sx={{
                backgroundColor: '#1A1A1A', 
                color: '#fff', 
                borderRadius: 0, 
                py: 1.8, 
                mt: 2, 
                fontFamily: 'Montserrat, sans-serif', 
                fontWeight: 600,
                fontSize: '11px',
                letterSpacing: '0.15em',
                boxShadow: 'none',
                '&:hover': { backgroundColor: '#A57C5A', boxShadow: 'none' },
                '&:disabled': { backgroundColor: '#EDEDED', color: '#A3A3A3' }
              }}
            >
              {loading ? 'Processing...' : (isLogin ? 'Access Studio' : 'Create Account')}
            </Button>

            <Typography 
              variant="body2" 
              onClick={handleTabSwitch}
              sx={{ 
                fontFamily: 'Montserrat, sans-serif', 
                fontSize: '11px',
                letterSpacing: '0.05em',
                textAlign: 'center', 
                mt: 2, 
                cursor: 'pointer', 
                textTransform: 'uppercase',
                color: 'text.secondary',
                textDecoration: 'underline', 
                transition: '0.2s',
                '&:hover': { color: '#A57C5A' } 
              }}
            >
              {isLogin ? "New to Studio? Join Here" : 'Existing Member? Access Portal'}
            </Typography>
          </Stack>
        </Box>
      </Fade>
    </Modal>
  );
};

export default AuthModal;