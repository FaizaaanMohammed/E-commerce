import React, { useState } from 'react';
import { 
  Container, Typography, Grid, Button, Box, Divider, 
  TextField, Stack, Card, CardContent, Paper, List, ListItem, ListItemText
} from '@mui/material';

// Standard Direct Imports for zero compilation issues
import WalletIcon from '@mui/icons-material/WalletOutlined';
import PermIdentityIcon from '@mui/icons-material/PermIdentityOutlined';
import OrderIcon from '@mui/icons-material/ShoppingBagOutlined';
import CoinIcon from '@mui/icons-material/LocalActivityOutlined';
import EditIcon from '@mui/icons-material/EditOutlined';
import LogoutIcon from '@mui/icons-material/LogoutOutlined';

const Profile = () => {
  const [profileData, setProfileData] = useState({
    name: "Faizan",
    email: "faizan@nexusos.com",
    phone: "+91 9876543210",
    address: "Kolkata, West Bengal, India"
  });

  const [isEditing, setIsEditing] = useState(false);

  // Coins Settings: 100 Coins = 1 INR
  const userCoinsBalance = 50000;
  const coinsCashValue = userCoinsBalance / 100;

  const recentOrders = [
    { id: "NEX-2026-9021", date: "July 10, 2026", status: "Processing", total: "₹4,298" },
    { id: "NEX-2026-8940", date: "June 28, 2026", status: "Delivered", total: "₹1,499" }
  ];

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleLogout = () => {
    // Apni logout logic ya routing yahan handle kar lena bhai
    console.log("Logged out successfully");
  };

  return (
    <Box sx={{ bgcolor: '#FBF9F6', minHeight: '100vh', py: { xs: 6, md: 10 }, fontFamily: 'Montserrat, sans-serif' }}>
      <Container maxWidth="xl">
        
        {/* Header Section */}
        <Box sx={{ mb: { xs: 6, md: 8 }, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <Typography sx={{ fontSize: '11px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#A57C5A', fontWeight: 600, mb: 1.5, fontFamily: 'Montserrat, sans-serif' }}>
            NEXUS OS. MEMBER STUDIO
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: 400, color: '#1A1A1A', fontSize: { xs: '2.2rem', sm: '2.8rem', md: '3.2rem' }, fontFamily: 'Playfair Display, Georgia, serif', letterSpacing: '-0.01em' }}>
            My Account
          </Typography>
        </Box>

        {/* Clean Responsive Multi-column Grid Layout */}
        <Grid container spacing={{ xs: 4, md: 5 }}>
          
          {/* Left Block: Wallet & Analytics summary */}
          <Grid item xs={12} md={4} size={{xs:12,md:4}}>
            <Stack spacing={3}>
              
              {/* Refined Card Design */}
              <Card sx={{ bgcolor: '#1A1A1A', color: 'white', borderRadius: 0, boxShadow: 'none', border: '1px solid #1A1A1A' }}>
                <CardContent sx={{ p: 4 }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 4 }}>
                    <Box>
                      <Typography sx={{ fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', fontWeight: 600, fontFamily: 'Montserrat, sans-serif' }}>
                        NEXUS WALLET
                      </Typography>
                      <Typography variant="h4" sx={{ fontFamily: 'Playfair Display, Georgia, serif', mt: 1.5, fontWeight: 500 }}>
                        {userCoinsBalance.toLocaleString()} <span style={{ fontSize: '15px', fontFamily: 'Montserrat, sans-serif', color: '#A57C5A', fontWeight: 500 }}>Coins</span>
                      </Typography>
                    </Box>
                    <Box sx={{ color: '#A57C5A', display: 'flex', mt: 0.5 }}>
                      <CoinIcon sx={{ fontSize: 26 }} />
                    </Box>
                  </Stack>

                  <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', my: 2.5 }} />
                  
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Box>
                      <Typography sx={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', fontFamily: 'Montserrat, sans-serif' }}>Cash Equivalence</Typography>
                      <Typography sx={{ fontSize: '18px', fontWeight: 600, mt: 0.5, fontFamily: 'Montserrat, sans-serif', color: 'white' }}>₹{coinsCashValue.toLocaleString()}</Typography>
                    </Box>
                    <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '10px', letterSpacing: '0.05em', fontWeight: 500, fontFamily: 'Montserrat, sans-serif' }}>
                      100 COINS = ₹1
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>

              {/* Membership Block without messy boxes */}
              <Box sx={{ border: '1px solid #EDEDED', p: 3.5, bgcolor: 'white' }}>
                <Typography sx={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', mb: 1, color: '#1A1A1A', fontFamily: 'Montserrat, sans-serif' }}>STUDIO CLUB PERKS</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '13px', lineHeight: 1.6, fontFamily: 'Montserrat, sans-serif' }}>
                  As an elite store curator, your wallet tokens map directly onto live invoices during final checkout execution workflows.
                </Typography>
              </Box>

            </Stack>
          </Grid>

          {/* Right Block: Account Profile Details Form */}
          <Grid item xs={12} md={8} size={{xs:12,md:8}}>
            <Stack spacing={4}>
              
              {/* Premium Form Container */}
              <Paper sx={{ border: '1px solid #EDEDED', borderRadius: 0, boxShadow: 'none', p: { xs: 3, md: 4.5 }, bgcolor: 'white' }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4.5 }}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Box sx={{ color: '#1A1A1A', display: 'flex' }}>
                      <PermIdentityIcon sx={{ fontSize: 24 }} />
                    </Box>
                    <Typography sx={{ fontSize: '16px', fontWeight: 600, color: '#1A1A1A', fontFamily: 'Montserrat, sans-serif', letterSpacing: '0.02em' }}>
                      Personal Details
                    </Typography>
                  </Stack>
                  {!isEditing && (
                    <Button 
                      startIcon={<EditIcon sx={{ fontSize: '14px !important' }} />} 
                      onClick={() => setIsEditing(true)}
                      sx={{ color: '#1A1A1A', fontSize: '12px', fontWeight: 600, letterSpacing: '0.05em', fontFamily: 'Montserrat, sans-serif' }}
                    >
                      Edit Profile
                    </Button>
                  )}
                </Stack>

                {/* Structured Fields Grid */}
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField 
                      fullWidth 
                      disabled={!isEditing}
                      label="Full Name" 
                      value={profileData.name}
                      onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      slotProps={{ input: { sx: { borderRadius: 0, fontSize: '13px', fontFamily: 'Montserrat, sans-serif' } }, inputLabel: { sx: { fontSize: '13px', fontFamily: 'Montserrat, sans-serif' } } }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField 
                      fullWidth 
                      disabled={!isEditing}
                      label="Email Address" 
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      slotProps={{ input: { sx: { borderRadius: 0, fontSize: '13px', fontFamily: 'Montserrat, sans-serif' } }, inputLabel: { sx: { fontSize: '13px', fontFamily: 'Montserrat, sans-serif' } } }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField 
                      fullWidth 
                      disabled={!isEditing}
                      label="Phone Number" 
                      value={profileData.phone}
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      slotProps={{ input: { sx: { borderRadius: 0, fontSize: '13px', fontFamily: 'Montserrat, sans-serif' } }, inputLabel: { sx: { fontSize: '13px', fontFamily: 'Montserrat, sans-serif' } } }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField 
                      fullWidth 
                      disabled={!isEditing}
                      label="Default Shipping Address" 
                      value={profileData.address}
                      onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                      slotProps={{ input: { sx: { borderRadius: 0, fontSize: '13px', fontFamily: 'Montserrat, sans-serif' } }, inputLabel: { sx: { fontSize: '13px', fontFamily: 'Montserrat, sans-serif' } } }}
                    />
                  </Grid>
                </Grid>

                {isEditing && (
                  <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 4 }}>
                    <Button variant="outlined" onClick={() => setIsEditing(false)} sx={{ borderRadius: 0, color: '#1A1A1A', borderColor: '#1A1A1A', px: 3, fontSize: '12px', fontFamily: 'Montserrat, sans-serif' }}>
                      Cancel
                    </Button>
                    <Button variant="contained" onClick={handleSave} sx={{ borderRadius: 0, bgcolor: '#1A1A1A', px: 4, fontSize: '12px', fontFamily: 'Montserrat, sans-serif', boxShadow: 'none', '&:hover': { bgcolor: '#A57C5A' } }}>
                      Save Changes
                    </Button>
                  </Stack>
                )}
              </Paper>

              {/* Order History Tracker Box */}
              <Paper sx={{ border: '1px solid #EDEDED', borderRadius: 0, boxShadow: 'none', p: { xs: 3, md: 4.5 }, bgcolor: 'white' }}>
                <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 3 }}>
                  <Box sx={{ color: '#1A1A1A', display: 'flex' }}>
                    <OrderIcon sx={{ fontSize: 22 }} />
                  </Box>
                  <Typography sx={{ fontSize: '16px', fontWeight: 600, color: '#1A1A1A', fontFamily: 'Montserrat, sans-serif', letterSpacing: '0.02em' }}>
                    Recent Studio Purchases
                  </Typography>
                </Stack>

                <List sx={{ p: 0 }}>
                  {recentOrders.map((order, idx) => (
                    <Box key={order.id}>
                      {idx > 0 && <Divider sx={{ my: 2, borderColor: '#EDEDED' }} />}
                      <ListItem sx={{ px: 0, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'flex-start', sm: 'center' }, gap: 2 }}>
                        <ListItemText 
                          primary={`Order ID: ${order.id}`} 
                          secondary={`Placed on ${order.date}`}
                          slotProps={{ 
                            primary: { sx: { fontSize: '13px', fontWeight: 600, color: '#1A1A1A', fontFamily: 'Montserrat, sans-serif' } },
                            secondary: { sx: { fontSize: '12px', fontFamily: 'Montserrat, sans-serif', mt: 0.5 } }
                          }}
                        />
                        
                        <Stack direction="row" spacing={4} sx={{ width: { xs: '100%', sm: 'auto' }, justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#1A1A1A', fontFamily: 'Montserrat, sans-serif' }}>{order.total}</Typography>
                          <Box sx={{ 
                            bgcolor: order.status === 'Processing' ? '#FFF8E1' : '#E8F5E9', 
                            color: order.status === 'Processing' ? '#F57F17' : '#2E7D32', 
                            px: 2, py: 0.5, fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'Montserrat, sans-serif'
                          }}>
                            {order.status}
                          </Box>
                        </Stack>
                      </ListItem>
                    </Box>
                  ))}
                </List>
              </Paper>

              {/* Minimal Luxury Styled Logout Section */}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  onClick={handleLogout}
                  variant="text"
                  startIcon={<LogoutIcon sx={{ fontSize: '16px !important' }} />}
                  sx={{ color: '#9C2B2B', fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em', fontFamily: 'Montserrat, sans-serif', '&:hover': { bgcolor: '#FFEBEE' } }}
                >
                  Log out from Account
                </Button>
              </Box>

            </Stack>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
};

export default Profile;