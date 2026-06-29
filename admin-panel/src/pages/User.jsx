import React, { useState, useEffect } from 'react';
import { Box, Card, Typography, useTheme, TextField, InputAdornment, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, IconButton, Avatar } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import SearchIcon from '@mui/icons-material/Search';
import BlockIcon from '@mui/icons-material/Block';
import CheckIcon from '@mui/icons-material/Check';
import TollIcon from '@mui/icons-material/Toll';

export default function User({ mode }) {
  const theme = useTheme();

  // 🔌 LIVE API STATES
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // 📡 1. FETCH ALL USERS WITH WALLET BALANCES
  const fetchUsers = async () => {
    try {
      setLoading(true);
      // const response = await axios.get('/api/v1/admin/users'); 
      // setUsers(response.data.users);

      // Temporary Premium Fallback Data
      setUsers([
        { _id: 'U001', name: 'Aman Sharma', email: 'aman@example.com', coinBalance: 1200, rupeeBalance: 150.00, status: 'active' },
        { _id: 'U002', name: 'Zaid Khan', email: 'zaid@example.com', coinBalance: 450, rupeeBalance: 45.00, status: 'active' },
        { _id: 'U003', name: 'Rohit Verma', email: 'rohit@example.com', coinBalance: 0, rupeeBalance: 0.00, status: 'blocked' },
      ]);
    } catch (err) {
      console.error("Error fetching users ledger:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 📡 2. TOGGLE USER STATUS (BLOCK / UNBLOCK)
  const handleToggleStatus = async (id, currentStatus) => {
    const nextStatus = currentStatus === 'active' ? 'blocked' : 'active';
    if (window.confirm(`Bhai, pakka user ko ${nextStatus} karna hai?`)) {
      try {
        // await axios.put(`/api/v1/admin/users/status/${id}`, { status: nextStatus });
        setUsers(users.map(user => user._id === id ? { ...user, status: nextStatus } : user)); 
      } catch (err) {
        console.error("Failed to change user status:", err);
      }
    }
  };

  // Search filter logic
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} sx={{ width: '100%', pb: 4 }}>
      
      {/* Page Title */}
      <Box sx={{ mb: 5 }}>
        <Typography variant="h3" sx={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 800, color: theme.palette.text.primary, mb: 0.5, letterSpacing: '-1px' }}>
          Customer Management
        </Typography>
        <Typography variant="body1" sx={{ fontFamily: '"Plus Jakarta Sans", sans-serif', color: theme.palette.text.secondary, fontWeight: 500 }}>
          Audit user profile credentials, monitor gamified wallet assets, and control access permissions.
        </Typography>
      </Box>

      {/* Search Control */}
      <Box sx={{ mb: 4, width: '100%' }}>
        <TextField
          fullWidth 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search customers by profile name or registration email..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: theme.palette.text.secondary }} />
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              bgcolor: mode === 'dark' ? '#0f172a' : '#ffffff',
              borderRadius: '16px', 
              border: 'none',
              '& fieldset': { border: `1px solid ${mode === 'dark' ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0,0,0,0.06)'}` },
              '&:hover fieldset': { borderColor: '#06b6d4' },
              '&.Mui-focused fieldset': { borderColor: '#06b6d4' },
            },
            input: { fontFamily: '"Plus Jakarta Sans"', color: theme.palette.text.primary, fontWeight: 500 }
          }}
        />
      </Box>

      {/* 📊 USER LEDGER TABLE */}
      <Card sx={{ bgcolor: mode === 'dark' ? '#0f172a' : '#ffffff', border: `1px solid ${mode === 'dark' ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0,0,0,0.06)'}`, borderRadius: '24px', p: 3, width: '100%' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ '& th': { borderBottom: `1px solid ${mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)'}`, color: theme.palette.text.secondary, fontWeight: 800, fontFamily: '"Plus Jakarta Sans"', textTransform: 'uppercase', fontSize: '0.75rem' } }}>
                <TableCell>Customer Profile</TableCell>
                <TableCell>Coin Balance</TableCell>
                <TableCell>Cash Balance (₹)</TableCell>
                <TableCell>Account Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <AnimatePresence>
                {filteredUsers.map((user) => (
                  <TableRow 
                    key={user._id} 
                    component={motion.tr}
                    initial={{ opacity: 0, y: 4 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    sx={{ '& td': { borderBottom: `1px solid ${mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.04)'}`, color: theme.palette.text.primary, py: 2 } }}
                  >
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={2}>
                        <Avatar sx={{ background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)', fontFamily: '"Plus Jakarta Sans"', fontWeight: 700, fontSize: '0.9rem' }}>
                          {user.name ? user.name[0] : 'U'}
                        </Avatar>
                        <Box>
                          <Typography sx={{ fontFamily: '"Plus Jakarta Sans"', fontWeight: 700, fontSize: '0.95rem' }}>{user.name}</Typography>
                          <Typography variant="body2" sx={{ fontFamily: '"Plus Jakarta Sans"', color: theme.palette.text.secondary, fontSize: '0.85rem' }}>{user.email}</Typography>
                        </Box>
                      </Box>
                    </TableCell>

                    <TableCell sx={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, color: '#eab308' }}>
                      <Box display="flex" alignItems="center" gap={0.5}>
                        <TollIcon sx={{ fontSize: 18 }} />
                        {user.coinBalance.toLocaleString('en-IN')} Coins
                      </Box>
                    </TableCell>

                    <TableCell sx={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, fontSize: '1rem' }}>
                      ₹{user.rupeeBalance.toLocaleString('en-IN')}
                    </TableCell>

                    <TableCell>
                      <Chip 
                        label={user.status.toUpperCase()}
                        size="small" 
                        sx={{ 
                          bgcolor: user.status === 'active' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(244, 63, 94, 0.1)',
                          color: user.status === 'active' ? '#10b981' : '#f43f5e',
                          fontWeight: 700 
                        }} 
                      />
                    </TableCell>

                    <TableCell align="right">
                      <IconButton 
                        onClick={() => handleToggleStatus(user._id, user.status)}
                        sx={{ 
                          color: user.status === 'active' ? '#f43f5e' : '#10b981',
                          border: `1px solid ${mode === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.06)'}`, 
                          borderRadius: '10px', p: 1 
                        }}
                      >
                        {user.status === 'active' ? <BlockIcon sx={{ fontSize: 18 }} /> : <CheckIcon sx={{ fontSize: 18 }} />}
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </AnimatePresence>
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
}