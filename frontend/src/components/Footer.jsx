// src/components/Footer.jsx
import React from "react";
import {
  Box,
  Typography,
  Stack,
  Link,
  InputBase,
  Button,
  Grid,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#eeebe4",
        color: "#111111",
        pt: 10,
        pb: 5,
        px: { xs: 4, md: 10 },
        borderTop: "1px solid #d5cfc6",
        fontFamily: '"Montserrat", sans-serif',
      }}
    >
      {/* Grid container spanning exactly 12 columns seamlessly */}
      <Grid
        container
        spacing={{ xs: 4, md: 2 }}
        justifyContent="space-between" // Yeh automatically automatic gaps banayega columns ke beech me
        alignItems="flex-start"
        sx={{ mb: 6, width: "100%" }}
      >
        {/* Column 1: Brand Text - Left Wall */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Typography
            variant="h4"
            onClick={() => navigate("/")}
            sx={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 900,
              mb: 2.5,
              cursor: "pointer",
              letterSpacing: "-0.5px",
              fontSize: "28px",
            }}
          >
            NEXUS OS.
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "#555555",
              lineHeight: 1.8,
              mb: 3.5,
              maxWidth: "320px",
              fontSize: "14px",
            }}
          >
            Experience minimalist structural fashion engineered for contemporary
            lifestyle standards.
          </Typography>

          <Stack
            direction="row"
            spacing={2}
            sx={{
              justifyContent: { xs: "center", md: "flex-start" },
              mb: { xs: 2, md: 0 },
            }}
          >
            {[FacebookIcon, TwitterIcon, InstagramIcon, PinterestIcon].map(
              (Icon, idx) => (
                <IconButton
                  key={idx}
                  component={motion.button}
                  whileHover={{ y: -3, color: "#cda587" }}
                  sx={{
                    color: "#111111",
                    p: 0,
                    "&:hover": { bgcolor: "transparent" },
                  }}
                >
                  <Icon sx={{ fontSize: "18px" }} />
                </IconButton>
              ),
            )}
          </Stack>
        </Grid>

        {/* Column 2: Shopping Links - FIXED: Using dynamic size object tracking */}
        <Grid size={{ xs: 6, md: 2.5 }}>
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 600,
              letterSpacing: "1.5px",
              mb: 3,
              textTransform: "uppercase",
              fontSize: "15px",
              color: "#111",
            }}
          >
            Shopping
          </Typography>
          <Stack spacing={2}>
            {[
              "New Arrivals",
              "Best Sellers",
              "Store Locations",
              "Current Sales",
            ].map((text) => (
              <Link
                key={text}
                href="#"
                underline="none"
                sx={{
                  color: "#444444",
                  fontSize: "14px",
                  fontWeight: 500,
                  "&:hover": { color: "#cda587" },
                  transition: "color 0.2s",
                }}
              >
                {text}
              </Link>
            ))}
          </Stack>
        </Grid>

        {/* Column 3: Assistance Links */}
        <Grid size={{ xs: 6, md: 2.5 }}>
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 600,
              letterSpacing: "1.5px",
              mb: 3,
              textTransform: "uppercase",
              fontSize: "16px",
              color: "#111",
            }}
          >
            Assistance
          </Typography>
          <Stack spacing={2}>
            {[
              "Order Tracking",
              "Returns & Exchanges",
              "Size Guide",
              "Contact Support",
            ].map((text) => (
              <Link
                key={text}
                href="#"
                underline="none"
                sx={{
                  color: "#444444",
                  fontSize: "14px",
                  fontWeight: 500,
                  "&:hover": { color: "#cda587" },
                  transition: "color 0.2s",
                }}
              >
                {text}
              </Link>
            ))}
          </Stack>
        </Grid>

        {/* Column 4: Newsletter Box - Right Wall Edge (Size Restricted Box to anchor cleanly) */}
        <Grid
          size={{ xs: 12, md: 3 }}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: { xs: "flex-start", md: "flex-end" },
            textAlign: { xs: "left", md: "right" },
          }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 600, letterSpacing: '1.5px', mb: 2, textTransform: 'uppercase', fontSize: '15px', color: '#111' }}>
            Newsletter
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #111111', pb: 0.5, width: '100%' }}>
            <InputBase
              placeholder="Your email address..."
              sx={{ 
                fontSize: '13px', 
                color: '#111111',
                fontFamily: '"Montserrat", sans-serif', 
                flexGrow: 1, 
                px: 0, 
                '& input::placeholder': { color: '#888888', opacity: 1 } 
              }}
            />
            <Button 
              disableRipple 
              sx={{ 
                color: '#111111', 
                textTransform: 'uppercase', 
                fontWeight: 700, 
                fontSize: '12px', 
                p: 0, 
                minWidth: 'auto', 
                fontFamily: '"Montserrat", sans-serif', 
                letterSpacing: '1.5px',
                '&:hover': { bgcolor: 'transparent', color: '#cda587' } 
              }}
            >
              Join
            </Button>
          </Box>
          
          <Typography variant="body2" sx={{ color: '#555555', mb: 3, fontSize: '14px', lineHeight: 1.6,mt:2 }}>
            Subscribe for seasonal collection releases updates.
          </Typography>
        </Grid>
      </Grid>

      {/* Bottom Legal Credits Bar Layer */}
      <Box
        sx={{
          borderTop: "1px solid #d5cfc6",
          pt: 4,
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
          textAlign: { xs: "center", sm: "left" },
        }}
      >
        <Typography
          sx={{ fontSize: "12px", color: "#777777", fontWeight: 500 }}
        >
          ©2026 NEXUS OS. All rights reserved.
        </Typography>
        <Stack direction="row" spacing={4}>
          <Link
            href="#"
            underline="none"
            sx={{
              fontSize: "12px",
              color: "#777777",
              fontWeight: 500,
              "&:hover": { color: "#111111" },
            }}
          >
            Privacy Policy
          </Link>
          <Link
            href="#"
            underline="none"
            sx={{
              fontSize: "12px",
              color: "#777777",
              fontWeight: 500,
              "&:hover": { color: "#111111" },
            }}
          >
            Terms & Conditions
          </Link>
        </Stack>
      </Box>
    </Box>
  );
};

export default Footer;
