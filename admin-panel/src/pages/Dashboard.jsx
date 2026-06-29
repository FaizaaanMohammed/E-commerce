import React, { useState, useEffect } from 'react';
import { Box, Card, Typography, useTheme, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip } from '@mui/material';
import Grid from '@mui/material/Grid';
import { motion } from 'framer-motion';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import PaidIcon from '@mui/icons-material/Paid';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import StarIcon from '@mui/icons-material/Star';

const mockChartData = [
  { name: 'Mon', revenue: 4000 },
  { name: 'Tue', revenue: 7000 },
  { name: 'Wed', revenue: 5000 },
  { name: 'Thu', revenue: 12000 },
  { name: 'Fri', revenue: 9000 },
  { name: 'Sat', revenue: 15000 },
  { name: 'Sun', revenue: 14500 },
];

// 📜 NEW MOCK RECENT SPLIT ORDERS DATA FOR DYNAMIC ADDITION
const mockRecentOrders = [
  { id: 'ORD9921', user: 'Rahul Sharma', total: '₹2,500', walletPaid: '₹500', cashPaid: '₹2,000', status: 'Paid' },
  { id: 'ORD9922', user: 'Amit Verma', total: '₹1,200', walletPaid: '₹1,200', cashPaid: '零0', status: 'Paid' },
  { id: 'ORD9923', user: 'Sneha Roy', total: '₹4,300', walletPaid: '零0', cashPaid: '₹4,300', status: 'Pending' },
];

export default function Dashboard({ mode }) {
  const theme = useTheme();
  const [backendStats] = useState({ totalRevenue: '45,230', totalProducts: '124', walletCoins: '12,450', avgRating: '4.7' });

  const stats = [
    { title: 'TOTAL REVENUE', value: `₹${backendStats.totalRevenue}`, icon: <PaidIcon sx={{ fontSize: 22, color: '#10b981' }} />, bg: 'rgba(16, 185, 129, 0.08)' },
    { title: 'TOTAL PRODUCTS', value: `${backendStats.totalProducts} Items`, icon: <ShoppingBagIcon sx={{ fontSize: 22, color: '#38bdf8' }} />, bg: 'rgba(56, 189, 248, 0.08)' },
    { title: 'WALLET COINS', value: `${backendStats.walletCoins} 🪙`, icon: <AccountBalanceWalletIcon sx={{ fontSize: 22, color: '#eab308' }} />, bg: 'rgba(234, 179, 8, 0.08)' },
    { title: 'AVG RATING', value: `${backendStats.avgRating} ⭐`, icon: <StarIcon sx={{ fontSize: 22, color: '#f43f5e' }} />, bg: 'rgba(244, 63, 94, 0.08)' },
  ];

  return (
    <Box component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} sx={{ width: '100%', pb: 4 }}>
      
      <Box sx={{ mb: 5 }}>
        <Typography variant="h3" sx={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 800, color: theme.palette.text.primary, mb: 0.5, letterSpacing: '-1.5px' }}>
          Dashboard Overview
        </Typography>
        <Typography variant="body1" sx={{ fontFamily: '"Plus Jakarta Sans", sans-serif', color: theme.palette.text.secondary, fontWeight: 500 }}>
          Real-time enterprise wallet split matrix.
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ width: '100%', m: 0, mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index} style={{ display: 'flex' }}>
            <Card
              component={motion.div}
              whileHover={{ y: -5, border: '1px solid #06b6d4', boxShadow: '0 10px 30px rgba(6, 182, 212, 0.12)' }}
              sx={{
                bgcolor: mode === 'dark' ? '#0f172a' : '#ffffff',
                border: `1px solid ${mode === 'dark' ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0,0,0,0.06)'}`,
                borderRadius: '24px',
                p: 3,
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: 3,
                cursor: 'pointer',
              }}
            >
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="caption" sx={{ fontFamily: '"Plus Jakarta Sans", sans-serif', color: theme.palette.text.secondary, fontWeight: 800, letterSpacing: '1px' }}>
                  {stat.title}
                </Typography>
                <Box sx={{ p: 1, borderRadius: '12px', bgcolor: stat.bg, display: 'flex', alignItems: 'center' }}>{stat.icon}</Box>
              </Box>
              <Box>
                <Typography variant="h4" sx={{ fontFamily: '"Space Grotesk", sans-serif', color: theme.palette.text.primary, fontWeight: 700 }}>
                  {stat.value}
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* 📊 CHART BOX */}
      <Card sx={{ bgcolor: mode === 'dark' ? '#0f172a' : '#ffffff', border: `1px solid ${mode === 'dark' ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0,0,0,0.06)'}`, borderRadius: '24px', p: 4, width: '100%', height: '350px', mb: 4 }}>
        <Typography variant="h6" sx={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 700, color: theme.palette.text.primary, mb: 3 }}>Revenue Vector Flow</Typography>
        <ResponsiveContainer width="100%" height="90%">
          <AreaChart data={mockChartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/><stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="name" stroke={theme.palette.text.secondary} fontSize={12} tickLine={false} />
            <YAxis stroke={theme.palette.text.secondary} fontSize={12} tickLine={false} />
            <Tooltip contentStyle={{ background: mode === 'dark' ? '#070a13' : '#fff', borderRadius: '12px', border: '1px solid rgba(6,182,212,0.3)' }} />
            <Area type="monotone" dataKey="revenue" stroke="#06b6d4" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      {/* 📜 NEW ADDITION: RECENT TRANSACTIONS TABLE */}
      <Card sx={{ bgcolor: mode === 'dark' ? '#0f172a' : '#ffffff', border: `1px solid ${mode === 'dark' ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0,0,0,0.06)'}`, borderRadius: '24px', p: 4, width: '100%' }}>
        <Typography variant="h6" sx={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 700, color: theme.palette.text.primary, mb: 3 }}>Recent Split Orders</Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ '& th': { borderBottom: `1px solid ${mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)'}`, color: theme.palette.text.secondary, fontWeight: 700 } }}>
                <TableCell>Order ID</TableCell><TableCell>Customer</TableCell><TableCell>Total Amount</TableCell><TableCell>Wallet Coins Deducted</TableCell><TableCell>Cash Paid</TableCell><TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockRecentOrders.map((row) => (
                <TableRow key={row.id} sx={{ '& td': { borderBottom: `1px solid ${mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.04)'}`, color: theme.palette.text.primary } }}>
                  <TableCell sx={{ fontWeight: 700 }}>{row.id}</TableCell>
                  <TableCell>{row.user}</TableCell>
                  <TableCell>{row.total}</TableCell>
                  <TableCell sx={{ color: '#eab308', fontWeight: 600 }}>{row.walletPaid}</TableCell>
                  <TableCell>{row.cashPaid}</TableCell>
                  <TableCell><Chip label={row.status} size="small" sx={{ bgcolor: row.status === 'Paid' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(234, 179, 8, 0.1)', color: row.status === 'Paid' ? '#10b981' : '#eab308', fontWeight: 700 }} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

    </Box>
  );
}