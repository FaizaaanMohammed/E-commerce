// src/pages/SalePage.jsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  IconButton,
  Container,
  Stack,
  Button,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

const SalePage = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("ALL");

  const filters = ["ALL", "CLOTHING", "ESSENTIALS", "ACCESSORIES"];

  const saleProducts = [
    {
      id: "s1",
      name: "Premium Boxy Minimalist Hoodie",
      category: "CLOTHING",
      originalPrice: "$110.00",
      salePrice: "$77.00",
      discount: "-30%",
      image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=700&auto=format&fit=crop",
      size: { xs: 12, md: 6 },
    },
    {
      id: "s2",
      name: "Structured Studio Overcoat",
      category: "ESSENTIALS",
      originalPrice: "$220.00",
      salePrice: "$154.00",
      discount: "-30%",
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=700&auto=format&fit=crop",
      size: { xs: 12, md: 6 },
    },
    {
      id: "s3",
      name: "Minimalist Leather Work Bag",
      category: "ACCESSORIES",
      originalPrice: "$160.00",
      salePrice: "$96.00",
      discount: "-40%",
      image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=500&auto=format&fit=crop",
      size: { xs: 12, md: 6 },
    },
    {
      id: "s4",
      name: "Relaxed Raw Edge Denim Trousers",
      category: "CLOTHING",
      originalPrice: "$95.00",
      salePrice: "$66.50",
      discount: "-30%",
      image: "https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?q=80&w=700&auto=format&fit=crop",
      size: { xs: 12, md: 6 },
    },
  ];

  const filteredProducts = activeFilter === "ALL" 
    ? saleProducts 
    : saleProducts.filter(p => p.category === activeFilter);

  return (
    <Box sx={{ bgcolor: "#f8f6f3", minHeight: "100vh", py: { xs: 6, md: 8 } }}>
      <Container maxWidth="xl">
        
        {/* ==========================================
            CLEAN LUXURY EDITORIAL CENTERED HEADER
           ========================================== */}
        <Box sx={{ textAlign: "center", mb: 8, px: 2 }}>
          <Stack 
            direction="row" 
            alignItems="center" 
            justifyContent="center" 
            spacing={1.5} 
            sx={{ mb: 1 }}
          >
            <Typography
              sx={{ 
                fontFamily: '"Montserrat", sans-serif', 
                fontWeight: 700, 
                textTransform: "uppercase", 
                letterSpacing: "4px", 
                color: "#b33939",
                fontSize: "11px" 
              }}
            >
              ARCHIVE DISCOUNTS
            </Typography>
            <Box sx={{ width: "4px", height: "4px", bgcolor: "#b33939", borderRadius: "50%" }} />
            <Typography
              sx={{ 
                fontFamily: '"Montserrat", sans-serif', 
                fontWeight: 500, 
                color: "#666666", 
                fontSize: "11px",
                letterSpacing: "1px"
              }}
            >
              LIMITED RUN
            </Typography>
          </Stack>

          <Typography
            variant="h2"
            sx={{ 
              fontFamily: '"Playfair Display", serif', 
              fontWeight: 900, 
              fontSize: { xs: "36px", sm: "48px", md: "56px" }, 
              color: "#111111", 
              letterSpacing: "-1px",
              mb: 4
            }}
          >
            The Sale Edit
          </Typography>

          {/* MINIMALIST CENTERED FILTER TRACK */}
          <Stack 
            direction="row" 
            spacing={4} 
            justifyContent="center"
            sx={{ 
              overflowX: "auto", 
              pb: 1,
              borderBottom: "1px solid #eaeaea",
              maxWidth: "600px",
              mx: "auto"
            }}
          >
            {filters.map((filter) => (
              <Button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                sx={{
                  fontFamily: '"Montserrat", sans-serif',
                  fontSize: "12px",
                  fontWeight: activeFilter === filter ? 700 : 500,
                  color: activeFilter === filter ? "#111111" : "#777777",
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                  p: 0,
                  minWidth: 0,
                  position: "relative",
                  borderRadius: 0,
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: -6,
                    left: 0,
                    width: activeFilter === filter ? "100%" : "0%",
                    height: "2px",
                    bgcolor: "#111111",
                    transition: "width 0.25s ease",
                  },
                  "&:hover": { bgcolor: "transparent", color: "#111111" },
                }}
              >
                {filter}
              </Button>
            ))}
          </Stack>
        </Box>

        {/* ==========================================
            ELEGANT TWO-COLUMN SYMMETRIC LOOKBOOK
           ========================================== */}
        <Grid container spacing={4}>
          {filteredProducts.map((product) => (
            <Grid key={product.id} size={{ xs: product.size.xs, md: product.size.md }}>
              <Card
                sx={{
                  borderRadius: 0,
                  bgcolor: "transparent",
                  boxShadow: "none",
                  cursor: "pointer",
                  position: "relative",
                  "&:hover .sale-img-transform": { transform: "scale(1.03)" },
                  "&:hover .action-overlay-btn": { opacity: 1, transform: "translate(-50%, -50%) scale(1)" }
                }}
              >
                {/* IMAGE TRACK VIEWPORT */}
                <Box
                  sx={{
                    position: "relative",
                    overflow: "hidden",
                    bgcolor: "#f2f0eb",
                    height: { xs: "360px", sm: "450px", md: "500px" },
                  }}
                >
                  {/* Subtle Corner Percentage Tag */}
                  <Typography
                    sx={{
                      position: "absolute",
                      top: 20,
                      left: 20,
                      zIndex: 2,
                      fontFamily: '"Montserrat", sans-serif',
                      fontSize: "11px",
                      fontWeight: 700,
                      color: "#ffffff",
                      bgcolor: "#b33939",
                      px: 1.5,
                      py: 0.6,
                      letterSpacing: "1px"
                    }}
                  >
                    {product.discount}
                  </Typography>

                  {/* Corner Wishlist */}
                  <IconButton
                    sx={{
                      position: "absolute",
                      top: 14,
                      right: 14,
                      zIndex: 2,
                      color: "#111111",
                      bgcolor: "rgba(255,255,255,0.8)",
                      "&:hover": { bgcolor: "#ffffff" }
                    }}
                  >
                    <FavoriteBorderIcon sx={{ fontSize: "18px" }} />
                  </IconButton>

                  {/* Core Content Media */}
                  <CardMedia
                    component="img"
                    className="sale-img-transform"
                    image={product.image}
                    alt={product.name}
                    onClick={() => navigate(`/product/${product.id}`)}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)"
                    }}
                  />

                  {/* Centered Minimalist Quick Add Triggers */}
                  <IconButton
                    className="action-overlay-btn"
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%) scale(0.9)",
                      opacity: 0,
                      zIndex: 3,
                      bgcolor: "#111111",
                      color: "#ffffff",
                      width: "54px",
                      height: "54px",
                      transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                      "&:hover": { bgcolor: "#b33939" }
                    }}
                  >
                    <AddIcon />
                  </IconButton>
                </Box>

                {/* PRODUCT METRICS FOOTER CONTAINER */}
                <Box sx={{ pt: 2.5, pb: 2, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <Box sx={{ maxWidth: "70%" }}>
                    <Typography
                      variant="body1"
                      onClick={() => navigate(`/product/${product.id}`)}
                      sx={{
                        fontFamily: '"Montserrat", sans-serif',
                        fontWeight: 600,
                        fontSize: "15px",
                        color: "#111111",
                        lineHeight: 1.3,
                        "&:hover": { color: "#cda587" }
                      }}
                    >
                      {product.name}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ 
                        fontFamily: '"Montserrat", sans-serif', 
                        color: "#888888", 
                        letterSpacing: "1px", 
                        textTransform: "uppercase", 
                        mt: 0.5, 
                        display: "block",
                        fontWeight: 500
                      }}
                    >
                      {product.category} // PRIVATE SALE
                    </Typography>
                  </Box>

                  {/* Fine Typography Pricing Layout */}
                  <Stack alignItems="flex-end" spacing={0.2}>
                    <Typography
                      sx={{ 
                        fontFamily: '"Montserrat", sans-serif', 
                        fontWeight: 500, 
                        fontSize: "13px", 
                        color: "#999999", 
                        textDecoration: "line-through" 
                      }}
                    >
                      {product.originalPrice}
                    </Typography>
                    <Typography
                      sx={{ 
                        fontFamily: '"Montserrat", sans-serif', 
                        fontWeight: 700, 
                        fontSize: "16px", 
                        color: "#b33939"
                      }}
                    >
                      {product.salePrice}
                    </Typography>
                  </Stack>
                </Box>

              </Card>
            </Grid>
          ))}
        </Grid>

      </Container>
    </Box>
  );
};

export default SalePage;