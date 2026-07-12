import React, { useState, useEffect } from 'react';
import { Box, Modal, Fade, Backdrop, Typography, Stack, IconButton, Button, Rating, Grid, CircularProgress, TextField, Divider } from '@mui/material';
import { Close as CloseIcon, ShoppingBagOutlined as BagIcon, Add as AddIcon, Remove as RemoveIcon, StarBorderOutlined as StarIcon } from '@mui/icons-material';
import api from "../Auth/AxiosInstance";
import endpoints from "../Auth/endpoints";

const QuickViewModal = ({ open, handleClose, product }) => {
  const [quantity, setQuantity] = useState(1);
  const [btnLoading, setBtnLoading] = useState(false);
  
  // Review Flow State Containers
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [userRating, setUserRating] = useState(5);
  const [userComment, setUserComment] = useState('');
  const [reviewSubmitLoading, setReviewSubmitLoading] = useState(false);

  // Phase 1: Fetch Reviews Workflow
  const fetchProductReviews = async () => {
    if (!product?._id) return;
    setReviewsLoading(true);
    try {
      const baseUrl = endpoints.reviews?.get_review || "/api/v1/reveiws/product-review";
      const res = await api.get(`${baseUrl}/${product._id}`);
      setReviews(res?.data?.data || []);
    } catch (err) {
      console.error("Failed parsing studio reviews:", err);
    } finally {
      setReviewsLoading(false);
    }
  };

  useEffect(() => {
    if (open && product?._id) {
      fetchProductReviews();
      setQuantity(1);
      setUserComment('');
      setUserRating(5);
    }
  }, [open, product]);

  if (!product) return null;

  const handleIncrease = () => {
    if (quantity < (product.stock || 10)) setQuantity(prev => prev + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(prev => prev - 1);
  };

  // Phase 2: Add To Cart Handler
  const handleAddToCart = async () => {
    setBtnLoading(true);
    try {
      const url = endpoints.cart?.add || "/api/v1/cart/add-cart";
      const res = await api.post(url, { 
        productId: product._id, 
        quantity: quantity 
      });
      if (res?.data?.success) {
        alert("Product added to bag successfully!");
        handleClose();
      }
    } catch (err) {
      console.error("Cart action trigger failed:", err);
      alert(err?.response?.data?.message || "Something went wrong.");
    } finally {
      setBtnLoading(false);
    }
  };

  // Phase 3: Submit Review Handler
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!userComment.trim()) return;

    setReviewSubmitLoading(true);
    try {
      const storedUser = localStorage.getItem("nexus_user");
      const parsedUser = storedUser ? JSON.parse(storedUser) : null;
      const adminId = parsedUser?.id || parsedUser?._id; 

      const url = endpoints.reviews?.add_review || "/api/v1/reviews/add-review";
      const payload = {
        productId: product._id,
        adminId: adminId || null,
        rating: String(userRating),
        comment: userComment.trim()
      };

      const res = await api.post(url, payload);
      if (res?.data) {
        setUserComment('');
        setUserRating(5);
        fetchProductReviews(); // Reload dynamic sync list
      }
    } catch (err) {
      console.error("Review creation failed:", err);
      alert(err?.response?.data?.message || "Failed to submit review.");
    } finally {
      setReviewSubmitLoading(false);
    }
  };

  const originalPrice = product.price ? Math.round(product.price * 1.2) : 0;

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{ 
        backdrop: { 
          timeout: 400,
          sx: { backdropFilter: 'blur(8px)', bgcolor: 'rgba(26, 26, 26, 0.4)' } 
        } 
      }}
    >
      <Fade in={open}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '95%', sm: '90%', md: '1020px' },
          maxHeight: { xs: '90vh', md: '92vh' },
          overflowY: 'auto',
          background: 'linear-gradient(145deg, #F8F6F2 0%, #F3EFE9 100%)',
          boxShadow: 'inset 0 0 60px rgba(165,124,90,0.03), 0px 30px 60px rgba(27,22,19,0.08)',
          border: '1px solid #E6DFD3',
          p: { xs: 3, sm: 4, md: 5 },
          boxSizing: 'border-box',
          zIndex: 1400,
          borderRadius: '2px',
          '&::-webkit-scrollbar': { width: '4px' },
          '&::-webkit-scrollbar-thumb': { bgcolor: '#E0DCD5' }
        }}>
          {/* Close Action Trigger */}
          <IconButton 
            onClick={handleClose} 
            sx={{ 
              position: 'absolute', 
              top: 24, 
              right: 24, 
              color: '#1A1A1A',
              bgcolor: 'rgba(255,255,255,0.4)',
              backdropFilter: 'blur(4px)',
              border: '1px solid rgba(0,0,0,0.03)',
              zIndex: 10,
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': { 
                transform: 'rotate(90deg)', 
                color: '#A57C5A',
                bgcolor: 'white',
                borderColor: '#A57C5A'
              }
            }}
          >
            <CloseIcon sx={{ fontSize: '18px' }} />
          </IconButton>

          <Grid container spacing={{ xs: 4, md: 5 }} disableEqualOverflow>
            {/* Left Column: Product Image Preview Component */}
            <Grid size={{ xs: 12, md: 5 }}>
              <Box 
                sx={{ 
                  width: '100%', 
                  aspectRatio: '3/4', 
                  overflow: 'hidden',
                  bgcolor: '#FAF8F5',
                  border: '1px solid rgba(26,26,26,0.05)',
                  boxShadow: '0 12px 30px rgba(27,22,19,0.03)',
                  position: 'sticky',
                  top: 0
                }}
              >
                <Box 
                  component="img" 
                  src={product.images?.[0] || "https://via.placeholder.com/300x400"} 
                  alt={product.title} 
                  sx={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                    transition: 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
                    '&:hover': { transform: 'scale(1.04)' }
                  }} 
                />
              </Box>
            </Grid>

            {/* Right Column: Spec metadata details & Dynamic Review workflow */}
            <Grid size={{ xs: 12, md: 7 }} sx={{ display: 'flex', flexDirection: 'column' }}>
              
              {/* Category tag */}
              <Typography sx={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#A57C5A', mb: 1.5, fontFamily: 'Montserrat' }}>
                {product.category || "CURATED STUDIO COLLECTION"}
              </Typography>

              <Typography variant="h4" sx={{ fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 400, mb: 1.5, fontSize: { xs: '24px', md: '30px' }, color: '#1A1A1A', lineHeight: 1.25, letterSpacing: '-0.01em' }}>
                {product.title}
              </Typography>
              
              <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2.5 }}>
                <Rating value={product.rating || 5} precision={0.5} readOnly sx={{ fontSize: '13px', color: '#1A1A1A' }} />
                <Typography sx={{ fontFamily: 'Montserrat', fontSize: '11px', color: 'text.secondary', letterSpacing: '0.05em', fontWeight: 500 }}>
                  ({reviews.length} Store Reviews)
                </Typography>
              </Stack>

              <Stack direction="row" spacing={2} alignItems="baseline" sx={{ mb: 3, pb: 2, borderBottom: '1px dashed #E0DCD5' }}>
                <Typography sx={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: '24px', color: '#1A1A1A', letterSpacing: '-0.02em' }}>
                  ₹{product.price}
                </Typography>
                {originalPrice > product.price && (
                  <Typography sx={{ fontFamily: 'Montserrat', fontSize: '14px', color: '#8A857C', textDecoration: 'line-through', fontWeight: 400 }}>
                    ₹{originalPrice}
                  </Typography>
                )}
              </Stack>

              <Typography variant="body2" sx={{ fontFamily: 'Montserrat', color: '#4A4640', lineHeight: 1.75, mb: 3, fontSize: '13px', letterSpacing: '0.01em' }}>
                {product?.description || "High-end conceptual piece execution featuring clean modern contours and minimal signature finish structures."}
              </Typography>
              
              {/* Stock Status Tracker Indicator */}
              <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 4 }}>
                <Box sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: (product?.stock || 0) > 0 ? '#2E7D32' : '#9C2B2B', boxShadow: `0 0 8px ${(product?.stock || 0) > 0 ? '#2E7D32' : '#9C2B2B'}` }} />
                <Typography variant="caption" sx={{ fontFamily: 'Montserrat', color: '#1A1A1A', fontWeight: 600, fontSize: '11px', letterSpacing: '0.03em', textTransform: 'uppercase' }}>
                  {(product?.stock || 0) > 0 ? `In Stock: Only ${product.stock} left` : 'Out of Stock'}
                </Typography>
              </Stack>

              {/* Action Rows Container Block */}
              <Stack direction="row" spacing={2} sx={{ width: '100%', mb: 5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #1A1A1A', bgcolor: 'rgba(255,255,255,0.4)', backdropFilter: 'blur(4px)' }}>
                  <IconButton size="small" onClick={handleDecrease} disabled={quantity <= 1 || btnLoading} sx={{ borderRadius: 0, p: 1.4, color: '#1A1A1A' }}>
                    <RemoveIcon sx={{ fontSize: '11px' }} />
                  </IconButton>
                  <Typography sx={{ width: 38, textAlign: 'center', fontSize: '13px', fontWeight: 700, fontFamily: 'Montserrat', color: '#1A1A1A' }}>
                    {quantity}
                  </Typography>
                  <IconButton size="small" onClick={handleIncrease} disabled={quantity >= (product.stock || 10) || btnLoading} sx={{ borderRadius: 0, p: 1.4, color: '#1A1A1A' }}>
                    <AddIcon sx={{ fontSize: '11px' }} />
                  </IconButton>
                </Box>

                <Button 
                  variant="contained" 
                  onClick={handleAddToCart}
                  disabled={btnLoading || !product.stock}
                  endIcon={!btnLoading && <BagIcon sx={{ fontSize: '15px !important' }} />}
                  sx={{ 
                    flexGrow: 1,
                    bgcolor: '#1A1A1A', 
                    color: 'white', 
                    borderRadius: 0, 
                    py: 1.8, 
                    fontFamily: 'Montserrat', 
                    fontWeight: 600, 
                    fontSize: '11px',
                    letterSpacing: '0.2em',
                    boxShadow: 'none',
                    '&:hover': { bgcolor: '#A57C5A', boxShadow: 'none' } 
                  }}
                >
                  {btnLoading ? <CircularProgress size={16} color="inherit" /> : 'ADD TO BAG'}
                </Button>
              </Stack>

              <Divider sx={{ borderColor: '#E6DFD3', mb: 4 }} />

              {/* --- PREMIUM MEMBER STUDIO REVIEWS LAYER --- */}
              <Typography sx={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#1A1A1A', mb: 3, fontFamily: 'Montserrat' }}>
                MEMBER STATEMENT ({reviews.length})
              </Typography>

              {/* Review Input Box Form Container */}
              <Box component="form" onSubmit={handleSubmitReview} sx={{ bgcolor: 'rgba(255,255,255,0.3)', border: '1px solid #E6DFD3', p: 2.5, mb: 4 }}>
                <Stack spacing={2}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Typography sx={{ fontFamily: 'Montserrat', fontSize: '12px', fontWeight: 600, color: '#4A4640' }}>YOUR RATING:</Typography>
                    <Rating 
                      value={userRating} 
                      onChange={(event, newValue) => setUserRating(newValue || 5)} 
                      sx={{ fontSize: '16px', color: '#1A1A1A' }} 
                    />
                  </Stack>
                  <Stack direction="row" spacing={1.5}>
                    <TextField
                      fullWidth
                      size="small"
                      multiline
                      rows={1}
                      placeholder="Share your experience (e.g., very chalak)..."
                      value={userComment}
                      onChange={(e) => setUserComment(e.target.value)}
                      slotProps={{
                        input: { sx: { borderRadius: 0, fontSize: '12.5px', fontFamily: 'Montserrat', bgcolor: 'white' } }
                      }}
                    />
                    <Button
                      type="submit"
                      disabled={reviewSubmitLoading || !userComment.trim()}
                      variant="contained"
                      sx={{
                        bgcolor: '#1A1A1A',
                        color: 'white',
                        borderRadius: 0,
                        px: 3,
                        fontSize: '10px',
                        fontWeight: 700,
                        letterSpacing: '0.1em',
                        boxShadow: 'none',
                        fontFamily: 'Montserrat',
                        '&:hover': { bgcolor: '#A57C5A', boxShadow: 'none' }
                      }}
                    >
                      {reviewSubmitLoading ? <CircularProgress size={14} color="inherit" /> : 'POST'}
                    </Button>
                  </Stack>
                </Stack>
              </Box>

              {/* Render Review Items Wrapper */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxHeight: '260px', overflowY: 'auto', pr: 1 }}>
                {reviewsLoading ? (
                  <Box sx={{ display: 'flex', py: 2, justifyContent: 'center' }}>
                    <CircularProgress size={20} color="inherit" />
                  </Box>
                ) : reviews.length === 0 ? (
                  <Typography variant="body2" sx={{ fontFamily: 'Montserrat', color: 'text.secondary', fontStyle: 'italic', fontSize: '12px', textAlign: 'center', py: 2 }}>
                    No member reviews recorded yet for this piece.
                  </Typography>
                ) : (
                  reviews.map((rev, index) => (
                    <Box 
                      key={rev._id || index} 
                      sx={{ 
                        p: 2, 
                        bgcolor: 'rgba(255,255,255,0.4)', 
                        borderLeft: '2px solid #A57C5A',
                        borderBottom: '1px solid rgba(0,0,0,0.02)'
                      }}
                    >
                      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 1 }}>
                        <Box>
                          <Typography sx={{ fontFamily: 'Montserrat', fontSize: '12px', fontWeight: 600, color: '#1A1A1A' }}>
                            {rev.adminId?.name || "Anonymous Guest"}
                          </Typography>
                          <Typography sx={{ fontFamily: 'Montserrat', fontSize: '10px', color: 'text.secondary' }}>
                            {rev.adminId?.email || "verified purchaser"}
                          </Typography>
                        </Box>
                        <Rating value={Number(rev.rating) || 5} size="small" readOnly sx={{ fontSize: '11px', color: '#1A1A1A' }} />
                      </Stack>
                      <Typography variant="body2" sx={{ fontFamily: 'Montserrat', color: '#4A4640', fontSize: '12.5px', lineHeight: 1.5, pl: 0.5 }}>
                        {rev.comment}
                      </Typography>
                    </Box>
                  ))
                )}
              </Box>

            </Grid>
          </Grid>
        </Box>
      </Fade>
    </Modal>
  );
};

export default QuickViewModal;