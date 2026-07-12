// src/pages/NewArrivalsPage.jsx
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Container,
  Stack,
  Button,
  Chip,
  CircularProgress
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import api from "../Auth/AxiosInstance"; 
import QuickViewModal from "../components/QuickViewModal"; 

const NewArrivalsPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [rawProducts, setRawProducts] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");

  const [selectedProductForDetails, setSelectedProductForDetails] = useState(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);

  const filters = ["All", "Clothing", "Fashion", "Accessories"];

  const fetchNewArrivalsDynamic = async () => {
    try {
      setLoading(true);
      const response = await api.get("/api/v1/product/All-product");
      
      if (response?.data?.success) {
        const totalStockLedger = response.data.data || [];
        
        // 2 Din ka exact date cutoff check range setup
        const twoDaysAgo = new Date();
        twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

        // Filter items created within the last 48 hours
        const recentTwoDaysProducts = totalStockLedger.filter(product => {
          const productDate = new Date(product.createdAt);
          return productDate >= twoDaysAgo;
        });

        recentTwoDaysProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        
        setRawProducts(recentTwoDaysProducts);

        const mappedProducts = recentTwoDaysProducts.map((product, idx) => ({
          id: product._id,
          name: product.title,
          category: product.category,
          price: `₹${(product.price || 0).toLocaleString('en-IN')}`,
          tag: idx === 0 ? "Fresh Drop" : "Recent Arrival",
          image: product.images?.[0] || "https://via.placeholder.com/500x500"
        }));

        setProducts(mappedProducts);
      }
    } catch (err) {
      console.error("Time-series sorting hook collapsed:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewArrivalsDynamic();
  }, []);

  const handleOpenQuickPurchase = (e, productId) => {
    e.stopPropagation(); 
    const originalProductObj = rawProducts.find(item => item._id === productId);
    if (originalProductObj) {
      setSelectedProductForDetails(originalProductObj);
      setDetailsModalOpen(true);
    }
  };

  const filteredProducts = activeFilter === "All" 
    ? products 
    : products.filter(p => p.category?.toLowerCase() === activeFilter.toLowerCase());

  if (loading) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', bgcolor: '#f8f6f3' }}>
        <CircularProgress color="inherit" size={40} />
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: "#f8f6f3", minHeight: "100vh", py: { xs: 4, md: 6 } }}>
      <Container maxWidth="xl">
        
        {/* Luxury Header Section */}
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Typography variant="caption" sx={{ fontFamily: '"Montserrat", sans-serif', fontWeight: 600, textTransform: "uppercase", letterSpacing: "5px", color: "#cda587", fontSize: "11px", display: "block", mb: 0.5 }}>
            NEXUS OS. 48-HOUR RELEASES
          </Typography>
          <Typography variant="h3" sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 900, fontSize: { xs: "30px", sm: "38px", md: "46px" }, color: "#111111", letterSpacing: "-0.5px" }}>
            New Arrivals
          </Typography>
        </Box>

        {/* Filters Panel */}
        <Stack direction="row" justifyContent="center" spacing={1} sx={{ mb: 6, flexWrap: "wrap" }}>
          {filters.map((filter) => (
            <Button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              sx={{
                fontFamily: '"Montserrat", sans-serif', fontSize: "13px", fontWeight: activeFilter === filter ? 700 : 500,
                color: activeFilter === filter ? "#111111" : "#777777", textTransform: "none", px: 3, py: 0.5,
                position: "relative", borderRadius: 0,
                "&::after": {
                  content: '""', position: "absolute", bottom: 0, left: "25%",
                  width: activeFilter === filter ? "50%" : "0%", height: "2px", bgcolor: "#111111", transition: "width 0.3s ease",
                },
                "&:hover": { bgcolor: "transparent", color: "#111111" },
              }}
            >
              {filter}
            </Button>
          ))}
        </Stack>

        {/* Dynamic Grid / Fallback State Check */}
        {filteredProducts.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 10, px: 2 }}>
            <Typography sx={{ fontFamily: '"Playfair Display", serif', fontStyle: "italic", fontSize: "20px", color: "#777777", mb: 1 }}>
              No new items released in the last 48 hours.
            </Typography>
            <Typography sx={{ fontFamily: '"Montserrat", sans-serif', fontSize: "12px", color: "#999999", letterSpacing: "1px" }}>
              Check back soon for the next studio inclusion drop.
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={4}>
            {filteredProducts.map((product) => (
              // 🔥 FIXED RESPONSIVE GRID MATRIX: 4 cards on desktop, 2 on tablet, all sharing identical grid columns
              <Grid 
                item 
                key={product.id}
                size={{ 
                  xs: 12, 
                  sm: 6, 
                  md: 3 
                }} 
              >
                <Card
                  sx={{
                    borderRadius: 0, bgcolor: "transparent", boxShadow: "none", cursor: "pointer",
                    position: "relative", height: "100%", display: "flex", flexDirection: "column",
                    justifyContent: "space-between",
                    "&:hover .product-img": { transform: "scale(1.06)" },
                    "&:hover .glass-action-bar": { opacity: 1, transform: "translateY(0)" },
                    "&:hover .like-btn": { bgcolor: "#111111", color: "#ffffff" }
                  }}
                >
                  {/* 🔥 FIXED HEIGHT IMAGE WRAPPER: Synchronized perfectly across all mapping columns */}
                  <Box 
                    sx={{ 
                      position: "relative", 
                      overflow: "hidden", 
                      bgcolor: "#eaeaea", 
                      height: "420px", // 👈 Absolute uniform lock height parameters
                      transition: "all 0.4s ease" 
                    }}
                  >
                    <Chip
                      label={product.tag}
                      sx={{
                        position: "absolute", top: 16, left: 16, zIndex: 2, borderRadius: 0,
                        bgcolor: "#111111", color: "#ffffff", fontFamily: '"Montserrat", sans-serif',
                        fontSize: "9px", fontWeight: 700, textTransform: "uppercase", height: "20px", letterSpacing: "1px"
                      }}
                    />

                    <IconButton className="like-btn" sx={{ position: "absolute", top: 12, right: 12, zIndex: 2, color: "#111111", bgcolor: "rgba(255, 255, 255, 0.9)", transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)", "&:hover": { transform: "scale(1.1)" } }}>
                      <FavoriteBorderIcon sx={{ fontSize: "18px" }} />
                    </IconButton>

                    <CardMedia
                      component="img"
                      className="product-img"
                      image={product.image}
                      alt={product.name}
                      onClick={() => navigate(`/product/${product.id}`)}
                      sx={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.7s cubic-bezier(0.15, 0.85, 0.45, 1)" }}
                    />

                    <Box
                      className="glass-action-bar"
                      onClick={(e) => handleOpenQuickPurchase(e, product.id)}
                      sx={{
                        position: "absolute", bottom: 0, left: 0, width: "100%", p: 2, boxSizing: "border-box",
                        bgcolor: "rgba(255, 255, 255, 0.75)", backdropFilter: "blur(20px)",
                        borderTop: "1px solid rgba(255,255,255,0.4)", opacity: 0,
                        transform: "translateY(15px)", transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                        display: { xs: "none", md: "flex" }, justifyContent: "space-between", alignItems: "center",
                      }}
                    >
                      <Typography sx={{ color: "#111111", fontFamily: '"Montserrat", sans-serif', fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px" }}>
                        Quick Purchase
                      </Typography>
                      <Stack direction="row" alignItems="center" spacing={0.5} sx={{ color: "#111111" }}>
                        <ShoppingBagIcon sx={{ fontSize: "15px" }} />
                        <ArrowForwardIcon sx={{ fontSize: "14px" }} />
                      </Stack>
                    </Box>
                  </Box>

                  <CardContent sx={{ px: 0, pt: 2, pb: 0, textAlign: "left" }}>
                    <Typography variant="caption" sx={{ fontFamily: '"Montserrat", sans-serif', color: "#999999", textTransform: "uppercase", letterSpacing: "1.5px", fontSize: "10px", fontWeight: 600 }}>
                      {product.category}
                    </Typography>
                    
                    <Typography
                      variant="body1"
                      onClick={() => navigate(`/product/${product.id}`)}
                      sx={{
                        fontFamily: '"Montserrat", sans-serif', fontWeight: 600,
                        fontSize: "15px", color: "#111111", mt: 0.5, mb: 0.5, 
                        overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", 
                        transition: "color 0.2s ease", "&:hover": { color: "#cda587" },
                      }}
                    >
                      {product.name}
                    </Typography>

                    <Typography variant="body1" sx={{ fontFamily: '"Montserrat", sans-serif', fontWeight: 700, fontSize: "15px", color: "#111111", opacity: 0.9 }}>
                      {product.price}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        <QuickViewModal
          open={detailsModalOpen}
          handleClose={() => setDetailsModalOpen(false)}
          product={selectedProductForDetails}
        />

      </Container>
    </Box>
  );
};

export default NewArrivalsPage;