// src/pages/CollectionsPage.jsx
import React, { useState, useEffect } from "react";
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardMedia, 
  Button, 
  Container,
  CircularProgress,
  Modal,
  Fade,
  Backdrop,
  IconButton,
  Snackbar,
  Alert,
  Stack
} from "@mui/material";
import { Close as CloseIcon, ShoppingBagOutlined as BagIcon, VisibilityOutlined as EyeIcon } from '@mui/icons-material';
import api from "../Auth/AxiosInstance";
import endpoints from "../Auth/endpoints";
import QuickViewModal from "../components/QuickViewModal"; 

const CollectionPage = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Lookbook Layer State Management
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [cartActionLoading, setCartActionLoading] = useState(null);

  // Deep View Product Detail States
  const [selectedProductForDetails, setSelectedProductForDetails] = useState(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);

  // Snackbar State Container
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const fetchCollectionsData = async () => {
    try {
      const url = endpoints.products?.getCollections || "/api/v1/product/collections/get-all";
      const res = await api.get(url); 
      if (res?.data?.success) {
        setCollections(res.data.data);
      }
    } catch (err) {
      console.error("Aggregation fetching workflow broke:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollectionsData();
  }, []);

  const handleOpenPreview = (collection) => {
    setSelectedCollection(collection);
    setPreviewOpen(true);
  };

  const handleClosePreview = () => {
    setPreviewOpen(false);
    setSelectedCollection(null);
  };

  const handleOpenProductDetails = (product) => {
    setSelectedProductForDetails(product);
    setDetailsModalOpen(true);
  };

  // Phase 2: Add To Bag Execution via Global Axios Instance
  const handleAddToCart = async (e, productId) => {
    e.stopPropagation(); // Stops core selection triggers from opening details underneath
    setCartActionLoading(productId);
    try {
      const url = endpoints.cart?.add || "/api/v1/cart/add-cart";
      const res = await api.post(url, { productId, quantity: 1 });
      if (res?.data?.success) {
        setSnackbar({ open: true, message: "Product added to your bag successfully!", severity: "success" });
      }
    } catch (err) {
      console.error("Direct execution push failed:", err);
      setSnackbar({ open: true, message: err?.response?.data?.message || "Failed to add product.", severity: "error" });
    } finally {
      setCartActionLoading(null);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  if (loading) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', bgcolor: '#f8f6f3' }}>
        <CircularProgress color="inherit" size={40} />
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: "#f8f6f3", minHeight: "100vh", py: { xs: 6, md: 10 } }}>
      <Container maxWidth="xl">
        
        {/* Creative Minimalism Header */}
        <Box sx={{ textAlign: "center", mb: { xs: 6, md: 8 }, px: 2 }}>
          <Typography variant="caption" sx={{ fontFamily: '"Montserrat"', fontWeight: 600, textTransform: "uppercase", letterSpacing: "4px", color: "#A57C5A", fontSize: "11px", display: "block", mb: 1.5 }}>
            NEXUS OS. SELECTIONS
          </Typography>
          <Box sx={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 3, mb: 2 }}>
            <Box sx={{ width: "40px", height: "1px", bgcolor: "#1A1A1A", opacity: 0.2 }} />
            <Typography variant="h3" sx={{ fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 400, fontSize: { xs: "28px", md: "42px" }, color: "#1A1A1A", letterSpacing: "-0.01em" }}>
              Our Collections
            </Typography>
            <Box sx={{ width: "40px", height: "1px", bgcolor: "#1A1A1A", opacity: 0.2 }} />
          </Box>
        </Box>

        {/* Dynamic Aggregated Grid Rows */}
        <Grid container spacing={4}>
          {collections.map((col, idx) => {
            const mdGridVal = idx % 2 === 0 ? 7 : 5;
            const targetHeight = idx % 2 === 0 ? "450px" : "500px";

            return (
              <Grid item size={{ xs: 12, md: mdGridVal }} key={col.id || idx}>
                <Card
                  onClick={() => handleOpenPreview(col)}
                  sx={{
                    position: "relative", borderRadius: 0, cursor: "pointer",
                    height: { xs: "320px", sm: "380px", md: targetHeight },
                    overflow: "hidden", boxShadow: "none", border: "1px solid rgba(26,26,26,0.05)",
                    "&:hover .collection-image": { transform: "scale(1.04)" },
                    "&:hover .collection-overlay": { bgcolor: "rgba(27,22,19,0.25)" },
                    "&:hover .collection-btn": { bgcolor: "#1A1A1A", color: "#ffffff" }
                  }}
                >
                  <CardMedia 
                    component="img" 
                    className="collection-image" 
                    image={col.image || "https://via.placeholder.com/600x450"} 
                    alt={col.name} 
                    sx={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.7s cubic-bezier(0.25, 1, 0.5, 1)" }} 
                  />
                  <Box className="collection-overlay" sx={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", bgcolor: "rgba(27,22,19,0.15)", transition: "background-color 0.4s ease" }} />

                  <Box sx={{ position: "absolute", bottom: 0, left: 0, width: "100%", p: { xs: 3, sm: 4, md: 5 }, boxSizing: "border-box", display: "flex", flexDirection: "column", alignItems: "flex-start", background: "linear-gradient(to top, rgba(27,22,19,0.7) 0%, rgba(27,22,19,0) 100%)" }}>
                    <Typography variant="caption" sx={{ fontFamily: '"Montserrat"', color: "rgba(255,255,255,0.8)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "2px", mb: 1, fontSize: "11px" }}>
                      {col.count}
                    </Typography>
                    <Typography variant="h4" sx={{ fontFamily: '"Playfair Display", Georgia, serif', color: "#ffffff", fontWeight: 400, fontSize: { xs: "24px", sm: "32px" }, mb: 3, letterSpacing: '-0.01em' }}>
                      {col.name}
                    </Typography>
                    <Button className="collection-btn" variant="contained" sx={{ bgcolor: "#ffffff", color: "#1A1A1A", fontFamily: '"Montserrat"', fontWeight: 600, textTransform: "uppercase", fontSize: "11px", letterSpacing: "0.15em", px: 3.5, py: 1.4, borderRadius: 0, boxShadow: "none", transition: "all 0.3s ease" }}>
                      View Collection
                    </Button>
                  </Box>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        {/* --- MODAL LAYER 1: In-Page Lookbook Drawer Grid --- */}
        <Modal
          open={previewOpen}
          onClose={handleClosePreview}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{ backdrop: { timeout: 400, sx: { backdropFilter: 'blur(8px)', bgcolor: 'rgba(26, 26, 26, 0.4)' } } }}
        >
          <Fade in={previewOpen}>
            <Box sx={{
              position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
              width: { xs: '95%', sm: '85%', md: '900px' },
              maxHeight: '85vh', overflowY: 'auto',
              background: 'linear-gradient(145deg, #F8F6F2 0%, #F3EFE9 100%)',
              boxShadow: 'inset 0 0 60px rgba(165,124,90,0.03), 0px 30px 60px rgba(27,22,19,0.08)',
              border: '1px solid #E6DFD3', p: { xs: 3, sm: 4, md: 5 }, boxSizing: 'border-box', borderRadius: '2px',
              '&::-webkit-scrollbar': { width: '4px' }, '&::-webkit-scrollbar-thumb': { bgcolor: '#E0DCD5' }
            }}>
              <IconButton onClick={handleClosePreview} sx={{ position: 'absolute', top: 20, right: 20, color: '#1A1A1A', '&:hover': { transform: 'rotate(90deg)', color: '#A57C5A' }, transition: 'all 0.3s' }}>
                <CloseIcon sx={{ fontSize: '20px' }} />
              </IconButton>

              <Typography sx={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#A57C5A', mb: 1, fontFamily: 'Montserrat' }}>
                EXPLORING COLLECTION DROP
              </Typography>
              <Typography variant="h4" sx={{ fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 400, mb: 4, color: '#1A1A1A' }}>
                {selectedCollection?.name}
              </Typography>

              {/* Dynamic Subgrid rendering individual product nodes */}
              <Grid container spacing={3}>
                {selectedCollection?.products?.map((product) => (
                  <Grid item size={{ xs: 12, sm: 6, md: 4 }} key={product._id}>
                    <Box sx={{ 
                      bgcolor: 'rgba(255,255,255,0.4)', border: '1px solid rgba(26,26,26,0.05)', p: 2, 
                      transition: 'all 0.3s ease', '&:hover': { borderColor: '#1A1A1A', boxShadow: '0 10px 25px rgba(0,0,0,0.02)' }
                    }}>
                      <Box sx={{ width: '100%', aspectRatio: '3/4', overflow: 'hidden', mb: 2, bgcolor: '#FAF8F5' }}>
                        <img src={product.images?.[0] || "https://via.placeholder.com/300x400"} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </Box>
                      <Typography sx={{ fontFamily: 'Montserrat', fontSize: '14px', fontWeight: 600, color: '#1A1A1A', mb: 0.5, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {product.title}
                      </Typography>
                      <Typography sx={{ fontFamily: 'Montserrat', fontSize: '13px', fontWeight: 500, color: '#A57C5A', mb: 2 }}>
                        ₹{product.price}
                      </Typography>
                      
                      {/* 🔥 FIXED: Dual Row Split Layout Action Buttons Structure */}
                      <Stack direction="row" spacing={1} sx={{ width: '100%' }}>
                        <Button
                          variant="outlined"
                          onClick={() => handleOpenProductDetails(product)}
                          sx={{
                            flex: 1, minWidth: 0, borderColor: '#1A1A1A', color: '#1A1A1A', borderRadius: 0, py: 1.2, 
                            fontSize: '9.5px', fontWeight: 700, letterSpacing: '0.05em', fontFamily: 'Montserrat',
                            '&:hover': { bgcolor: 'rgba(26,26,26,0.05)', borderColor: '#1A1A1A' }
                          }}
                        >
                          DETAILS
                        </Button>
                        <Button
                          variant="contained"
                          onClick={(e) => handleAddToCart(e, product._id)}
                          disabled={cartActionLoading === product._id}
                          sx={{
                            flex: 1.3, minWidth: 0, bgcolor: '#1A1A1A', color: 'white', borderRadius: 0, py: 1.2, 
                            fontSize: '9.5px', fontWeight: 700, letterSpacing: '0.05em', fontFamily: 'Montserrat', boxShadow: 'none',
                            '&:hover': { bgcolor: '#A57C5A', boxShadow: 'none' }
                          }}
                        >
                          {cartActionLoading === product._id ? <CircularProgress size={14} color="inherit" /> : 'ADD TO BAG'}
                        </Button>
                      </Stack>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Fade>
        </Modal>

        {/* --- MODAL LAYER 2: Quick View & Review Component Framework --- */}
        <QuickViewModal
          open={detailsModalOpen}
          handleClose={() => setDetailsModalOpen(false)}
          product={selectedProductForDetails}
        />

        {/* 🔥 SLEEK NOTIFICATION COMPONENT: Replacement for browser default alerts */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert 
            onClose={handleCloseSnackbar} 
            severity={snackbar.severity} 
            variant="filled"
            sx={{ 
              borderRadius: 0, 
              fontFamily: "Montserrat", 
              fontSize: "12px", 
              fontWeight: 500,
              bgcolor: snackbar.severity === "success" ? "#1A1A1A" : "#9C2B2B",
              boxShadow: "0 10px 30px rgba(0,0,0,0.15)"
            }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>

      </Container>
    </Box>
  );
};

export default CollectionPage;