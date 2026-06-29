import React, { useState, useEffect } from 'react';
import { 
  Box, Card, Typography, useTheme, TextField, InputAdornment, 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Chip, IconButton, Menu, MenuItem, Button
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function Orders({ mode }) {
  const theme = useTheme();

  // 🔌 LIVE API STATES FOR FAIZAN
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Filter Menu Anchor State
  const [anchorEl, setAnchorEl] = useState(null);

  // 📡 1. GET ALL ORDERS FROM API
  const fetchOrders = async () => {
    try {
      setLoading(true);
      // const response = await axios.get('/api/v1/orders'); // 👈 Apni API URL yahan dalo bhai
      // setOrders(response.data.orders);

      // Temporary Premium Fallback Data (Jab tak backend ready nahi hota)
      setOrders([
        { _id: 'ORD-9482', customer: 'Aman Sharma', date: '29 June 2026', total: 18498, status: 'Delivered', method: 'UPI' },
        { _id: 'ORD-2841', customer: 'Zaid Khan', date: '28 June 2026', total: 4500, status: 'Processing', method: 'Card' },
        { _id: 'ORD-7239', customer: 'Rohit Verma', date: '26 June 2026', total: 12999, status: 'Shipped', method: 'COD' },
        { _id: 'ORD-1042', customer: 'Sanya Malhotra', date: '25 June 2026', total: 8999, status: 'Cancelled', method: 'UPI' },
      ]);
    } catch (err) {
      console.error("Error fetching orders from backend:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Handle Status Filter Click
  const handleFilterClick = (event) => setAnchorEl(event.currentTarget);
  const handleFilterClose = (status) => {
    if (status) setStatusFilter(status);
    setAnchorEl(null);
  };

  // View Order Details Handler (Modal ya details page ke liye trigger)
  const handleViewOrder = (orderId) => {
    alert(`Bhai, Order ${orderId} ki details open ho rahi hain!`);
  };

  // Search & Status Filter Logic combined
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customer.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          order._id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Dynamic Badges for Order Status
  const getStatusChip = (status) => {
    switch (status) {
      case 'Delivered':
        return <Chip label="Delivered" size="small" sx={{ bgcolor: 'rgba(16, 185, 129, 0.1)', color: '#10b981', fontWeight: 700 }} />;
      case 'Processing':
        return <Chip label="Processing" size="small" sx={{ bgcolor: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', fontWeight: 700 }} />;
      case 'Shipped':
        return <Chip label="Shipped" size="small" sx={{ bgcolor: 'rgba(234, 179, 8, 0.1)', color: '#eab308', fontWeight: 700 }} />;
      case 'Cancelled':
        return <Chip label="Cancelled" size="small" sx={{ bgcolor: 'rgba(244, 63, 94, 0.1)', color: '#f43f5e', fontWeight: 700 }} />;
      default:
        return <Chip label={status} size="small" />;
    }
  };

  return (
    <Box component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} sx={{ width: '100%', pb: 4 }}>
      
      {/* Page Title & Status Indicator */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, gap: 2, mb: 5 }}>
        <Box>
          <Typography variant="h3" sx={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 800, color: theme.palette.text.primary, mb: 0.5, letterSpacing: '-1px' }}>
            Orders Management
          </Typography>
          <Typography variant="body1" sx={{ fontFamily: '"Plus Jakarta Sans", sans-serif', color: theme.palette.text.secondary, fontWeight: 500 }}>
            Track sales, process fulfillments, and review transaction workflows.
          </Typography>
        </Box>

        {/* Filter Button */}
        <Button
          variant="outlined"
          startIcon={<FilterListIcon />}
          onClick={handleFilterClick}
          sx={{
            borderColor: mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
            color: theme.palette.text.primary,
            borderRadius: '12px',
            textTransform: 'none',
            fontFamily: '"Plus Jakarta Sans", sans-serif',
            fontWeight: 600,
            px: 2.5,
            py: 1.2,
            bgcolor: mode === 'dark' ? '#0f172a' : '#ffffff',
            '&:hover': { borderColor: '#06b6d4', bgcolor: 'transparent' }
          }}
        >
          Filter: {statusFilter}
        </Button>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => handleFilterClose(null)}>
          {['All', 'Delivered', 'Processing', 'Shipped', 'Cancelled'].map((status) => (
            <MenuItem key={status} onClick={() => handleFilterClose(status)} sx={{ fontFamily: '"Plus Jakarta Sans"', fontWeight: 500 }}>
              {status}
            </MenuItem>
          ))}
        </Menu>
      </Box>

      {/* Search Input Bar */}
      <Box sx={{ mb: 4, width: '100%' }}>
        <TextField
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search orders by Order ID or customer name..."
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
              '&.Mui-focused fieldset': { borderColor: '#06b6d4', borderWidth: '1px' },
            },
            input: { fontFamily: '"Plus Jakarta Sans", sans-serif', color: theme.palette.text.primary, fontWeight: 500 }
          }}
        />
      </Box>

      {/* 📊 ADVANCED ORDERS LEDGER TABLE */}
      <Card sx={{ bgcolor: mode === 'dark' ? '#0f172a' : '#ffffff', border: `1px solid ${mode === 'dark' ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0,0,0,0.06)'}`, borderRadius: '24px', p: 3, width: '100%', boxShadow: mode === 'dark' ? 'none' : '0 10px 30px rgba(0,0,0,0.02)' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ '& th': { borderBottom: `1px solid ${mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)'}`, color: theme.palette.text.secondary, fontWeight: 800, fontFamily: '"Plus Jakarta Sans", sans-serif', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.5px' } }}>
                <TableCell>Order ID</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Total Amount</TableCell>
                <TableCell>Method</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <AnimatePresence>
                {filteredOrders.map((order) => (
                  <TableRow 
                    key={order._id} 
                    component={motion.tr}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    sx={{ '& td': { borderBottom: `1px solid ${mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.04)'}`, color: theme.palette.text.primary, py: 2.5 } }}
                  >
                    {/* Order ID */}
                    <TableCell sx={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, color: '#06b6d4', fontSize: '0.9rem' }}>
                      {order._id}
                    </TableCell>
                    
                    {/* Customer */}
                    <TableCell sx={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 700 }}>
                      {order.customer}
                    </TableCell>
                    
                    {/* Date */}
                    <TableCell sx={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 500, color: theme.palette.text.secondary }}>
                      {order.date}
                    </TableCell>
                    
                    {/* Price / Total */}
                    <TableCell sx={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, fontSize: '1rem' }}>
                      ₹{order.total.toLocaleString('en-IN')}
                    </TableCell>

                    {/* Payment Method */}
                    <TableCell sx={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 600, fontSize: '0.85rem', color: theme.palette.text.secondary }}>
                      {order.method}
                    </TableCell>
                    
                    {/* Status Badge */}
                    <TableCell>{getStatusChip(order.status)}</TableCell>
                    
                    {/* Action Panel */}
                    <TableCell align="right">
                      <IconButton 
                        onClick={() => handleViewOrder(order._id)}
                        sx={{ color: '#06b6d4', border: `1px solid ${mode === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.06)'}`, borderRadius: '10px', p: 1 }}
                      >
                        <VisibilityIcon sx={{ fontSize: 18 }} />
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