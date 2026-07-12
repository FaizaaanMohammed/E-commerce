// src/pages/BlogPage.jsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Container,
  Stack,
  Button,
} from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const BlogPage = () => {
  const [activeFilter, setActiveFilter] = useState("ALL");

  const filters = ["ALL", "STYLE STUDIES", "STUDIO INCLUSIONS", "MATERIALS"];

  const blogPosts = [
    {
      id: "b1",
      title: "The Art of Minimalist Dressing: A Modern Manifesto",
      category: "STYLE STUDIES",
      date: "July 12, 2026",
      readTime: "4 MIN READ",
      excerpt: "Discover how stripping down your wardrobe to its structural foundations can amplify your personal identity and create a timeless luxury statement.",
      image: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?q=80&w=700&auto=format&fit=crop",
    },
    {
      id: "b2",
      title: "Behind the Contours: Engineering NEXUS Footwear Drop",
      category: "STUDIO INCLUSIONS",
      date: "July 08, 2026",
      readTime: "6 MIN READ",
      excerpt: "An exclusive look into the structural architectural patterns, calculated curvature geometry, and premium cushioning modules crafting the latest drops.",
      image: "https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=700&auto=format&fit=crop",
    },
    {
      id: "b3",
      title: "Sourcing Tailored Organic Linen: Pure Ethics Meet Fashion",
      category: "MATERIALS",
      date: "June 29, 2026",
      readTime: "5 MIN READ",
      excerpt: "Unveiling the raw harvest tracing metrics, eco-conscious yarn weaves, and local fair-wage tailoring pipelines backing our summer apparel catalog.",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=700&auto=format&fit=crop",
    },
    {
      id: "b4",
      title: "Monochromatic Palettes and Their Psychological Resonance",
      category: "STYLE STUDIES",
      date: "June 19, 2026",
      readTime: "7 MIN READ",
      excerpt: "How balancing concrete grayscale accents, ivory fabrics, and raw textures affects space perceptions, mood alignment, and executive styling.",
      image: "https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?q=80&w=700&auto=format&fit=crop",
    },
  ];

  const filteredBlogs = activeFilter === "ALL" 
    ? blogPosts 
    : blogPosts.filter(p => p.category === activeFilter);

  return (
    <Box sx={{ bgcolor: "#f8f6f3", minHeight: "100vh", py: { xs: 6, md: 8 } }}>
      <Container maxWidth="xl">
        
        {/* ==========================================
            LUXURY EDITORIAL CENTERED HEADER
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
                color: "#A57C5A",
                fontSize: "11px" 
              }}
            >
              STUDIO JOURNAL
            </Typography>
            <Box sx={{ width: "4px", height: "4px", bgcolor: "#A57C5A", borderRadius: "50%" }} />
            <Typography
              sx={{ 
                fontFamily: '"Montserrat", sans-serif', 
                fontWeight: 500, 
                color: "#666666", 
                fontSize: "11px",
                letterSpacing: "1px"
              }}
            >
              VOLUME IV
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
            Studio Stories
          </Typography>

          {/* MINIMALIST CENTERED FILTER TRACK */}
          <Stack 
            direction="row" 
            spacing={4} 
            justifyContent="center"
            sx={{ 
              overflowX: "auto", 
              pb: 1,
              borderBottom: "1px solid rgba(26,26,26,0.06)",
              maxWidth: "700px",
              mx: "auto",
              '&::-webkit-scrollbar': { display: 'none' }
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
                  color: activeFilter === filter ? "#111111" : "rgba(26,26,26,0.4)",
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
            DNYANSU SYMMETRIC GRID LOOKBOOK
           ========================================== */}
        <Grid container spacing={4}>
          {filteredBlogs.map((blog) => (
            // 🔥 FIXED BREAKPOINT MATRIX: Standard grid mapping using dynamic size block parameters
            <Grid key={blog.id} item size={{ xs: 12, sm: 6, md: 4 }}>
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
                  "&:hover .blog-img-transform": { transform: "scale(1.04)" },
                  "&:hover .action-overlay-btn": { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
                  "&:hover .read-more-text": { color: "#A57C5A" }
                }}
              >
                {/* IMAGE TRACK VIEWPORT CONTAINER */}
                <Box
                  sx={{
                    position: "relative",
                    overflow: "hidden",
                    bgcolor: "#f2f0eb",
                    height: "300px", // 👈 Equal fixed row height parameter locked across all screens
                  }}
                >
                  {/* Category badging overlay */}
                  <Typography
                    sx={{
                      position: "absolute",
                      top: 20,
                      left: 20,
                      zIndex: 2,
                      fontFamily: '"Montserrat", sans-serif',
                      fontSize: "9px",
                      fontWeight: 700,
                      color: "#ffffff",
                      bgcolor: "#111111",
                      px: 1.5,
                      py: 0.6,
                      letterSpacing: "1.5px",
                      textTransform: "uppercase"
                    }}
                  >
                    {blog.category}
                  </Typography>

                  {/* Core Content Media Render */}
                  <CardMedia
                    component="img"
                    className="blog-img-transform"
                    image={blog.image}
                    alt={blog.title}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)"
                    }}
                  />
                </Box>

                {/* BLOG METRICS FOOTER CONTAINER */}
                <CardContent sx={{ px: 0, pt: 3, pb: 0, textAlign: "left", flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <Box>
                    {/* Timestamp specs row tracking */}
                    <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1.5 }}>
                      <Typography sx={{ fontFamily: '"Montserrat", sans-serif', color: "#888888", fontSize: "11px", fontWeight: 500, letterSpacing: "0.5px" }}>
                        {blog.date}
                      </Typography>
                      <Box sx={{ width: "3px", height: "3px", bgcolor: "rgba(26,26,26,0.2)", borderRadius: "50%" }} />
                      <Typography sx={{ fontFamily: '"Montserrat", sans-serif', color: "#A57C5A", fontSize: "11px", fontWeight: 600, letterSpacing: "0.5px" }}>
                        {blog.readTime}
                      </Typography>
                    </Stack>

                    <Typography
                      variant="h5"
                      sx={{
                        fontFamily: '"Playfair Display", serif',
                        fontWeight: 700,
                        fontSize: "22px",
                        color: "#111111",
                        lineHeight: 1.3,
                        mb: 2,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden"
                      }}
                    >
                      {blog.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        fontFamily: '"Montserrat", sans-serif',
                        color: "rgba(26,26,26,0.6)",
                        fontSize: "13.5px",
                        lineHeight: 1.6,
                        fontWeight: 400,
                        mb: 3,
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden"
                      }}
                    >
                      {blog.excerpt}
                    </Typography>
                  </Box>

                  {/* Interactive luxury text button connector */}
                  <Stack 
                    direction="row" 
                    alignItems="center" 
                    spacing={1} 
                    className="read-more-text"
                    sx={{ 
                      color: "#111111", 
                      transition: "color 0.3s ease",
                      mt: "auto"
                    }}
                  >
                    <Typography sx={{ fontFamily: '"Montserrat", sans-serif', fontWeight: 700, fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase" }}>
                      READ STORY
                    </Typography>
                    <ArrowForwardIosIcon sx={{ fontSize: "9px", mt: '-1px' }} />
                  </Stack>
                </CardContent>

              </Card>
            </Grid>
          ))}
        </Grid>

      </Container>
    </Box>
  );
};

export default BlogPage;