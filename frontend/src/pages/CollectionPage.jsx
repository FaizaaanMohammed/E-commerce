// src/pages/CollectionsPage.jsx
import React from "react";
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardMedia, 
  Button, 
  Container 
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const CollectionPage = () => {
  const navigate = useNavigate();

  const collections = [
    {
      id: "clothing",
      name: "Minimalist Clothing",
      count: "18 Products",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop",
      gridSize: { xs: 12, md: 7 }, 
      height: "450px"
    },
    {
      id: "new-in",
      name: "New In",
      count: "12 Products",
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=600&auto=format&fit=crop",
      gridSize: { xs: 12, md: 5 },
      height: "450px"
    },
    {
      id: "fashions",
      name: "Urban Fashions",
      count: "24 Products",
      image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=600&auto=format&fit=crop",
      gridSize: { xs: 12, md: 5 },
      height: "500px"
    },
    {
      id: "furniture",
      name: "Studio Furniture",
      count: "9 Products",
      image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=600&auto=format&fit=crop",
      gridSize: { xs: 12, md: 7 },
      height: "500px"
    }
  ];

  return (
    <Box sx={{ bgcolor: "#f8f6f3", minHeight: "100vh", py: { xs: 4, md: 5 } }}>
      <Container maxWidth="xl">
        
        {/* ==========================================
            COMPACT & HIGH-END CREATIVE HEADER
           ========================================== */}
        <Box sx={{ textAlign: "center", mb: { xs: 4, md: 5 }, px: 2 }}>
          {/* Concept Sub-tag */}
          <Typography
            variant="caption"
            sx={{
              fontFamily: '"Montserrat", sans-serif',
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "4px",
              color: "#cda587",
              fontSize: { xs: "10px", sm: "11px" },
              display: "block",
              mb: 0.5,
            }}
          >
            NEXUS OS. SELECTIONS
          </Typography>

          {/* Creative Inline-Line Title Layout */}
          <Box 
            sx={{ 
              display: "inline-flex", 
              alignItems: "center", 
              justifyContent: "center",
              gap: 2,
              mb: 1
            }}
          >
            <Box sx={{ width: { xs: "20px", sm: "40px" }, height: "1px", bgcolor: "#111111", opacity: 0.4 }} />
            <Typography
              variant="h3"
              sx={{
                fontFamily: '"Playfair Display", serif',
                fontWeight: 800,
                fontSize: { xs: "28px", sm: "36px", md: "42px" },
                color: "#111111",
                letterSpacing: "-0.3px",
              }}
            >
              Our Collections
            </Typography>
            <Box sx={{ width: { xs: "20px", sm: "40px" }, height: "1px", bgcolor: "#111111", opacity: 0.4 }} />
          </Box>

          {/* Short, Sleek & Compact Subheading */}
          <Typography
            variant="body2"
            sx={{
              fontFamily: '"Montserrat", sans-serif',
              fontWeight: 400,
              fontSize: { xs: "13px", sm: "14px" },
              color: "#666666",
              maxWidth: "500px",
              mx: "auto",
              lineHeight: 1.5,
            }}
          >
            Carefully curated looks and design essentials tailored for the modern lifestyle.
          </Typography>
        </Box>

        {/* Rejilla Grid de Colecciones */}
        <Grid container spacing={4}>
          {collections.map((col) => (
            <Grid item size={{ xs: col.gridSize.xs, md: col.gridSize.md }} key={col.id}>
              <Card
                onClick={() => navigate(`/shop?category=${col.id}`)}
                sx={{
                  position: "relative",
                  borderRadius: 0, 
                  cursor: "pointer",
                  height: { xs: "320px", sm: "380px", md: col.height },
                  overflow: "hidden",
                  boxShadow: "none",
                  "&:hover .collection-image": {
                    transform: "scale(1.05)",
                  },
                  "&:hover .collection-overlay": {
                    bgcolor: "rgba(0,0,0,0.3)"
                  },
                  "&:hover .collection-btn": {
                    bgcolor: "#111111",
                    color: "#ffffff"
                  }
                }}
              >
                {/* Imagen de fondo */}
                <CardMedia
                  component="img"
                  className="collection-image"
                  image={col.image}
                  alt={col.name}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
                  }}
                />

                {/* Filtro oscuro encima de la imagen */}
                <Box
                  className="collection-overlay"
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    bgcolor: "rgba(0,0,0,0.2)",
                    transition: "background-color 0.4s ease"
                  }}
                />

                {/* Contenido de la Colección */}
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    p: { xs: 3, sm: 4 },
                    boxSizing: "border-box",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      fontFamily: '"Montserrat", sans-serif',
                      color: "rgba(255,255,255,0.85)",
                      fontWeight: 500,
                      textTransform: "uppercase",
                      letterSpacing: "2px",
                      mb: 1,
                      fontSize: "12px"
                    }}
                  >
                    {col.count}
                  </Typography>
                  
                  <Typography
                    variant="h4"
                    sx={{
                      fontFamily: '"Playfair Display", serif',
                      color: "#ffffff",
                      fontWeight: 700,
                      fontSize: { xs: "24px", sm: "32px" },
                      mb: 3
                    }}
                  >
                    {col.name}
                  </Typography>

                  <Button
                    className="collection-btn"
                    variant="contained"
                    sx={{
                      bgcolor: "#ffffff",
                      color: "#111111",
                      fontFamily: '"Montserrat", sans-serif',
                      fontWeight: 600,
                      textTransform: "uppercase",
                      fontSize: "12px",
                      letterSpacing: "1px",
                      px: 3,
                      py: 1.2,
                      borderRadius: 0,
                      boxShadow: "none",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        bgcolor: "#111111",
                        color: "#ffffff",
                        boxShadow: "none"
                      }
                    }}
                  >
                    View Collection
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

      </Container>
    </Box>
  );
};

export default CollectionPage;