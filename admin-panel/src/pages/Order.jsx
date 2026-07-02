import React, { useState, useEffect } from 'react';
import { 
  Box, Card, Typography, useTheme, TextField, InputAdornment, 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Chip, IconButton, Menu, MenuItem, Button
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { endpoints } from '../api/endpoints'; // 👈 Centralized endpoints wrapper import kiya

export default function Orders({ mode }) {
  const theme = useTheme();

  // 🔌 LIVE DYNAMIC API STATES
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Filter Menu Anchor State
  const [anchorEl, setAnchorEl] = useState(null);

  // 📡 1. GET ALL ORDERS FROM BACKEND API
  const fetchOrders = async () => {
    try {
      setLoading(true);
     
      const response = await endpoints.orders.getAll(); 
      if (response.data && response.data.data) {
        setOrders(response.data.data); // Backend array standard mapping[cite: 1]
      }
    } catch (err) {
      console.error("Error fetching orders from backend:", err);
    } finally {
      setLoading(false);
    }
  };

  console.log('order', orders);

  useEffect(() => {
    fetchOrders();
  }, []);

  // Handle Status Filter Click
  const handleFilterClick = (event) => setAnchorEl(event.currentTarget);
  const handleFilterClose = (status) => {
    if (status) setStatusFilter(status);
    setAnchorEl(null);
  };

  // View Order Details Handler
  const handleViewOrder = (orderId) => {
    alert(`Bhai, Order ${orderId} ki details open ho rahi hain!`);
  };

  // 🔍 Search & Status Filter Logic dynamically synced with updated Schema keys[cite: 1]
  const filteredOrders = orders.filter(order => {
    const customerName = order.userId?.name || ''; // populated user fields[cite: 1]
    const orderIdString = order._id || '';
    const currentStatus = order.orderStatus || 'Pending'; // schema orderStatus[cite: 1]

    const matchesSearch = customerName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          orderIdString.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || currentStatus === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Dynamic Badges for Order Status[cite: 1]
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
      case 'Pending':
      default:
        return <Chip label={status || 'Pending'} size="small" sx={{ bgcolor: 'rgba(234, 179, 8, 0.1)', color: '#eab308', fontWeight: 700 }} />;
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
          {['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map((status) => (
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
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={7} align="center" sx={{ py: 4, fontFamily: '"Plus Jakarta Sans"' }}>
                      Fetching real-time sales reports...
                    </TableCell>
                  </TableRow>
                ) : filteredOrders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} align="center" sx={{ py: 4, fontFamily: '"Plus Jakarta Sans"' }}>
                      No orders matching the active matrix metrics.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredOrders.map((order) => (
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
                      
                      {/* Customer populated user name[cite: 1] */}
                      <TableCell sx={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 700 }}>
                        {order.userId?.name || "Anonymous Client"}
                      </TableCell>
                      
                      {/* Date converted from Mongoose Timestamps */}
                      <TableCell sx={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 500, color: theme.palette.text.secondary }}>
                        {order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-GB', {
                          day: '2-digit', month: 'short', year: 'numeric'
                        }) : "N/A"}
                      </TableCell>
                      
                      {/* Price / Total[cite: 1] */}
                      <TableCell sx={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, fontSize: '1rem' }}>
                        ₹{(order.totalAmount || 0).toLocaleString('en-IN')}
                      </TableCell>

                      {/* Remaining Payment Method Mode[cite: 1] */}
                      <TableCell sx={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 600, fontSize: '0.85rem', color: theme.palette.text.secondary }}>
                        {order.remainingPaymentMethod || "COD"}
                      </TableCell>
                      
                      {/* Status Badge[cite: 1] */}
                      <TableCell>{getStatusChip(order.orderStatus)}</TableCell>
                      
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
                  ))
                )}
              </AnimatePresence>
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
}