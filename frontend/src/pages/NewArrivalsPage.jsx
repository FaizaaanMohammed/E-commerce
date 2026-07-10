// src/pages/NewArrivalsPage.jsx
import React, { useState } from "react";
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
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";

const NewArrivalsPage = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "Clothing", "Fashions", "Accessories"];

  const newProducts = [
    {
      id: "p1",
      name: "Oversized Heavyweight Premium Hoodie",
      category: "Clothing",
      price: "$89.00",
      tag: "New Drop",
      image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=600&auto=format&fit=crop",
      isFeatured: true, // Pehla element screen par responsive spotlight lega
    },
    {
      id: "p2",
      name: "Tailored Blazer Coat",
      category: "Fashions",
      price: "$145.00",
      tag: "Trending",
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=500&auto=format&fit=crop",
      isFeatured: true,
    },
    {
      id: "p3",
      name: "Classic Linen Trousers",
      category: "Clothing",
      price: "$75.00",
      tag: "New",
      image: "https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?q=80&w=500&auto=format&fit=crop",
    },
    {
      id: "p4",
      name: "Minimalist Leather Tote",
      category: "Accessories",
      price: "$120.00",
      tag: "Limited",
      image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=500&auto=format&fit=crop",
    },
  ];

  const filteredProducts = activeFilter === "All" 
    ? newProducts 
    : newProducts.filter(p => p.category === activeFilter);

  return (
    <Box sx={{ bgcolor: "#f8f6f3", minHeight: "100vh", py: { xs: 4, md: 6 } }}>
      <Container maxWidth="xl">
        
        {/* ==========================================
            LUXURY HEADER SECTION
           ========================================== */}
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Typography
            variant="caption"
            sx={{
              fontFamily: '"Montserrat", sans-serif',
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "5px",
              color: "#cda587",
              fontSize: "11px",
              display: "block",
              mb: 0.5,
            }}
          >
            NEXUS OS. STUDIO INCLUSIONS
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 900,
              fontSize: { xs: "30px", sm: "38px", md: "46px" },
              color: "#111111",
              letterSpacing: "-0.5px",
            }}
          >
            New Arrivals
          </Typography>
        </Box>

        {/* ==========================================
            FILTERS WITH SHARP MINIMAL CONTRAST
           ========================================== */}
        <Stack
          direction="row"
          justifyContent="center"
          spacing={1}
          sx={{ mb: 6, flexWrap: "wrap" }}
        >
          {filters.map((filter) => (
            <Button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              sx={{
                fontFamily: '"Montserrat", sans-serif',
                fontSize: "13px",
                fontWeight: activeFilter === filter ? 700 : 500,
                color: activeFilter === filter ? "#111111" : "#777777",
                textTransform: "none",
                px: 3,
                py: 0.5,
                position: "relative",
                borderRadius: 0,
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: 0,
                  left: "25%",
                  width: activeFilter === filter ? "50%" : "0%",
                  height: "2px",
                  bgcolor: "#111111",
                  transition: "width 0.3s ease",
                },
                "&:hover": { bgcolor: "transparent", color: "#111111" },
              }}
            >
              {filter}
            </Button>
          ))}
        </Stack>

        {/* ==========================================
            ASYMMETRIC RICH GRID PRODUCT CATALOG
           ========================================== */}
        <Grid container spacing={4}>
          {filteredProducts.map((product) => {
            const isSpotlight = product.isFeatured && activeFilter === "All";
            
            return (
              <Grid 
                item 
                size={{ 
                  xs: 12, 
                  sm: isSpotlight ? 12 : 6, 
                  md: isSpotlight ? 6 : 3 
                }} 
                key={product.id}
              >
                <Card
                  sx={{
                    borderRadius: 0,
                    bgcolor: "transparent",
                    boxShadow: "none",
                    cursor: "pointer",
                    position: "relative",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    "&:hover .product-img": { transform: "scale(1.06)" },
                    "&:hover .glass-action-bar": { opacity: 1, transform: "translateY(0)" },
                    "&:hover .like-btn": { bgcolor: "#111111", color: "#ffffff" }
                  }}
                >
                  {/* Image Core Viewport */}
                  <Box 
                    sx={{ 
                      position: "relative", 
                      overflow: "hidden", 
                      bgcolor: "#eaeaea", 
                      height: isSpotlight ? { xs: "380px", md: "520px" } : "380px",
                      transition: "all 0.4s ease"
                    }}
                  >
                    {/* Upper Badging */}
                    <Chip
                      label={product.tag}
                      sx={{
                        position: "absolute",
                        top: 16,
                        left: 16,
                        zIndex: 2,
                        borderRadius: 0,
                        bgcolor: product.tag.includes("New") ? "#111111" : "#cda587",
                        color: "#ffffff",
                        fontFamily: '"Montserrat", sans-serif',
                        fontSize: "9px",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        height: "20px",
                        letterSpacing: "1px"
                      }}
                    />

                    {/* Like Trigger Component */}
                    <IconButton
                      className="like-btn"
                      sx={{
                        position: "absolute",
                        top: 12,
                        right: 12,
                        zIndex: 2,
                        color: "#111111",
                        bgcolor: "rgba(255, 255, 255, 0.9)",
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        "&:hover": { transform: "scale(1.1)" },
                      }}
                    >
                      <FavoriteBorderIcon sx={{ fontSize: "18px" }} />
                    </IconButton>

                    {/* Master Asset Render */}
                    <CardMedia
                      component="img"
                      className="product-img"
                      image={product.image}
                      alt={product.name}
                      onClick={() => navigate(`/product/${product.id}`)}
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.7s cubic-bezier(0.15, 0.85, 0.45, 1)",
                      }}
                    />

                    {/* High-End Glassmorphism Interactive Action Strip */}
                    <Box
                      className="glass-action-bar"
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: "100%",
                        p: 2,
                        boxSizing: "border-box",
                        bgcolor: "rgba(255, 255, 255, 0.75)",
                        backdropFilter: "blur(20px)",
                        borderTop: "1px solid rgba(255,255,255,0.4)",
                        opacity: 0,
                        transform: "translateY(15px)",
                        transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                        display: { xs: "none", md: "flex" },
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        sx={{
                          color: "#111111",
                          fontFamily: '"Montserrat", sans-serif',
                          fontSize: "11px",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "1.5px",
                        }}
                      >
                        Quick Purchase
                      </Typography>
                      <Stack direction="row" alignItems="center" spacing={0.5} sx={{ color: "#111111" }}>
                        <ShoppingBagIcon sx={{ fontSize: "15px" }} />
                        <ArrowForwardIcon sx={{ fontSize: "14px" }} />
                      </Stack>
                    </Box>
                  </Box>

                  {/* Information Track System */}
                  <CardContent sx={{ px: 0, pt: 2, pb: 0, textAlign: "left" }}>
                    <Typography
                      variant="caption"
                      sx={{
                        fontFamily: '"Montserrat", sans-serif',
                        color: "#999999",
                        textTransform: "uppercase",
                        letterSpacing: "1.5px",
                        fontSize: "10px",
                        fontWeight: 600
                      }}
                    >
                      {product.category}
                    </Typography>
                    
                    <Typography
                      variant="body1"
                      onClick={() => navigate(`/product/${product.id}`)}
                      sx={{
                        fontFamily: '"Montserrat", sans-serif',
                        fontWeight: 600,
                        fontSize: isSpotlight ? "18px" : "15px",
                        color: "#111111",
                        mt: 0.5,
                        mb: 0.5,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        transition: "color 0.2s ease",
                        "&:hover": { color: "#cda587" },
                      }}
                    >
                      {product.name}
                    </Typography>

                    <Typography
                      variant="body1"
                      sx={{
                        fontFamily: '"Montserrat", sans-serif',
                        fontWeight: 700,
                        fontSize: "15px",
                        color: "#111111",
                        opacity: 0.9
                      }}
                    >
                      {product.price}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>

      </Container>
    </Box>
  );
};

export default NewArrivalsPage;