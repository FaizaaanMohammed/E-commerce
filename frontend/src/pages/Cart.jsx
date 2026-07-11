import React, { useEffect, useState } from 'react';
import { 
  Container, Typography, Grid, Button, IconButton, Box, Divider, 
  TextField, Stack, FormControlLabel, Radio, RadioGroup, FormControl,
  Checkbox, Stepper, Step, StepLabel, Collapse, CircularProgress 
} from '@mui/material';
import { 
  Close as CloseIcon, Add as AddIcon, Remove as RemoveIcon,
  ArrowRightAlt as ArrowRightAltIcon, WalletOutlined as WalletIcon
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import api from "../Auth/AxiosInstance";
import endpoints from "../Auth/endpoints";

const Cart = () => {
  // State Management
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false); 

  const [paymentMethod, setPaymentMethod] = useState('COD'); 
  const [useCoins, setUseCoins] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const [upiId, setUpiId] = useState('');
  const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvv: '' });
  
  const userCoinsBalance = 50000; 
  const coinsDiscountValue = userCoinsBalance / 100; 

  // Phase 1: Fetch Cart details from Backend
  const fetchCartDetails = async () => {
    try {
      // 🔥 FIXED: endpoints.cart.getCart mapping
      const url = endpoints.cart?.getCart || "/api/v1/cart/get-cart";
      const res = await api.get(url);
      if (res?.data?.success) {
        const fetchedItems = res?.data?.data?.products || [];
        const structuredItems = fetchedItems.map(item => ({
          id: item.productId?._id,
          name: item.productId?.title || "Unknown Product",
          category: item.productId?.category || "General",
          price: item.productId?.price || 0,
          quantity: item.quantity || 1,
          image: item.productId?.images?.[0] || "https://via.placeholder.com/300x400",
          stock: item.productId?.stock || 0
        }));
        setCartItems(structuredItems);
      }
    } catch (err) {
      console.error("Error fetching cart:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartDetails();
  }, []);

  // Phase 2: Update Item Quantity Sync with Backend
  const updateQuantity = async (id, delta, currentQty) => {
    const targetQty = currentQty + delta;
    if (targetQty <= 0) return;

    setActionLoading(true);
    try {
      const url = endpoints.cart?.add || "/api/v1/cart/add-cart";
      await api.post(url, { productId: id, quantity: delta });
      
      setCartItems(prev => prev.map(item => 
        item.id === id ? { ...item, quantity: targetQty } : item
      ));
    } catch (err) {
      console.error("Error syncing quantity:", err);
    } finally {
      setActionLoading(false);
    }
  };

  // Phase 3: Remove Product completely from Cart
  const handleRemove = async (id) => {
    setActionLoading(true);
    try {
      // 🔥 FIXED: endpoints.cart.cartRemove mapping
      const url = endpoints.cart?.cartRemove || `/api/v1/cart/remove-item`;
      await api.delete(`${url}/${id}`);
      setCartItems(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      console.error("Error removing item:", err);
    } finally {
      setActionLoading(false);
    }
  };

  // Phase 4: Submit & Create Order API Call Trigger Logic (Only remainingPaymentMethod)
  const handlePlaceOrder = async () => {
    setActionLoading(true);
    try {
      // FIXED: endpoints.orders.postOrder mapping
      const url = endpoints.orders?.postOrder ;
      
      const payload = {
        remainingPaymentMethod: paymentMethod // Sends "COD", "UPI", or "CARD"
      };

      const res = await api.post(endpoints.orders.postOrder, payload);

      if (res?.data?.success) {
        setOrderPlaced(true);
        setTimeout(() => setActiveStep(1), 2000); 
        setTimeout(() => setActiveStep(2), 4500); 
      }
    } catch (err) {
      console.error("Error creating order:", err);
      alert(err?.response?.data?.message || "Failed to place your order. Please try again.");
    } finally {
      setActionLoading(false);
    }
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 4000 || subtotal === 0 ? 0 : 150;
  const coinsDeduction = useCoins ? coinsDiscountValue : 0;
  const total = Math.max(0, subtotal + shipping - coinsDeduction);

  const steps = ['Order Placed', 'Processing & Quality Check', 'Shipped'];

  if (loading) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', bgcolor: '#FBF9F6' }}>
        <CircularProgress color="inherit" size={40} />
      </Box>
    );
  }

  if (orderPlaced) {
    return (
      <Box sx={{ bgcolor: '#FBF9F6', minHeight: '100vh', display: 'flex', alignItems: 'center', py: 8, fontFamily: 'Montserrat, sans-serif' }}>
        <Container maxWidth="md">
          <Box sx={{ bgcolor: 'white', border: '1px solid #EDEDED', p: { xs: 4, md: 6 }, textAlign: 'center' }}>
            <Typography variant="h4" sx={{ fontFamily: 'serif', fontWeight: 500, mb: 1, color: '#1A1A1A', letterSpacing: '-0.01em' }}>Thank You For Your Order</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 6, fontFamily: 'Montserrat, sans-serif' }}>Your transaction was successful. Track real-time progress below.</Typography>
            
            <Box sx={{ width: '100%', my: 4 }}>
              <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                  <Step key={label} sx={{
                    '& .MuiStepLabel-label.Mui-active': { color: '#1A1A1A', fontWeight: 600, fontFamily: 'Montserrat, sans-serif' },
                    '& .MuiStepLabel-label': { fontFamily: 'Montserrat, sans-serif', fontSize: '12px' },
                    '& .MuiStepIcon-root.Mui-active': { color: '#1A1A1A' },
                    '& .MuiStepIcon-root.Mui-completed': { color: '#A57C5A' }
                  }}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>

            <Button variant="contained" href="/shop" sx={{ mt: 4, bgcolor: '#1A1A1A', borderRadius: 0, px: 4, py: 1.5, fontFamily: 'Montserrat, sans-serif', fontWeight: 600, letterSpacing: '0.1em', '&:hover': { bgcolor: '#A57C5A' } }}>
              Continue Shopping
            </Button>
          </Box>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: '#FBF9F6', minHeight: '100vh', py: { xs: 6, md: 10 }, fontFamily: 'Montserrat, sans-serif', opacity: actionLoading ? 0.7 : 1, transition: 'opacity 0.2s' }}>
      <Container maxWidth="xl">
        
        {/* Header Section */}
        <Box sx={{ mb: { xs: 6, md: 8 }, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <Typography sx={{ fontSize: '11px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#A57C5A', fontWeight: 600, mb: 1.5, fontFamily: 'Montserrat, sans-serif' }}>
            NEXUS OS. SHOPPING BAG
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: 400, color: '#1A1A1A', fontSize: { xs: '2.2rem', sm: '2.8rem', md: '3.4rem' }, fontFamily: 'Playfair Display, Georgia, serif', letterSpacing: '-0.01em', lineHeight: 1.2 }}>
            Your Cart
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1.5, fontFamily: 'Montserrat, sans-serif', fontSize: '12px', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
            ({cartItems.length} items in your bag)
          </Typography>
        </Box>

        {cartItems.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 12, border: '1px dashed #EDEDED', bgcolor: 'white', maxWidth: 'md', mx: 'auto' }}>
            <Typography sx={{ color: 'text.secondary', mb: 3, fontFamily: 'Montserrat, sans-serif', fontSize: '1.1rem' }}>Your shopping bag is completely empty.</Typography>
            <Button variant="contained" href="/shop" sx={{ bgcolor: '#1A1A1A', borderRadius: 0, px: 5, py: 2, fontSize: '12px', letterSpacing: '0.2em', fontFamily: 'Montserrat, sans-serif', '&:hover': { bgcolor: '#A57C5A' } }}>
              Continue Shopping
            </Button>
          </Box>
        ) : (
          <Grid container spacing={{ xs: 4, lg: 6 }}>
            
            {/* Left Side List */}
            <Grid item xs={12} lg={8}>
              <Stack spacing={2.5}>
                <AnimatePresence>
                  {cartItems.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Box sx={{ 
                        display: 'flex', 
                        flexDirection: { xs: 'column', sm: 'row' }, 
                        alignItems: { xs: 'flex-start', sm: 'center' }, 
                        bgcolor: 'white', 
                        p: 2.5, 
                        border: '1px solid #EDEDED', 
                        position: 'relative',
                        gap: 3,
                        transition: '0.3s',
                        '&:hover': { borderColor: '#1A1A1A' }
                      }}>
                        <IconButton 
                          onClick={() => handleRemove(item.id)}
                          size="small"
                          disabled={actionLoading}
                          sx={{ position: 'absolute', top: 12, right: 12, color: '#1A1A1A', '&:hover': { color: '#9C2B2B' } }}
                        >
                          <CloseIcon sx={{ fontSize: '16px' }} />
                        </IconButton>

                        <Box sx={{ width: { xs: '100%', sm: 90 }, height: 120, flexShrink: 0, overflow: 'hidden', bgcolor: '#F5F5F5' }}>
                          <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </Box>

                        <Box sx={{ flexGrow: 1, pr: { sm: 4 } }}>
                          <Typography sx={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#A57C5A', fontWeight: 700, mb: 0.5, fontFamily: 'Montserrat, sans-serif' }}>
                            {item.category}
                          </Typography>
                          <Typography sx={{ fontSize: '15px', fontWeight: 500, color: '#1A1A1A', mb: 0.5, fontFamily: 'Montserrat, sans-serif', letterSpacing: '0.02em' }}>
                            {item.name}
                          </Typography>
                          <Typography sx={{ fontWeight: 600, fontSize: '13px', color: '#1A1A1A', fontFamily: 'Montserrat, sans-serif' }}>
                            ₹{item.price}
                          </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #EDEDED', bgcolor: '#FAF8F5', alignSelf: { xs: 'stretch', sm: 'auto' }, justifyContent: 'space-between' }}>
                          <IconButton size="small" disabled={actionLoading} onClick={() => updateQuantity(item.id, -1, item.quantity)} sx={{ borderRadius: 0, p: 0.8 }}>
                            <RemoveIcon sx={{ fontSize: '12px' }} />
                          </IconButton>
                          <Typography sx={{ width: 35, textAlign: 'center', fontSize: '13px', fontWeight: 600, fontFamily: 'Montserrat, sans-serif' }}>
                            {item.quantity}
                          </Typography>
                          <IconButton size="small" disabled={actionLoading || item.quantity >= item.stock} onClick={() => updateQuantity(item.id, 1, item.quantity)} sx={{ borderRadius: 0, p: 0.8 }}>
                            <AddIcon sx={{ fontSize: '12px' }} />
                          </IconButton>
                        </Box>

                        <Box sx={{ minWidth: { sm: 90 }, textAlign: { sm: 'right' } }}>
                          <Typography sx={{ fontWeight: 600, color: '#1A1A1A', fontSize: '14px', fontFamily: 'Montserrat, sans-serif' }}>
                            ₹{item.price * item.quantity}
                          </Typography>
                        </Box>
                      </Box>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </Stack>
            </Grid>

            {/* Right Side Summary Panel */}
            <Grid item xs={12} lg={4}>
              <Box sx={{ bgcolor: 'white', border: '1px solid #EDEDED', p: { xs: 3, md: 4 }, position: 'sticky', top: 30 }}>
                
                {/* Coins Block */}
                <Box sx={{ bgcolor: '#FAF8F5', p: 2, mb: 3, border: '1px dashed #A57C5A' }}>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5 }}>
                    <WalletIcon sx={{ color: '#A57C5A', fontSize: 18 }} />
                    <Typography sx={{ fontSize: '11px', fontWeight: 700, color: '#1A1A1A', letterSpacing: '0.05em', fontFamily: 'Montserrat, sans-serif' }}>NEXUS WALLET COINS</Typography>
                  </Stack>
                  <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 1, fontFamily: 'Montserrat, sans-serif' }}>
                    Available: <b>{userCoinsBalance} coins</b> (100 coins = ₹1)
                  </Typography>
                  <FormControlLabel
                    control={
                      <Checkbox 
                        checked={useCoins} 
                        onChange={(e) => setUseCoins(e.target.checked)} 
                        size="small"
                        sx={{ color: '#1A1A1A', p: 0.5, mr: 0.5, '&.Mui-checked': { color: '#1A1A1A' } }}
                      />
                    }
                    label={<Typography sx={{ fontSize: '12px', fontWeight: 500, fontFamily: 'Montserrat, sans-serif' }}>Redeem to save ₹{coinsDiscountValue}</Typography>}
                  />
                </Box>

                <Typography sx={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', mb: 2, color: '#1A1A1A', fontFamily: 'Montserrat, sans-serif' }}>
                  Payment Option
                </Typography>
                <FormControl component="fieldset" fullWidth>
                  <RadioGroup value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                    
                    <Box sx={{ border: '1px solid #EDEDED', p: 1.5, mb: 1, transition: '0.2s', borderColor: paymentMethod === 'COD' ? '#1A1A1A' : '#EDEDED' }}>
                      <FormControlLabel value="COD" control={<Radio sx={{ color: '#1A1A1A', '&.Mui-checked': { color: '#1A1A1A' } }} size="small" />} label={<Typography sx={{ fontSize: '13px', fontWeight: 500, fontFamily: 'Montserrat, sans-serif' }}>Cash On Delivery (COD)</Typography>} />
                    </Box>

                    <Box sx={{ border: '1px solid #EDEDED', p: 1.5, mb: 1, transition: '0.2s', borderColor: paymentMethod === 'UPI' ? '#1A1A1A' : '#EDEDED' }}>
                      <FormControlLabel value="UPI" control={<Radio sx={{ color: '#1A1A1A', '&.Mui-checked': { color: '#1A1A1A' } }} size="small" />} label={<Typography sx={{ fontSize: '13px', fontWeight: 500, fontFamily: 'Montserrat, sans-serif' }}>Instant UPI / Google Pay</Typography>} />
                      <Collapse in={paymentMethod === 'UPI'}>
                        <Box sx={{ pt: 1.5 }}>
                          <TextField 
                            fullWidth
                            size="small"
                            placeholder="username@okaxis"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            slotProps={{
                              input: { sx: { borderRadius: 0, fontSize: '12px', fontFamily: 'Montserrat, sans-serif' } }
                            }}
                          />
                        </Box>
                      </Collapse>
                    </Box>

                    <Box sx={{ border: '1px solid #EDEDED', p: 1.5, mb: 2, transition: '0.2s', borderColor: paymentMethod === 'CARD' ? '#1A1A1A' : '#EDEDED' }}>
                      <FormControlLabel value="CARD" control={<Radio sx={{ color: '#1A1A1A', '&.Mui-checked': { color: '#1A1A1A' } }} size="small" />} label={<Typography sx={{ fontSize: '13px', fontWeight: 500, fontFamily: 'Montserrat, sans-serif' }}>Credit / Debit Card</Typography>} />
                      <Collapse in={paymentMethod === 'CARD'}>
                        <Stack spacing={1.5} sx={{ pt: 1.5 }}>
                          <TextField 
                            fullWidth
                            size="small"
                            placeholder="Card Number"
                            value={cardDetails.number}
                            onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
                            slotProps={{
                              input: { sx: { borderRadius: 0, fontSize: '12px', fontFamily: 'Montserrat, sans-serif' } }
                            }}
                          />
                          <Stack direction="row" spacing={1.5}>
                            <TextField 
                              fullWidth
                              size="small"
                              placeholder="MM/YY"
                              value={cardDetails.expiry}
                              onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
                              slotProps={{
                                input: { sx: { borderRadius: 0, fontSize: '12px', fontFamily: 'Montserrat, sans-serif' } }
                              }}
                            />
                            <TextField 
                              fullWidth
                              size="small"
                              placeholder="CVV"
                              type="password"
                              value={cardDetails.cvv}
                              onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
                              slotProps={{
                                input: { sx: { borderRadius: 0, fontSize: '12px', fontFamily: 'Montserrat, sans-serif' } }
                              }}
                            />
                          </Stack>
                        </Stack>
                      </Collapse>
                    </Box>

                  </RadioGroup>
                </FormControl>

                <Divider sx={{ my: 2.5, borderColor: '#EDEDED' }} />

                <Stack spacing={1.5} sx={{ mb: 2.5 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" sx={{ color: 'text.secondary', fontFamily: 'Montserrat, sans-serif', fontSize: '13px' }}>Subtotal</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, fontFamily: 'Montserrat, sans-serif', fontSize: '13px' }}>₹{subtotal}</Typography>
                  </Box>
                  {useCoins && (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" sx={{ color: '#9C2B2B', fontWeight: 500, fontFamily: 'Montserrat, sans-serif', fontSize: '13px' }}>Wallet Coins Discount</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 700, color: '#9C2B2B', fontFamily: 'Montserrat, sans-serif', fontSize: '13px' }}>-₹{coinsDeduction}</Typography>
                    </Box>
                  )}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" sx={{ color: 'text.secondary', fontFamily: 'Montserrat, sans-serif', fontSize: '13px' }}>Shipping Fees</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, fontFamily: 'Montserrat, sans-serif', fontSize: '13px' }}>
                      {shipping === 0 ? <span style={{ color: '#2E7D32', fontWeight: 700 }}>FREE</span> : `₹${shipping}`}
                    </Typography>
                  </Box>
                </Stack>

                <Divider sx={{ my: 2, borderColor: '#EDEDED' }} />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', mb: 3.5 }}>
                  <Typography sx={{ fontSize: '14px', fontWeight: 700, color: '#1A1A1A', fontFamily: 'Montserrat, sans-serif', letterSpacing: '0.02em' }}>Estimated Total</Typography>
                  <Typography sx={{ fontSize: '20px', fontWeight: 700, color: '#1A1A1A', fontFamily: 'Montserrat, sans-serif' }}>
                    ₹{total}
                  </Typography>
                </Box>

                <Button 
                  fullWidth 
                  onClick={handlePlaceOrder}
                  disabled={actionLoading || cartItems.length === 0}
                  variant="contained" 
                  endIcon={<ArrowRightAltIcon />}
                  sx={{ 
                    bgcolor: '#1A1A1A', 
                    color: 'white', 
                    borderRadius: 0, 
                    py: 1.8, 
                    fontSize: '11px', 
                    fontWeight: 600, 
                    letterSpacing: '0.15em', 
                    boxShadow: 'none',
                    fontFamily: 'Montserrat, sans-serif',
                    '&:hover': { bgcolor: '#A57C5A' } 
                  }}
                >
                  Place Order ({paymentMethod})
                </Button>
              </Box>
            </Grid>

          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default Cart;