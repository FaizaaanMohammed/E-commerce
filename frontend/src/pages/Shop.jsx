// src/pages/Shop.jsx
import React, { useState } from 'react';
import { Box, Typography, Grid, Stack, Link, Slider, Rating, IconButton, Button, Drawer, useMediaQuery, useTheme } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SyncIcon from '@mui/icons-material/Sync';
import TuneIcon from '@mui/icons-material/Tune';
import CloseIcon from '@mui/icons-material/Close';
import TopNavbar from '../components/TopNavbar';
import Footer from '../components/Footer';
import QuickViewModal from '../components/QuickViewModal';

// FULL STRUCTURAL DATA LOOKUP WITH CATEGORIES AT THE TOP
const categoriesList = [
  { name: 'Brands', count: 0 },
  { name: 'Clothing', count: 1 },
  { name: 'Fashions', count: 21 },
  { name: 'Furniture', count: 20 },
  { name: 'Gifts', count: 0 },
  { name: 'Kids', count: 0 },
  { name: 'Men', count: 0 },
  { name: 'New in', count: 0 },
  { name: 'Outlet', count: 0 },
  { name: 'Shoes', count: 0 },
  { name: 'Wallets', count: 0 },
  { name: 'Women', count: 0 },
];

const filtersData = {
  sizes: [{ name: 'L', count: 2 }, { name: 'M', count: 2 }, { name: 'S', count: 2 }, { name: 'XL', count: 2 }, { name: 'XXL', count: 2 }],
  colors: ['Blue', 'Pink', 'White', 'Green', 'Red', 'Black'],
  brands: ['Airi', 'Mango', 'Valention']
};

const mockProducts = [
  {
    id: 1,
    name: 'Chain print bermuda shorts',
    price: 49.00,
    oldPrice: 60.00,
    tag: null,
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&auto=format&fit=crop&q=80'
    ],
    rating: 0
  },
  {
    id: 2,
    name: 'Check blazer',
    price: 49.00,
    oldPrice: 60.00,
    tag: 'NEW',
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?w=600&auto=format&fit=crop&q=80'
    ],
    rating: 4.5
  },
  {
    id: 3,
    name: 'Linen-Blend Pinstriped Culottes',
    price: 49.00,
    oldPrice: 60.00,
    tag: 'SALE',
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1609505848912-b7c3b8b4beda?w=600&auto=format&fit=crop&q=80'
    ],
    rating: 0
  },
  {
    id: 4,
    name: 'Check blazer',
    price: 49.00,
    oldPrice: 60.00,
    tag: 'NEW',
    images: [
      'https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&auto=format&fit=crop&q=80',
      
    ],
    rating: 4.5
  },
  {
    id: 5,
    name: 'Chain print bermuda shorts',
    price: 49.00,
    oldPrice: 60.00,
    tag: null,
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&auto=format&fit=crop&q=80'
    ],
    rating: 0
  },
  
  {
    id: 6,
    name: 'Linen-Blend Pinstriped Culottes',
    price: 49.00,
    oldPrice: 60.00,
    tag: 'SALE',
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1609505848912-b7c3b8b4beda?w=600&auto=format&fit=crop&q=80'
    ],
    rating: 0
  }
];

const Shop = () => {
  const theme = useTheme();
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down('lg'));

  const [priceRange, setPriceRange] = useState([10, 100]);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quickViewOpen, setQuickViewOpen] = useState(false);

  // Render Sidebar Filters Content
  const renderSidebarFilters = () => (
    <Stack spacing={4} sx={{ width: '100%', p: { xs: 3, lg: 0 } }}>
      {isMobileOrTablet && (
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ borderBottom: '1px solid #d5cfc6', pb: 2, mb: 2 }}>
          <Typography variant="h6" sx={{ fontFamily: 'Montserrat', fontWeight: 700 }}>Filters</Typography>
          <IconButton onClick={() => setMobileFiltersOpen(false)}><CloseIcon /></IconButton>
        </Stack>
      )}

      {/* 1. FIXED: Categories are now securely positioned at the topmost stack layer */}
      <Box>
        <Typography variant="subtitle1" sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 900, mb: 2.5, fontSize: '20px' }}>Categories</Typography>
        <Stack spacing={1.5}>
          {categoriesList.map((cat) => (
            <Stack key={cat.name} direction="row" justifyContent="space-between" alignItems="center">
              <Link 
                href="#" 
                underline="none" 
                sx={{ 
                  fontFamily: 'Montserrat', 
                  fontSize: '14px', 
                  color: cat.count > 0 ? '#111111' : '#888888',
                  fontWeight: cat.name === 'Clothing' ? 600 : 500,
                  '&:hover': { color: '#cda587' } 
                }}
              >
                {cat.name}
              </Link>
              <Typography sx={{ fontSize: '13px', color: '#aaa', fontFamily: 'Montserrat' }}>
                ({cat.count})
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Box>

      {/* 2. Size Parameters */}
      <Box>
        <Typography variant="subtitle1" sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 900, mb: 2, fontSize: '20px' }}>Size</Typography>
        <Grid container spacing={1.5}>
          {filtersData.sizes.map((size) => (
            <Grid item xs={6} key={size.name}>
              <Typography sx={{ fontSize: '14px', fontFamily: 'Montserrat', color: '#555', cursor: 'pointer', '&:hover': { color: '#cda587' } }}>
                {size.name} ({size.count})
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* 3. Color Selection Parameters */}
      <Box>
        <Typography variant="subtitle1" sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 900, mb: 2, fontSize: '20px' }}>Color</Typography>
        <Grid container spacing={1.5}>
          {filtersData.colors.map((color) => (
            <Grid item xs={6} key={color}>
              <Typography sx={{ fontSize: '14px', fontFamily: 'Montserrat', color: '#555', cursor: 'pointer', '&:hover': { color: '#cda587' } }}>
                {color} (2)
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* 4. Brand Metrics */}
      <Box>
        <Typography variant="subtitle1" sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 900, mb: 2, fontSize: '20px' }}>Brands</Typography>
        <Stack spacing={1.5}>
          {filtersData.brands.map((brand) => (
            <Typography key={brand} sx={{ fontSize: '14px', fontFamily: 'Montserrat', color: '#555', cursor: 'pointer', '&:hover': { color: '#cda587' } }}>
              {brand} (2)
            </Typography>
          ))}
        </Stack>
      </Box>

      {/* 5. Price Criteria Sliders */}
      <Box>
        <Typography variant="subtitle1" sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 900, mb: 2, fontSize: '20px' }}>Price</Typography>
        <Slider
          value={priceRange}
          onChange={(e, val) => setPriceRange(val)}
          valueLabelDisplay="auto"
          min={10}
          max={100}
          sx={{ color: '#111', height: 2, '& .MuiSlider-thumb': { bgcolor: '#111', width: 10, height: 10 } }}
        />
        <Typography sx={{ fontSize: '13px', fontFamily: 'Montserrat', mt: 1, color: '#444' }}>
          Price: <strong>${priceRange[0]} — ${priceRange[1]}</strong>
        </Typography>
      </Box>
    </Stack>
  );

  return (
    <Box sx={{ bgcolor: '#f8f6f3', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
     

      {/* Mobile/Tablet Filter Button Strip */}
      {isMobileOrTablet && (
        <Box sx={{ px: 4, pt: 4, display: 'flex', justifyContent: 'flex-start' }}>
          <Button 
            variant="outlined" 
            startIcon={<TuneIcon />}
            onClick={() => setMobileFiltersOpen(true)}
            sx={{ borderColor: '#111', color: '#111', borderRadius: 0, fontFamily: 'Montserrat', fontSize: '13px', fontWeight: 600 }}
          >
            Filter Sidebar
          </Button>
        </Box>
      )}

      {/* Main Framework Frame Block */}
      <Box sx={{ display: 'flex', flexGrow: 1, px: { xs: 4, md: 8 }, py: 6, gap: 5 }}>
        
        {/* Desktop Permanent Sidebar Layout Container */}
        {!isMobileOrTablet && (
          <Box sx={{ width: '240px', minWidth: '240px' }}>
            {renderSidebarFilters()}
          </Box>
        )}

        {/* Responsive Drawer Overlay Configuration */}
        <Drawer
          anchor="left"
          open={mobileFiltersOpen}
          onClose={() => setMobileFiltersOpen(false)}
          PaperProps={{ sx: { width: '290px', bgcolor: '#f8f6f3' } }}
        >
          {renderSidebarFilters()}
        </Drawer>

        {/* Product Grid Canvas Component System */}
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={4} justifyContent="space-between" sx={{ width: '100%' }}>
            {mockProducts.map((product) => (
              <Grid item size={{xs:12,sm:6,md:4}} key={product.id}>
                
                <Box 
                  onMouseEnter={() => setHoveredProduct(product.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                  sx={{ width: '100%', aspectRatio: '3/4', bgcolor: '#fff', position: 'relative', overflow: 'hidden', cursor: 'pointer', mb: 2.5 }}
                >
                  {product.tag && (
                    <Box sx={{ 
                      position: 'absolute', top: 15, left: 15, zIndex: 10,
                      bgcolor: product.tag === 'NEW' ? '#111111' : '#d2a689',
                      color: '#fff', fontSize: '10px', fontWeight: 700, px: '10px', py: '10px', borderRadius: '50%'
                    }}>
                      {product.tag}
                    </Box>
                  )}

                  {/* FIXED: FIXED ABSOLUTE DOUBLE-IMAGE BLOCK FOR LUXURY OPACITY CROSSFADE CHANGER TRANSITIONS */}
                  <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
                    {/* Primary Front Image View Base Layer */}
                    <Box 
                      component="img"
                      src={product.images[0]}
                      alt={product.name}
                      sx={{ 
                        width: '100%', height: '100%', objectFit: 'cover',
                        filter: 'brightness(0.97)',
                        position: 'absolute', top: 0, left: 0,
                        opacity: hoveredProduct === product.id ? 0 : 1, // Smoothly vanishes out on focus
                        transition: 'opacity 0.5s cubic-bezier(0.25, 1, 0.5, 1)'
                      }}
                    />
                    
                    {/* Secondary Back Hover Image View Overlay Layer */}
                    <Box 
                      component="img"
                      src={product.images[1]}
                      alt={product.name}
                      sx={{ 
                        width: '100%', height: '100%', objectFit: 'cover',
                        filter: 'brightness(0.97)',
                        position: 'absolute', top: 0, left: 0,
                        opacity: hoveredProduct === product.id ? 1 : 0, // Smoothly shifts into visibility state matrix
                        transition: 'opacity 0.5s cubic-bezier(0.25, 1, 0.5, 1)'
                      }}
                    />
                  </Box>

                  {/* Action Slide overlay Buttons list */}
                  <AnimatePresence>
                    {hoveredProduct === product.id && (
                      <Stack 
                        component={motion.div}
                        initial={{ opacity: 0, x: 15 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 15 }}
                        transition={{ duration: 0.22 }}
                        spacing={1.2}
                        sx={{ position: 'absolute', bottom: 25, right: 15, zIndex: 20 }}
                      >
                        <IconButton 
                          onClick={() => { setSelectedProduct(product); setQuickViewOpen(true); }}
                          sx={{ bgcolor: '#fff', color: '#111', p: 1.2, boxShadow: '0 4px 12px rgba(0,0,0,0.06)', '&:hover': { bgcolor: '#111', color: '#fff' } }}
                        >
                          <RemoveRedEyeIcon sx={{ fontSize: '16px' }} />
                        </IconButton>
                        <IconButton sx={{ bgcolor: '#fff', color: '#111', p: 1.2, boxShadow: '0 4px 12px rgba(0,0,0,0.06)', '&:hover': { bgcolor: '#111', color: '#fff' } }}>
                          <ShoppingBagIcon sx={{ fontSize: '16px' }} />
                        </IconButton>
                        <IconButton sx={{ bgcolor: '#fff', color: '#111', p: 1.2, boxShadow: '0 4px 12px rgba(0,0,0,0.06)', '&:hover': { bgcolor: '#111', color: '#fff' } }}>
                          <FavoriteBorderIcon sx={{ fontSize: '16px' }} />
                        </IconButton>
                        <IconButton sx={{ bgcolor: '#fff', color: '#111', p: 1.2, boxShadow: '0 4px 12px rgba(0,0,0,0.06)', '&:hover': { bgcolor: '#111', color: '#fff' } }}>
                          <SyncIcon sx={{ fontSize: '16px' }} />
                        </IconButton>
                      </Stack>
                    )}
                  </AnimatePresence>
                </Box>

                {/* Product Titles Metadata */}
                <Stack spacing={1} alignItems="center" sx={{ textAlign: 'center' }}>
                  <Typography variant="body1" sx={{ fontFamily: '"Montserrat", sans-serif', fontWeight: 500, fontSize: '15px', color: '#111', '&:hover': { color: '#cda587' }, transition: 'color 0.2s' }}>
                    {product.name}
                  </Typography>
                  {product.rating > 0 && <Rating value={product.rating} precision={0.5} readOnly sx={{ fontSize: '13px', color: '#111' }} />}
                  <Stack direction="row" spacing={1.5}>
                    <Typography sx={{ fontFamily: 'Montserrat', fontWeight: 600, fontSize: '14px', color: '#888', textDecoration: 'line-through' }}>${product.oldPrice.toFixed(2)}</Typography>
                    <Typography sx={{ fontFamily: 'Montserrat', fontWeight: 600, fontSize: '14px', color: '#111' }}>${product.price.toFixed(2)}</Typography>
                  </Stack>
                </Stack>

              </Grid>
            ))}
          </Grid>
        </Box>

      </Box>

      <Footer />

      <QuickViewModal 
        open={quickViewOpen} 
        handleClose={() => { setQuickViewOpen(false); setSelectedProduct(null); }} 
        product={selectedProduct} 
      />
    </Box>
  );
};

export default Shop;