// src/components/TopNavbar.jsx
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Stack,
  Button,
  Box,
  IconButton,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Badge,
  InputBase,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CloseIcon from "@mui/icons-material/Close";
import AuthModal from "./AuthModal";

const TopNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  // Tablet + Mobile break layout toggle
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  
  // Search toggle states
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Collections", path: "/collections" },
    { name: "New Arrivals", path: "/new-arrivals" },
    { name: "Sale", path: "/sale", isSale: true },
    
   
  ];

  const handleSearchSubmit = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
    }
  };

  return (
    <>
      <AppBar
        position="sticky"
        color="transparent"
        elevation={0}
        sx={{
          borderBottom: "1px solid #eaeaea",
          px: { xs: 2, sm: 3, md: 4 },
          bgcolor: "#f8f6f3",
        }}
      >
        <Toolbar
          sx={{ justifyContent: "space-between", height: "80px", px: 0 }}
        >
          {/* ==========================================
              CONDITION A: DESKTOP NAVBAR LAYOUT
             ========================================== */}
          {!isMobile && (
            <>
              {/* Left Side: Brand Logo */}
              <Box
                sx={{ flex: 1, display: "flex", justifyContent: "flex-start" }}
              >
                <Typography
                  variant="h5"
                  onClick={() => navigate("/")}
                  sx={{
                    fontFamily: '"Playfair Display", serif',
                    fontWeight: 900,
                    cursor: "pointer",
                    fontSize: "28px",
                    letterSpacing: "-0.5px",
                  }}
                >
                  NEXUS OS.
                </Typography>
              </Box>

              {/* Middle Section: Links hide if inline search takes up space */}
              {!searchOpen && (
                <Stack
                  direction="row"
                  spacing={3}
                  sx={{ justifyContent: "center" }}
                >
                  {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                      <Button
                        key={item.name}
                        color="inherit"
                        onClick={() => navigate(item.path)}
                        sx={{
                          fontFamily: "Montserrat",
                          fontWeight: isActive ? 700 : 600,
                          textTransform: "none",
                          fontSize: "16px",
                          color: isActive 
                            ? "#cda587" 
                            : item.isSale 
                              ? "#b33939" 
                              : "#111111",
                          transition: "color 0.25s ease",
                          "&:hover": {
                            color: item.isSale ? "#d63031" : "#cda587",
                          },
                        }}
                      >
                        {item.name}
                      </Button>
                    );
                  })}
                </Stack>
              )}

              {/* Right Side: Utilities Track */}
              <Stack
                direction="row"
                spacing={2.5}
                sx={{
                  flex: 1,
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                {/* Expandable Search Container */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    borderBottom: searchOpen ? "1px solid #111" : "1px solid transparent",
                    transition: "all 0.3s ease",
                    width: searchOpen ? "240px" : "32px",
                    overflow: "hidden",
                  }}
                >
                  <IconButton 
                    onClick={() => setSearchOpen(!searchOpen)} 
                    sx={{ color: "#111", p: 0.5 }}
                  >
                    <SearchIcon sx={{ fontSize: "22px" }} />
                  </IconButton>
                  <InputBase
                    placeholder="Search our store..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleSearchSubmit}
                    sx={{
                      ml: 1,
                      flex: 1,
                      fontFamily: "Montserrat",
                      fontSize: "14px",
                      display: searchOpen ? "block" : "none",
                    }}
                  />
                  {searchOpen && (
                    <IconButton 
                      onClick={() => { setSearchOpen(false); setSearchQuery(""); }} 
                      sx={{ p: 0.5, color: "#aaa" }}
                    >
                      <CloseIcon sx={{ fontSize: "16px" }} />
                    </IconButton>
                  )}
                </Box>

                <IconButton onClick={() => setAuthOpen(true)} sx={{ color: "#111", p: 0.5 }}>
                  <PermIdentityIcon sx={{ fontSize: "22px" }} />
                </IconButton>

                {/* Wishlist Utility */}
                <IconButton onClick={() => navigate("/wishlist")} sx={{ color: "#111", p: 0.5 }}>
                  <Badge 
                    badgeContent={0} 
                    showZero={false}
                    sx={{ "& .MuiBadge-badge": { bgcolor: "#cda587", color: "#fff" } }}
                    path="/wishlist"
                  >
                    <FavoriteBorderIcon sx={{ fontSize: "22px" }} />
                  </Badge>
                </IconButton>
                
                <IconButton onClick={() => navigate("/cart")} sx={{ p: 0.5 }}>
                  <Badge 
                    badgeContent={2} 
                    sx={{
                      "& .MuiBadge-badge": {
                        bgcolor: "#111",
                        color: "#fff",
                        fontFamily: "Montserrat",
                        fontSize: "9px",
                        fontWeight: "bold",
                        minWidth: "16px",
                        height: "16px",
                      }
                    }}
                  >
                    <ShoppingBagIcon sx={{ color: "#111", fontSize: "22px" }} />
                  </Badge>
                </IconButton>
              </Stack>
            </>
          )}

          {/* ==========================================
              CONDITION B: MOBILE & TABLET LAYOUT 
             ========================================== */}
          {isMobile && (
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Stack direction="row" alignItems="center" spacing={1.5}>
                <IconButton
                  onClick={() => setDrawerOpen(true)}
                  sx={{ p: 0.5, color: "#111" }}
                >
                  <MenuIcon sx={{ fontSize: "24px" }} />
                </IconButton>
                <Typography
                  variant="h4"
                  onClick={() => navigate("/")}
                  sx={{
                    fontFamily: '"Playfair Display", serif',
                    fontWeight: 900,
                    fontSize: { xs: "20px", sm: "24px" },
                    color: "#111",
                    cursor: "pointer",
                  }}
                >
                  NEXUS OS.
                </Typography>
              </Stack>
              
              <Stack direction="row" spacing={1.5} alignItems="center">
                <IconButton onClick={() => navigate("/search-page-or-trigger")} sx={{ color: "#111", p: 0.5 }}>
                  <SearchIcon sx={{ fontSize: "22px" }} />
                </IconButton>
                <IconButton onClick={() => setAuthOpen(true)} sx={{ color: "#111", p: 0.5 }}>
                  <PermIdentityIcon sx={{ fontSize: "22px" }} />
                </IconButton>
                <IconButton onClick={() => navigate("/wishlist")} sx={{ color: "#111", p: 0.5 }}>
                  <FavoriteBorderIcon sx={{ fontSize: "22px" }} />
                </IconButton>
                <IconButton onClick={() => navigate("/cart")} sx={{ p: 0.5 }}>
                  <Badge 
                    badgeContent={2} 
                    sx={{
                      "& .MuiBadge-badge": {
                        bgcolor: "#111",
                        color: "#fff",
                        fontFamily: "Montserrat",
                        fontSize: "9px",
                        fontWeight: "bold",
                        minWidth: "16px",
                        height: "16px",
                      }
                    }}
                  >
                    <ShoppingBagIcon sx={{ color: "#111", fontSize: "22px" }} />
                  </Badge>
                </IconButton>
              </Stack>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* MOBILE & TABLET RESPONSIVE DRAWER */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { width: { xs: "280px", sm: "320px" }, bgcolor: "#f8f6f3" } }}
      >
        <Box sx={{ padding: "30px 24px" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 4,
            }}
          >
            <Typography
              variant="h5"
              sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 900 }}
            >
              NEXUS OS.
            </Typography>
            <IconButton
              onClick={() => setDrawerOpen(false)}
              sx={{ color: "#111", p: 0 }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <List>
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;

              return (
                <ListItem disablePadding key={item.name} sx={{ mb: 0.5 }}>
                  <ListItemButton
                    onClick={() => {
                      setDrawerOpen(false);
                      navigate(item.path);
                    }}
                    sx={{ px: 0, "&:hover": { bgcolor: "transparent" } }}
                  >
                    <ListItemText
                      primary={item.name}
                      primaryTypographyProps={{
                        fontFamily: '"Montserrat", sans-serif',
                        fontWeight: isActive ? 600 : 500,
                        fontSize: "18px",
                        color: isActive 
                          ? "#cda587" 
                          : item.isSale 
                            ? "#b33939" 
                            : "#111111",
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Drawer>

      <AuthModal open={authOpen} handleClose={() => setAuthOpen(false)} />
    </>
  );
};

export default TopNavbar;