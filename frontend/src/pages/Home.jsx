import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Stack, Link, InputBase, useMediaQuery, useTheme, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Avatar } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'; 
import CloseIcon from '@mui/icons-material/Close';
import girlImage from '../assets/Banner-girl.webp';
import AuthModal from '../components/AuthModal';

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  // अवतार दिखाने के लिए स्टेट्स जोड़े
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInitial, setUserInitial] = useState("");

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Collections", path: "/collections" },
    { name: "New Arrivals", path: "/new-arrivals" },
    { name: "Sale", path: "/sale", isSale: true },
  ];

  // 1. डेटा लोड करने का इफेक्ट
  useEffect(() => {
    const loadStoreBannerData = async () => {
      setLoading(true);
      try {
        const fallbackData = [
          { id: 1, category: 'CLOTHING', brand: 'AIRI STUDIO', name: 'Oversized\nMinimalist Knit\nSweater', price: 3499, image: girlImage },
          { id: 2, category: 'ELECTRONICS', brand: 'SONY AUDIO', name: 'Wireless Noise-\nCancelling\nHeadphones', price: 24999, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80' },
          { id: 3, category: 'FOOTWEAR', brand: 'NIKE SPORTSWEAR', name: 'Retro Premium\nAir Sneakers', price: 9999, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80' }
        ];
        setProducts(fallbackData);
      } catch (error) {
        console.error("API Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };
    loadStoreBannerData();
  }, []);

  // 2. अवतार और टोकन वैलिडेशन का इफेक्ट (फिक्स किया)
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("nexus_user");

    if (token) {
      setIsAuthenticated(true);
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          const name = parsedUser?.name || parsedUser?.user?.name;
          if (name) {
            setUserInitial(name.charAt(0).toUpperCase());
          } else {
            setUserInitial("N");
          }
        } catch (e) {
          setUserInitial("N"); 
        }
      } else {
        setUserInitial("N");
      }
    } else {
      setIsAuthenticated(false);
      setUserInitial("");
    }
  }, [location, authOpen]);

  const handleProtectedRoute = (targetPath) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setAuthOpen(true); 
    } else {
      navigate(targetPath); 
    }
  };

  const handleIdentityClick = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/profile"); 
    } else {
      setAuthOpen(true);
    }
  };

  const activeProduct = products[currentIndex];

  if (loading || !activeProduct) {
    return <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f8f6f3' }} />;
  }

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: isMobile ? 'column' : 'row',
        height: '100vh', 
        width: '100%',
        backgroundColor: '#f8f6f3', 
        overflow: 'hidden', 
        position: 'relative',
        boxSizing: 'border-box'
      }}
    >
      {/* PREMIUM FLOATING BACKGROUND PARTICLES & BLUR */}
      <Box sx={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <Box
          component={motion.div}
          animate={{ scale: [1, 1.05, 1], x: [0, -10, 0], y: [0, 10, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          sx={{
            position: 'absolute',
            bottom: '-15%',
            right: '-10%',
            width: '650px',
            height: '650px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(238,223,204,0.4) 0%, rgba(248,246,243,0) 80%)',
            filter: 'blur(30px)'
          }}
        />

        {[...Array(8)].map((_, i) => {
          const randomX = [Math.random() * 150, Math.random() * -80, Math.random() * 200];
          const randomY = [Math.random() * 150, Math.random() * -80, Math.random() * 200];
          return (
            <Box
              key={i}
              component={motion.div}
              animate={{ x: randomX, y: randomY, opacity: [0.2, 0.6, 0.2], scale: [0.9, 1.3, 0.9] }}
              transition={{ duration: 10 + i * 3, repeat: Infinity, ease: "easeInOut" }}
              sx={{
                position: 'absolute',
                top: `${15 + (i * 10)}%`,
                left: `${35 + (i * 7)}%`,
                width: i % 2 === 0 ? '6px' : '4px',
                height: i % 2 === 0 ? '6px' : '4px',
                bgcolor: i % 3 === 0 ? '#a30d0d' : '#cda587', 
                borderRadius: '50%',
                boxShadow: '0 0 8px rgba(0,0,0,0.05)'
              }}
            />
          );
        })}
      </Box>
      
      {/* 1. TOP NAVBAR (MOBILE ONLY) */}
      {isMobile && (
        <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 3, boxSizing: 'border-box', zIndex: 110 }}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <IconButton onClick={() => setDrawerOpen(true)} sx={{ p: 0, color: '#111' }}>
              <MenuIcon sx={{ fontSize: '24px' }} />
            </IconButton>
            <Typography variant="h4" sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 900, fontSize: '24px', color: '#111' }}>NEXUS OS.</Typography>
          </Stack>
          <Stack direction="row" spacing={2} alignItems="center">
            {/* मोबाइल अवतार फिक्स */}
            <IconButton onClick={handleIdentityClick} sx={{ p: 0 }}>
              {isAuthenticated ? (
                <Avatar sx={{ width: 24, height: 24, bgcolor: "#1A1A1A", color: "white", fontSize: '11px', fontWeight: 600, fontFamily: "Montserrat" }}>
                  {userInitial}
                </Avatar>
              ) : (
                <PermIdentityIcon sx={{ color: '#111', fontSize: '22px' }} />
              )}
            </IconButton>
            <SearchIcon sx={{ cursor: 'pointer', color: '#111', fontSize: '22px' }} />
            <FavoriteBorderIcon onClick={() => handleProtectedRoute("/wishlist")} sx={{ cursor: 'pointer', color: '#111', fontSize: '22px' }} />
            <ShoppingBagIcon onClick={() => handleProtectedRoute("/cart")} sx={{ cursor: 'pointer', color: '#111', fontSize: '22px' }} />
          </Stack>
        </Box>
      )}

      {/* 2. RESPONSIVE MOBILE DRAWER */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { width: '280px', bgcolor: '#f8f6f3' } }}
      >
        <Box sx={{ padding: { xs: "20px", md: "40px" } }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Typography variant="h5" sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 900 }}>NEXUS OS.</Typography>
            <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: '#111' }}>
              <CloseIcon />
            </IconButton>
          </Box>
          <List>
            {menuItems.map((item, idx) => {
              const isActive = location.pathname === item.path;
              return (
                <ListItem disablePadding key={item.name} sx={{ mb: 1 }}>
                  <ListItemButton 
                    onClick={() => { setDrawerOpen(false); navigate(item.path); }} 
                    sx={{ px: 0, '&:hover': { bgcolor: 'transparent' } }}
                  >
                    <ListItemText 
                      primary={item.name} 
                      primaryTypographyProps={{ 
                        fontFamily: '"Montserrat", sans-serif', 
                        fontWeight: isActive || item.name === 'Shop' ? 600 : 500,
                        fontSize: '16px',
                        color: isActive 
                          ? '#cda587' 
                          : item.isSale 
                            ? '#b33939' 
                            : '#111'
                      }} 
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Drawer>

      {/* 3. PERMANENT SIDEBAR NAVBAR (DESKTOP ONLY) */}
      {!isMobile && (
        <Box 
          component="nav" 
          sx={{ 
            width: '320px', 
            minWidth: '320px', 
            height: '100vh', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'space-between',
            p: '50px 40px 40px 50px', 
            boxSizing: 'border-box',
            zIndex: 10
          }}
        >
          <Box>
            <Stack direction="row" alignItems="center" spacing={3}>
              <Typography variant="h1" sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 900, fontSize: '32px', color: '#111' }}>
                NEXUS OS.
              </Typography>
              <IconButton onClick={() => setDrawerOpen(true)} sx={{ p: 0, color: '#111' }}>
                <MenuIcon sx={{ fontSize: '20px' }} />
              </IconButton>
            </Stack>

            <Stack spacing={3.5} sx={{ mt: '80px' }}>
              {menuItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Box key={item.name} sx={{ position: 'relative', width: 'fit-content' }}>
                    <Link 
                      underline="none" 
                      onClick={() => navigate(item.path)} 
                      sx={{ 
                        color: isActive ? '#cda587' : item.isSale ? '#b33939' : '#111111', 
                        fontSize: '1.1rem', 
                        cursor: 'pointer', 
                        fontFamily: '"Montserrat", sans-serif', 
                        letterSpacing: '0.2px', 
                        fontWeight: "600", 
                        padding: "4px 0px", 
                        '&:hover': { color: '#cda587' } 
                      }}
                    >
                      {item.name}
                    </Link>
                    {item.name === 'Shop' && (
                      <Box sx={{ position: 'absolute', top: '-10px', right: '-28px', bgcolor: '#ea1010', color: 'white', fontSize: '9px', fontWeight: 700, px: '6px', py: '2px', borderRadius: '2px' }}>HOT</Box>
                    )}
                  </Box>
                );
              })}
            </Stack>
          </Box>

          <Box sx={{ width: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #111', pb: 0.5, mb: 4, width: '100%' }}>
              <InputBase
                placeholder="Enter Your Email...."
                sx={{ fontSize: '12px', fontFamily: '"Montserrat", sans-serif', flexGrow: 1, px: 0, '& input::placeholder': { color: '#888', opacity: 1 } }}
              />
              <Button disableRipple sx={{ color: '#111', textTransform: 'none', fontWeight: 700, fontSize: '15px', p: 0, minWidth: 'auto', fontFamily: '"Montserrat", sans-serif', '&:hover': { bgcolor: 'transparent', color: '#cda587' } }}>
                Subscribe
              </Button>
            </Box>
            <Typography sx={{ fontSize: '12px', color: '#999', fontFamily: '"Montserrat", sans-serif' }}>
              ©2026 AIRI All rights reserved
            </Typography>
          </Box>
        </Box>
      )}

      {/* 4. MAIN DISPLAY CANVAS */}
      <Box 
        sx={{ 
          flexGrow: 1, 
          height: isMobile ? 'calc(100vh - 80px)' : '100vh',
          display: 'flex', 
          alignItems: 'center', 
          position: 'relative', 
          paddingRight: isMobile ? '24px' : '100px',
          paddingLeft: isMobile ? '24px' : '40px',
          boxSizing: 'border-box',
          overflow: 'hidden',
          zIndex: 5
        }}
      >
        {!isMobile && (
          <Stack direction="row" spacing={3} alignItems="center" sx={{ position: 'absolute', top: '50px', right: '80px', zIndex: 10 }}>
            {/* डेस्कटॉप अवतार फिक्स */}
            <IconButton onClick={handleIdentityClick} sx={{ p: 0 }}>
              {isAuthenticated ? (
                <Avatar 
                  sx={{ 
                    width: 28, 
                    height: 28, 
                    bgcolor: "#1A1A1A", 
                    color: "white", 
                    fontSize: "13px", 
                    fontWeight: 600,
                    fontFamily: "Montserrat",
                    cursor: "pointer"
                  }}
                >
                  {userInitial}
                </Avatar>
              ) : (
                <PermIdentityIcon sx={{ color: '#111', fontSize: '22px', cursor: 'pointer' }} />
              )}
            </IconButton>
            
            <SearchIcon sx={{ cursor: 'pointer', color: '#111', fontSize: '22px' }} />
            
            <FavoriteBorderIcon onClick={() => handleProtectedRoute("/wishlist")} sx={{ cursor: 'pointer', color: '#111', fontSize: '22px' }} />
            
            <Box onClick={() => handleProtectedRoute("/cart")} sx={{ position: 'relative', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
              <ShoppingBagIcon sx={{ color: '#111', fontSize: '22px' }} />
              <Box sx={{ position: 'absolute', top: -6, right: -8, bgcolor: '#111', color: '#fff', borderRadius: '50%', width: 15, height: 15, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', fontWeight: 'bold' }}>
                2
              </Box>
            </Box>
          </Stack>
        )}

        <AnimatePresence mode="wait">
          <Box 
            key={currentIndex}
            component={motion.div}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
            sx={{ 
              display: 'flex', 
              flexDirection: isMobile ? 'column' : 'row', 
              width: '100%', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              gap: isMobile ? '20px' : '40px',
            }}
          >
            {/* Left Image Canvas Block */}
            <Box sx={{ width: isMobile ? '100%' : '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', height: isMobile ? '260px' : 'auto' }}>
              <Box 
                component={motion.div}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                sx={{
                  position: 'absolute',
                  width: isSmallMobile ? '220px' : isMobile ? '300px' : '440px',
                  height: isSmallMobile ? '220px' : isMobile ? '300px' : '440px',
                  backgroundColor: '#f4cfbd', 
                  borderRadius: '50%', 
                  zIndex: 1,
                }}
              />
              <Box
                component={motion.img}
                initial={{ x: -20 }}
                animate={{ x: 0 }}
                transition={{ delay: 0.15, type: 'spring', stiffness: 60 }}
                src={activeProduct.image}
                alt={activeProduct.name}
                sx={{
                  maxHeight: isSmallMobile ? '280px' : isMobile ? '310px' : '560px',
                  maxWidth: '100%',
                  objectFit: 'contain',
                  zIndex: 2,
                  filter: 'drop-shadow(0px 25px 35px rgba(0,0,0,0.06))',
                }}
              />
            </Box>

            {/* Right Typography Content Block */}
            <Box sx={{ width: isMobile ? '100%' : '50%', pl: isMobile ? 0 : '40px', boxSizing: 'border-box', textAlign: isMobile ? 'center' : 'left' }}>
              <Stack spacing={isSmallMobile ? 1.5 : 2.5} alignItems={isMobile ? 'center' : 'flex-start'}>
                <Typography 
                  variant="subtitle2" 
                  sx={{ letterSpacing: '1px', color: '#888', textTransform: 'uppercase', fontSize: '10px', fontWeight: 600, fontFamily: '"Montserrat", sans-serif' }}
                >
                  # {activeProduct.brand} // {activeProduct.category}
                </Typography>

                <Typography 
                  variant="h2" 
                  sx={{ 
                    fontSize: isSmallMobile ? '26px' : isMobile ? '36px' : '48px', 
                    fontFamily: '"Playfair Display", serif',
                    color: '#111111', 
                    lineHeight: 1.2,
                    fontWeight: 600,
                    whiteSpace: 'pre-line'
                  }}
                >
                  {activeProduct.name}
                </Typography>

                <Typography variant="h5" sx={{ color: '#cda587', fontWeight: 500, fontSize: '18px', fontFamily: '"Montserrat", sans-serif' }}>
                  ₹{activeProduct.price.toLocaleString('en-IN')}
                </Typography>
                
                <Button 
                  variant="outlined" 
                  onClick={() => navigate('/shop')} 
                  sx={{
                    width: 'fit-content',
                    borderColor: '#111111',
                    color: '#111111',
                    borderRadius: 0,
                    px: isSmallMobile ? '35px' : '45px',
                    py: isSmallMobile ? '10px' : '14px',
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    fontSize: '11px',
                    fontWeight: 600,
                    fontFamily: '"Montserrat", sans-serif',
                    alignSelf: isMobile ? 'center' : 'flex-start',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: '#111111',
                      color: '#ffffff',
                      borderColor: '#111111',
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  Shop Now
                </Button>
              </Stack>
            </Box>
          </Box>
        </AnimatePresence>

        {/* Far Right Slider Controls */}
        <Stack 
          direction={isMobile ? 'row' : 'column'} 
          spacing={2} 
          sx={{ 
            position: 'absolute', 
            right: isMobile ? 'auto' : '40px', 
            left: isMobile ? '50%' : 'auto',
            bottom: isMobile ? '15px' : 'auto',
            top: isMobile ? 'auto' : '50%', 
            transform: isMobile ? 'translateX(-50%)' : 'translateY(-50%)',
            alignItems: 'center',
            zIndex: 20
          }}
        >
          {products.map((_, index) => (
            <Stack direction="row" alignItems="center" spacing={1} key={index} onClick={() => setCurrentIndex(index)} sx={{ cursor: 'pointer' }}>
              {!isMobile && currentIndex === index && (
                <Typography sx={{ fontSize: '10px', fontWeight: 700, fontFamily: '"Montserrat", sans-serif', color: '#111' }}>
                  0{index + 1}
                </Typography>
              )}
              <Box
                component={motion.div}
                animate={{ width: currentIndex === index ? '35px' : '15px' }}
                sx={{
                  height: '1px',
                  bgcolor: currentIndex === index ? '#111111' : '#ccc',
                }}
              />
            </Stack>
          ))}
        </Stack>
      </Box>

      <AuthModal open={authOpen} handleClose={() => setAuthOpen(false)} />
    </Box>
  );
};

export default Home;