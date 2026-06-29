import React, { useState, useEffect } from 'react';
import { Box, Card, Typography, useTheme, Button, TextField, InputAdornment } from '@mui/material';
import Grid from '@mui/material/Grid'; 
import { motion } from 'framer-motion';
import SaveIcon from '@mui/icons-material/Save';
import SendIcon from '@mui/icons-material/Send';
import LanguageIcon from '@mui/icons-material/Language';
import StarsIcon from '@mui/icons-material/Stars';

export default function WalletSettings({ mode }) {
  const theme = useTheme();

  const [loading, setLoading] = useState(false);
  const [conversionRate, setConversionRate] = useState(100); 
  const [rewardRate, setRewardRate] = useState(10); 
  const [airDrop, setAirDrop] = useState({ email: '', coins: '' });

  return (
    <Box component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} sx={{ width: '100%', pb: 4 }}>
      
      {/* Header Panel */}
      <Box sx={{ mb: 5 }}>
        <Typography variant="h3" sx={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 800, color: theme.palette.text.primary, mb: 0.5, letterSpacing: '-1px' }}>
          Wallet Configuration Engine
        </Typography>
        <Typography variant="body1" sx={{ fontFamily: '"Plus Jakarta Sans", sans-serif', color: theme.palette.text.secondary, fontWeight: 500 }}>
          Manage global token exchange math, cashback reward algorithms, and manual credit protocols
        </Typography>
      </Box>

      {/* 🎯 BOTH CARDS EQUALLY DIVIDED INTO 6-6 GRID SIZE */}
      <Grid container spacing={4} alignItems="stretch">
        
        {/* ⚙️ LEFT PANEL: GLOBAL SYSTEM RULES (Size 6) */}
        <Grid item xs={12} md={6}>
          <Card component="form" sx={{ bgcolor: mode === 'dark' ? '#0f172a' : '#ffffff', border: `1px solid ${mode === 'dark' ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0,0,0,0.06)'}`, borderRadius: '24px', p: 4, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Box>
              <Typography variant="h5" sx={{ fontFamily: '"Plus Jakarta Sans"', fontWeight: 800, mb: 4, color: theme.palette.text.primary }}>
                Global Economy Control
              </Typography>

              <Box display="flex" flexDirection="column" gap={4}>
                <Box>
                  <Typography variant="body2" sx={{ fontFamily: '"Plus Jakarta Sans"', fontWeight: 700, mb: 1, color: theme.palette.text.secondary }}>
                    Coin-to-Rupee Base Exchange Rate
                  </Typography>
                  <TextField
                    fullWidth type="number" value={conversionRate}
                    onChange={(e) => setConversionRate(Number(e.target.value))}
                    helperText={`Current Rule: ${conversionRate || 0} Loyalty Coins = ₹1 spendable cash.`}
                    InputProps={{
                      startAdornment: <InputAdornment position="start"><LanguageIcon sx={{ color: '#eab308' }} /></InputAdornment>,
                      endAdornment: <InputAdornment position="end" sx={{ fontFamily: '"Space Grotesk"', fontWeight: 700 }}>= ₹1.00</InputAdornment>
                    }}
                  />
                </Box>

                <Box>
                  <Typography variant="body2" sx={{ fontFamily: '"Plus Jakarta Sans"', fontWeight: 700, mb: 1, color: theme.palette.text.secondary }}>
                    Order Purchase Reward Multiplier
                  </Typography>
                  <TextField
                    fullWidth type="number" value={rewardRate}
                    onChange={(e) => setRewardRate(Number(e.target.value))}
                    helperText={`Current Rule: Users earn ${rewardRate || 0} Reward Coins per ₹100 spent.`}
                    InputProps={{
                      startAdornment: <InputAdornment position="start"><StarsIcon sx={{ color: '#06b6d4' }} /></InputAdornment>,
                      endAdornment: <InputAdornment position="end" sx={{ fontFamily: '"Space Grotesk"', fontWeight: 700 }}>Coins / ₹100</InputAdornment>
                    }}
                  />
                </Box>
              </Box>
            </Box>

            <Button
              type="submit" variant="contained" startIcon={<SaveIcon />}
              disabled={loading}
              sx={{
                mt: 4, background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
                textTransform: 'none', borderRadius: '14px', fontFamily: '"Plus Jakarta Sans"', fontWeight: 700, py: 1.5, fontSize: '0.95rem'
              }}
            >
              {loading ? 'Updating System...' : 'Apply Global Core Rules'}
            </Button>
          </Card>
        </Grid>

        {/* 🪙 RIGHT PANEL: MANUAL COIN AIR-DROP TOOL (Size 6) */}
        <Grid item xs={12} md={6}>
          <Card component="form" sx={{ bgcolor: mode === 'dark' ? '#0f172a' : '#ffffff', border: `1px solid ${mode === 'dark' ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0,0,0,0.06)'}`, borderRadius: '24px', p: 4, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Box>
              <Typography variant="h5" sx={{ fontFamily: '"Plus Jakarta Sans"', fontWeight: 800, mb: 1, color: theme.palette.text.primary }}>
                Manual Coin Air-Drop
              </Typography>
              <Typography variant="body2" sx={{ fontFamily: '"Plus Jakarta Sans"', color: theme.palette.text.secondary, fontWeight: 500, mb: 4 }}>
                Manually distribute loyalty tokens directly into a specific customer's virtual wallet.
              </Typography>

              <Box display="flex" flexDirection="column" gap={4}>
                <TextField
                  label="Target User Email Address" required fullWidth type="email"
                  value={airDrop.email} onChange={(e) => setAirDrop({ ...airDrop, email: e.target.value })}
                  InputLabelProps={{ style: { fontFamily: '"Plus Jakarta Sans"' } }}
                />
                <TextField
                  label="Coin Quantity to Deposit" required fullWidth type="number"
                  value={airDrop.coins} onChange={(e) => setAirDrop({ ...airDrop, coins: Number(e.target.value) })}
                  InputLabelProps={{ style: { fontFamily: '"Plus Jakarta Sans"' } }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><StarsIcon sx={{ color: '#eab308' }} /></InputAdornment>
                  }}
                  sx={{marginTop:"20px"}}
                />
              </Box>
            </Box>

            <Button
              type="submit" variant="contained" endIcon={<SendIcon />}
              sx={{
                mt: 4, background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
                textTransform: 'none', borderRadius: '14px', fontFamily: '"Plus Jakarta Sans"', fontWeight: 700, py: 1.5, fontSize: '0.95rem',
                boxShadow: '0 8px 20px rgba(236, 72, 153, 0.25)'
              }}
            >
              Trigger System Air-Drop
            </Button>
          </Card>
        </Grid>

      </Grid>
    </Box>
  );
}