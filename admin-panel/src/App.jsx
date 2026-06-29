import React, { useState, useMemo } from 'react';
import { ThemeProvider, createTheme, CssBaseline, Typography, Box } from '@mui/material';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Products from './pages/Product';
import Orders from './pages/Order';
import Reviews from './pages/Review';
import User from './pages/User';
import WalletSettings from './pages/WalletSetting';

export default function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [mode, setMode] = useState('dark'); // Default dynamic dark mode

  // Custom Light & Dark Style Palette Config
  const theme = useMemo(() => createTheme({
    palette: {
      mode,
      primary: { main: '#06b6d4' },
      background: {
        default: mode === 'dark' ? '#040711' : '#f8fafc',
        paper: mode === 'dark' ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.9)',
      },
      text: {
        primary: mode === 'dark' ? '#f8fafc' : '#0f172a',
        secondary: mode === 'dark' ? '#64748b' : '#475569',
      }
    },
    typography: { fontFamily: 'Inter, sans-serif' }
  }), [mode]);

  const toggleTheme = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard mode={mode} />;
      case 'products':
        return <Products mode={mode} />;
      case 'orders':
        return <Orders mode={mode} />;
      case 'reviews':
        return <Reviews mode={mode} />;
      case 'users':
        return <User mode={mode} />;
      case 'wallet_settings':
        return <WalletSettings mode={mode} />;
      default:
        return <Dashboard mode={mode} />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DashboardLayout activePage={activePage} setActivePage={setActivePage} mode={mode} toggleTheme={toggleTheme}>
        {renderPage()}
      </DashboardLayout>
    </ThemeProvider>
  );
}