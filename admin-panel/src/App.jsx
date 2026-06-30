import React, { useState, useMemo, useEffect } from 'react';
import { ThemeProvider, createTheme, CssBaseline, Box, Typography } from '@mui/material';
import DashboardLayout from './layouts/DashBoardLayout';
import Dashboard from './pages/Dashboard';
import Products from './pages/Product';
import Orders from './pages/Order';
import Reviews from './pages/Review';
import User from './pages/User';
import WalletSettings from './pages/WalletSetting';
import Login from './pages/Login';
import Register from './pages/Register';

export default function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [mode, setMode] = useState('dark'); 
  const [isAuthenticated, setIsAuthenticated] = useState(false); 
  const [authView, setAuthView] = useState('login'); 
  const [checkingAuth, setCheckingAuth] = useState(true);

  // 📡 AUTOMATIC TOKEN DETECTOR ON LOAD
  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem('token'); 
      if (token) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setCheckingAuth(false);
    };
    checkToken();
  }, []);

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
      case 'dashboard': return <Dashboard mode={mode} />;
      case 'products': return <Products mode={mode} />;
      case 'orders': return <Orders mode={mode} />;
      case 'reviews': return <Reviews mode={mode} />;
      case 'users': return <User mode={mode} />;
      case 'wallet_settings': return <WalletSettings mode={mode} />;
      default: return <Dashboard mode={mode} />;
    }
  };

  if (checkingAuth) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: mode === 'dark' ? '#040711' : '#f8fafc' }}>
          <Typography sx={{ fontFamily: '"Space Grotesk"', color: '#06b6d4', fontWeight: 700, letterSpacing: '1px' }}>
            SCANNING SECURITY TOKENS...
          </Typography>
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {!isAuthenticated ? (
        authView === 'login' ? (
          <Login mode={mode} setAuth={setIsAuthenticated} setAuthView={setAuthView} />
        ) : (
          <Register mode={mode} setAuthView={setAuthView} />
        )
      ) : (
        <DashboardLayout activePage={activePage} setActivePage={setActivePage} mode={mode} toggleTheme={toggleTheme}>
          {renderPage()}
        </DashboardLayout>
      )}
    </ThemeProvider>
  );
}