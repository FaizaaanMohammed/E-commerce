import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardMedia, 
  CardContent, 
  Button, 
  IconButton, 
  Box, 
  Chip 
} from '@mui/material';
import { 
  Close as CloseIcon, 
  ShoppingBagOutlined as ShoppingBagOutlinedIcon 
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const MotionGridItem = motion.create(Grid);

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: "Premium Woolen Beanie",
      category: "Clothing",
      price: "₹1,499",
      oldPrice: "₹2,199",
      discount: "-30%",
      image: "https://images.unsplash.com/photo-1576871337622-98d48d435353?q=80&w=600"
    },
    {
      id: 2,
      name: "Minimalist Summer Hat",
      category: "Accessories",
      price: "₹2,799",
      oldPrice: "₹3,999",
      discount: "-30%",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600"
    },
    {
      id: 3,
      name: "Oversized Cotton Trench",
      category: "Outerwear",
      price: "₹5,499",
      oldPrice: "₹7,999",
      discount: "-31%",
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=600"
    },
    {
      id: 4,
      name: "Structured Tailored Blazer",
      category: "Clothing",
      price: "₹4,199",
      oldPrice: "₹5,999",
      discount: "-30%",
      image: "https://images.unsplash.com/photo-1548624149-f7b31603311f?q=80&w=600"
    }
  ]);

  const handleRemove = (id) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== id));
  };

  return (
    <Box sx={{ bgcolor: '#FBF9F6', minHeight: '100vh', py: { xs: 6, md: 10 }, overflow: 'hidden' }}>
      <Container maxWidth="lg">
        
        {/* Centered and Scaled Down Header */}
        <Box sx={{ mb: { xs: 6, md: 8 }, textAlignment: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography sx={{ fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#A57C5A', fontWeight: 700, mb: 1 }}>
            NEXUS OS. CURATED
          </Typography>
          <Typography variant="h4" sx={{ fontFamily: 'serif', fontWeight: 400, color: '#1A1A1A', letterSpacing: '0.02em', fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.6rem' }, textAlign: 'center' }}>
            Your Wishlist
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic', mt: 1, fontFamily: 'serif', textAlign: 'center' }}>
            A refined collection of your selected pieces ({wishlistItems.length} items)
          </Typography>
        </Box>

        {wishlistItems.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 12, border: '1px dashed #EDEDED', bgcolor: 'white' }}>
            <Typography sx={{ color: 'text.secondary', mb: 3, fontFamily: 'serif', fontSize: '1.1rem' }}>No pieces saved at the moment.</Typography>
            <Button variant="contained" sx={{ bgcolor: '#1A1A1A', borderRadius: 0, px: 5, py: 2, fontSize: '12px', letterSpacing: '0.2em', '&:hover': { bgcolor: '#A57C5A' } }}>
              Return to Shop
            </Button>
          </Box>
        ) : (
          /* Clean Grid View - Added clear Top Margin to prevent heading overlapping */
          <Grid container spacing={{ xs: 3, sm: 4, md: 5 }} sx={{ mt: 2 }}>
            <AnimatePresence>
              {wishlistItems.map((item, index) => (
                <MotionGridItem 
                  item 
                  key={item.id} 
                  size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <Card sx={{ 
                    bgcolor: 'transparent', 
                    borderRadius: 0, 
                    boxShadow: 'none', 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    position: 'relative',
                    overflow: 'visible',
                    '&:hover .bag-btn': { opacity: 1, transform: 'translateY(0)' },
                    '&:hover .product-img': { transform: 'scale(1.03)' }
                  }}>
                    
                    {/* Floating Chip and Actions Interface */}
                    <Box sx={{ position: 'absolute', top: -8, left: -6, right: -6, display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 3, pointerEvents: 'none' }}>
                      <Chip 
                        label={item.discount} 
                        sx={{ 
                          bgcolor: '#9C2B2B', 
                          color: 'white', 
                          borderRadius: 0, 
                          fontWeight: 600, 
                          fontSize: '10px', 
                          height: '20px', 
                          pointerEvents: 'auto'
                        }} 
                      />
                      <IconButton 
                        onClick={() => handleRemove(item.id)}
                        size="small"
                        sx={{ 
                          bgcolor: 'white', 
                          border: '1px solid #1A1A1A',
                          boxShadow: '3px 3px 0px #1A1A1A',
                          padding: '5px',
                          pointerEvents: 'auto',
                          transition: '0.2s',
                          '&:hover': { bgcolor: '#1A1A1A', color: 'white', boxShadow: '0px 0px 0px #1A1A1A' } 
                        }}
                      >
                        <CloseIcon sx={{ fontSize: '12px' }} />
                      </IconButton>
                    </Box>

                    {/* Image Window Frame */}
                    <Box sx={{ 
                      width: '100%', 
                      pt: '135%', 
                      position: 'relative', 
                      overflow: 'hidden', 
                      bgcolor: '#F5F5F5',
                      boxShadow: '0px 8px 24px rgba(0,0,0,0.02)'
                    }}>
                      <CardMedia
                        component="img"
                        image={item.image}
                        alt={item.name}
                        className="product-img"
                        sx={{ 
                          position: 'absolute', 
                          top: 0, 
                          left: 0, 
                          width: '100%', 
                          height: '100%', 
                          objectFit: 'cover',
                          transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                        }}
                      />

                      {/* Desktop Hover Quick Action Button */}
                      <Box sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        p: 2,
                        background: 'linear-gradient(to top, rgba(26,26,26,0.3), transparent)',
                        display: { xs: 'none', md: 'block' }
                      }}>
                        <Button 
                          className="bag-btn"
                          fullWidth 
                          variant="contained" 
                          startIcon={<ShoppingBagOutlinedIcon sx={{ fontSize: '13px !important' }} />}
                          sx={{ 
                            bgcolor: 'white', 
                            color: '#1A1A1A', 
                            borderRadius: 0, 
                            py: 1.2, 
                            fontSize: '11px', 
                            fontWeight: 600,
                            letterSpacing: '0.05em', 
                            boxShadow: 'none',
                            opacity: 0,
                            transform: 'translateY(10px)',
                            transition: 'all 0.3s ease-out',
                            '&:hover': { bgcolor: '#1A1A1A', color: 'white' } 
                          }}
                        >
                          Quick Add
                        </Button>
                      </Box>
                    </Box>

                    {/* Clean Details Grid below the Cards */}
                    <CardContent sx={{ p: 0, pt: 2, pb: '0px !important', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                      <Typography sx={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#A57C5A', fontWeight: 600, mb: 0.5 }}>
                        {item.category}
                      </Typography>
                      
                      <Typography sx={{ 
                        fontFamily: 'serif',
                        fontSize: '15px', 
                        fontWeight: 400, 
                        color: '#1A1A1A', 
                        lineHeight: 1.3,
                        mb: 0.5, 
                        display: '-webkit-box', 
                        WebkitLineClamp: 2, 
                        WebkitBoxOrient: 'vertical', 
                        overflow: 'hidden' 
                      }}>
                        {item.name}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1.5, mt: 'auto' }}>
                        <Typography sx={{ fontWeight: 600, color: '#1A1A1A', fontSize: '14px' }}>
                          {item.price}
                        </Typography>
                        <Typography sx={{ fontSize: '11px', color: 'text.disabled', textDecoration: 'line-through' }}>
                          {item.oldPrice}
                        </Typography>
                      </Box>

                      {/* Mobile Visible Primary Button */}
                      <Button 
                        fullWidth 
                        variant="contained" 
                        startIcon={<ShoppingBagOutlinedIcon sx={{ fontSize: '13px !important' }} />}
                        sx={{ 
                          mt: 1.5, 
                          display: { xs: 'flex', md: 'none' },
                          bgcolor: '#1A1A1A', 
                          color: 'white', 
                          borderRadius: 0, 
                          py: 1, 
                          fontSize: '11px', 
                          boxShadow: 'none' 
                        }}
                      >
                        Add to Bag
                      </Button>
                    </CardContent>

                  </Card>
                </MotionGridItem>
              ))}
            </AnimatePresence>
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default Wishlist;