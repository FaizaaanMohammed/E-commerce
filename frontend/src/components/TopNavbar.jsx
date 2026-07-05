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
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import CloseIcon from "@mui/icons-material/Close";
import AuthModal from "./AuthModal";

const TopNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Collections", path: "/collections" },
    { name: "Pages", path: "/pages" },
    { name: "Blog", path: "/blog" },
    { name: "New Look", path: "/new-look" },
  ];

  return (
    <>
      <AppBar
        position="sticky"
        color="transparent"
        elevation={0}
        sx={{
          borderBottom: "1px solid #eaeaea",
          px: { xs: 2, md: 4 },
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

              {/* Middle Section: Centered Navigation Menu Items Links */}
              <Stack
                direction="row"
                spacing={2.5}
                sx={{ justifyContent: "center" }}
              >
                {menuItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Button
                      key={item.name} // 4. Always add a unique key prop when mapping arrays
                      color="inherit"
                      onClick={() => navigate(item.path)} // 5. Dynamically route to correct path
                      sx={{
                        fontFamily: "Montserrat",
                        fontWeight: isActive ? 700 : 600, // Make text bolder if active
                        textTransform: "none",
                        fontSize: "16px",
                        color: isActive ? "#cda587" : "#111111", // Dynamic premium color shift
                        transition: "color 0.25s ease",
                        "&:hover": {
                          color: "#cda587",
                        },
                      }}
                    >
                      {item.name}
                    </Button>
                  );
                })}
              </Stack>

              {/* Right Side: Action Utilities Icons Grid */}
              <Stack
                direction="row"
                spacing={3}
                sx={{
                  flex: 1,
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <PermIdentityIcon
                  onClick={() => setAuthOpen(true)}
                  sx={{ cursor: "pointer", color: "#111", fontSize: "22px" }}
                />
                <SearchIcon
                  sx={{ cursor: "pointer", color: "#111", fontSize: "22px" }}
                />
                <Box
                  sx={{
                    position: "relative",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <ShoppingBagIcon sx={{ color: "#111", fontSize: "22px" }} />
                  <Box
                    sx={{
                      position: "absolute",
                      top: -6,
                      right: -8,
                      bgcolor: "#111",
                      color: "#fff",
                      borderRadius: "50%",
                      width: 15,
                      height: 15,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "9px",
                      fontWeight: "bold",
                    }}
                  >
                    2
                  </Box>
                </Box>
              </Stack>
            </>
          )}

          {/* ==========================================
              CONDITION B: MOBILE NAVBAR LAYOUT 
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
              <Stack direction="row" alignItems="center" spacing={2}>
                <IconButton
                  onClick={() => setDrawerOpen(true)}
                  sx={{ p: 0, color: "#111" }}
                >
                  <MenuIcon sx={{ fontSize: "24px" }} />
                </IconButton>
                <Typography
                  variant="h4"
                  onClick={() => navigate("/")}
                  sx={{
                    fontFamily: '"Playfair Display", serif',
                    fontWeight: 900,
                    fontSize: "22px",
                    color: "#111",
                    cursor: "pointer",
                  }}
                >
                  NEXUS OS.
                </Typography>
              </Stack>
              <Stack direction="row" spacing={2.5}>
                <PermIdentityIcon
                  onClick={() => setAuthOpen(true)}
                  sx={{ cursor: "pointer", color: "#111", fontSize: "22px" }}
                />
                <SearchIcon
                  sx={{ cursor: "pointer", color: "#111", fontSize: "22px" }}
                />
                <ShoppingBagIcon
                  sx={{ cursor: "pointer", color: "#111", fontSize: "22px" }}
                />
              </Stack>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* MOBILE RESPONSIVE SLIDE OUT SLIDER DRAWER */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { width: "280px", bgcolor: "#f8f6f3" } }}
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
              // Check if this item's path matches the active browser URL
              const isActive = location.pathname === item.path;

              return (
                <ListItem disablePadding key={item.name} sx={{ mb: 0.5 }}>
                  <ListItemButton
                    onClick={() => {
                      setDrawerOpen(false);
                      navigate(item.path); // Direct dynamic routing
                    }}
                    sx={{ px: 0, "&:hover": { bgcolor: "transparent" } }}
                  >
                    <ListItemText
                      primary={item.name}
                      primaryTypographyProps={{
                        fontFamily: '"Montserrat", sans-serif',
                        fontWeight: isActive ? 600 : 500,
                        fontSize: "18px",
                        color: isActive ? "#cda587" : "#111111", // Dynamic highlight
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Drawer>

      {/* REUSABLE AUTH PORTAL SYSTEM INTERFACE MODAL */}
      <AuthModal open={authOpen} handleClose={() => setAuthOpen(false)} />
    </>
  );
};

export default TopNavbar;
