import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Button,
  Box,
  Divider,
  TextField,
  Stack,
  Card,
  CardContent,
  Paper,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

import PermIdentityIcon from "@mui/icons-material/PermIdentityOutlined";
import OrderIcon from "@mui/icons-material/ShoppingBagOutlined";
import CoinIcon from "@mui/icons-material/LocalActivityOutlined";
import EditIcon from "@mui/icons-material/EditOutlined";
import LogoutIcon from "@mui/icons-material/LogoutOutlined";
import { useNavigate } from "react-router-dom";
import api from "../Auth/AxiosInstance";
import endpoints from "../Auth/endpoints";

const Profile = () => {
  const navigate = useNavigate();
  const [orderHistory, setOrderHistory] = useState([]); 
  const [user, setUser] = useState(null);
  const [singleUSerDetails, setSingleUserDetails] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  
  const [coinToRupeeValue, setCoinToRupeeValue] = useState(100); 
  const [coinsCashValue, setCoinsCashValue] = useState(0);

  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  // Dynamic values binding safely synced from state containers
  const userCoinsBalance = singleUSerDetails?.coinBalance || 0; 

  const getOrderHistory = async(userId) => {
    console.log(userId,'userId')

    try {
      // 1. Parallel responses extraction safely
      const res = await api.get(endpoints.orders.getAllOrders);
      const walletRes = await api.get(endpoints.wallet.walletData);
      
      // FIXED spelling: endpoints.userDetails kiya aur params ke bajaye confirmed userId use ki
      const userRes = await api.get(`${endpoints.userDetails.getSingleUserDetails}/${userId}`);
      
      setOrderHistory(res?.data?.data || []);
      
      // 2. Extract configuration layers directly
      const rate = walletRes?.data?.data?.coinToRupeeRate || 100;
      setCoinToRupeeValue(rate);
      
      const dynamicUser = userRes?.data?.user;
      if (dynamicUser) {
        setSingleUserDetails(dynamicUser);
        
        // Dynamic balance injection directly via local sync mapping
        setCoinsCashValue(dynamicUser?.rupeeBalance || 0);

        // Fill up fields layout fields dynamically
        setProfileData({
          name: dynamicUser.name || "N/A",
          email: dynamicUser.email || "N/A",
          phone: dynamicUser.phone || "+91 0000000000",
          address: dynamicUser.address || "Address not provided",
        });
      }
    } catch (err) {
      console.error("Crucial API Binding Failure Log:", err?.response?.data || err.message);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("nexus_user");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);

        if (parsedUser?.id) {
          getOrderHistory(parsedUser.id); // Storage sync workflow kicked off cleanly
        }
      } catch (error) {
        console.error("Error parsing user data from localStorage", error);
      }
    }
  }, []);

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("nexus_user");
    setUser(null);
    setSingleUserDetails({});
    navigate("/");
    console.log("Logged out successfully");
  };

  return (
    <Box
      sx={{
        bgcolor: "#FBF9F6",
        minHeight: "100vh",
        py: { xs: 6, md: 10 },
        fontFamily: "Montserrat, sans-serif",
      }}
    >
      <Container maxWidth="xl">
        {/* Header Section */}
        <Box
          sx={{
            mb: { xs: 6, md: 8 },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "11px",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#A57C5A",
              fontWeight: 600,
              mb: 1.5,
              fontFamily: "Montserrat, sans-serif",
            }}
          >
            NEXUS OS. MEMBER STUDIO
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 400,
              color: "#1A1A1A",
              fontSize: { xs: "2.2rem", sm: "2.8rem", md: "3.2rem" },
              fontFamily: "Playfair Display, Georgia, serif",
              letterSpacing: "-0.01em",
            }}
          >
            My Account
          </Typography>
        </Box>

        {/* Layout Grid */}
        <Grid container spacing={{ xs: 4, md: 5 }}>
          {/* Left Block: Wallet & Perks */}
          <Grid item xs={12} md={4} size={{xs:12,md:4}}>
            <Stack spacing={3}>
              <Card
                sx={{
                  bgcolor: "#1A1A1A",
                  color: "white",
                  borderRadius: 0,
                  boxShadow: "none",
                  border: "1px solid #1A1A1A",
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    sx={{ mb: 4 }}
                  >
                    <Box>
                      <Typography
                        sx={{
                          fontSize: "10px",
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                          color: "rgba(255,255,255,0.6)",
                          fontWeight: 600,
                          fontFamily: "Montserrat, sans-serif",
                        }}
                      >
                        NEXUS WALLET
                      </Typography>
                      <Typography
                        variant="h4"
                        sx={{
                          fontFamily: "Playfair Display, Georgia, serif",
                          mt: 1.5,
                          fontWeight: 500,
                        }}
                      >
                        {userCoinsBalance.toLocaleString()}
                        <span
                          style={{
                            fontSize: "15px",
                            fontFamily: "Montserrat, sans-serif",
                            color: "#A57C5A",
                            fontWeight: 500,
                          }}
                        >
                          Coins
                        </span>
                      </Typography>
                    </Box>
                    <Box sx={{ color: "#A57C5A", display: "flex", mt: 0.5 }}>
                      <CoinIcon sx={{ fontSize: 26 }} />
                    </Box>
                  </Stack>

                  <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", my: 2.5 }} />

                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Box>
                      <Typography
                        sx={{
                          fontSize: "11px",
                          color: "rgba(255,255,255,0.5)",
                          fontFamily: "Montserrat, sans-serif",
                        }}
                      >
                        Cash Equivalence
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "18px",
                          fontWeight: 600,
                          mt: 0.5,
                          fontFamily: "Montserrat, sans-serif",
                          color: "white",
                        }}
                      >
                        ₹{coinsCashValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </Typography>
                    </Box>
                    <Typography
                      sx={{
                        color: "rgba(255,255,255,0.4)",
                        fontSize: "10px",
                        letterSpacing: "0.05em",
                        fontWeight: 500,
                        fontFamily: "Montserrat, sans-serif",
                      }}
                    >
                      {coinToRupeeValue || 100} COINS = ₹1
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>

              <Box sx={{ border: "1px solid #EDEDED", p: 3.5, bgcolor: "white" }}>
                <Typography
                  sx={{
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    mb: 1,
                    color: "#1A1A1A",
                    fontFamily: "Montserrat, sans-serif",
                  }}
                >
                  STUDIO CLUB PERKS
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    fontSize: "13px",
                    lineHeight: 1.6,
                    fontFamily: "Montserrat, sans-serif",
                  }}
                >
                  As an elite store curator, your wallet tokens map directly
                  onto live invoices during final checkout execution workflows.
                </Typography>
              </Box>
            </Stack>
          </Grid>

          {/* Right Block: Account Profile Form & Purchases */}
          <Grid item xs={12} md={8} md={4} size={{xs:12,md:8}}>
            <Stack spacing={4}>
              <Paper
                sx={{
                  border: "1px solid #EDEDED",
                  borderRadius: 0,
                  boxShadow: "none",
                  p: { xs: 3, md: 4.5 },
                  bgcolor: "white",
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ mb: 4.5 }}
                >
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Box sx={{ color: "#1A1A1A", display: "flex" }}>
                      <PermIdentityIcon sx={{ fontSize: 24 }} />
                    </Box>
                    <Typography
                      sx={{
                        fontSize: "16px",
                        fontWeight: 600,
                        color: "#1A1A1A",
                        fontFamily: "Montserrat, sans-serif",
                        letterSpacing: "0.02em",
                      }}
                    >
                      Personal Details
                    </Typography>
                  </Stack>
                  {!isEditing && (
                    <Button
                      startIcon={<EditIcon sx={{ fontSize: "14px !important" }} />}
                      onClick={() => setIsEditing(true)}
                      sx={{
                        color: "#1A1A1A",
                        fontSize: "12px",
                        fontWeight: 600,
                        letterSpacing: "0.05em",
                        fontFamily: "Montserrat, sans-serif",
                      }}
                    >
                      Edit Profile
                    </Button>
                  )}
                </Stack>

                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      disabled={!isEditing}
                      label="Full Name"
                      value={profileData.name}
                      onChange={(e) =>
                        setProfileData({ ...profileData, name: e.target.value })
                      }
                      slotProps={{
                        input: { sx: { borderRadius: 0, fontSize: "13px", fontFamily: "Montserrat, sans-serif" } },
                        inputLabel: { sx: { fontSize: "13px", fontFamily: "Montserrat, sans-serif" } },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      disabled={!isEditing}
                      label="Email Address"
                      value={profileData.email}
                      onChange={(e) =>
                        setProfileData({ ...profileData, email: e.target.value })
                      }
                      slotProps={{
                        input: { sx: { borderRadius: 0, fontSize: "13px", fontFamily: "Montserrat, sans-serif" } },
                        inputLabel: { sx: { fontSize: "13px", fontFamily: "Montserrat, sans-serif" } },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      disabled={!isEditing}
                      label="Phone Number"
                      value={profileData.phone}
                      onChange={(e) =>
                        setProfileData({ ...profileData, phone: e.target.value })
                      }
                      slotProps={{
                        input: { sx: { borderRadius: 0, fontSize: "13px", fontFamily: "Montserrat, sans-serif" } },
                        inputLabel: { sx: { fontSize: "13px", fontFamily: "Montserrat, sans-serif" } },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      disabled={!isEditing}
                      label="Default Shipping Address"
                      value={profileData.address}
                      onChange={(e) =>
                        setProfileData({ ...profileData, address: e.target.value })
                      }
                      slotProps={{
                        input: { sx: { borderRadius: 0, fontSize: "13px", fontFamily: "Montserrat, sans-serif" } },
                        inputLabel: { sx: { fontSize: "13px", fontFamily: "Montserrat, sans-serif" } },
                      }}
                    />
                  </Grid>
                </Grid>

                {isEditing && (
                  <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 4 }}>
                    <Button
                      variant="outlined"
                      onClick={() => setIsEditing(false)}
                      sx={{
                        borderRadius: 0,
                        color: "#1A1A1A",
                        borderColor: "#1A1A1A",
                        px: 3,
                        fontSize: "12px",
                        fontFamily: "Montserrat, sans-serif",
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      onClick={handleSave}
                      sx={{
                        borderRadius: 0,
                        bgcolor: "#1A1A1A",
                        px: 4,
                        fontSize: "12px",
                        fontFamily: "Montserrat, sans-serif",
                        boxShadow: "none",
                        "&:hover": { bgcolor: "#A57C5A" },
                      }}
                    >
                      Save Changes
                    </Button>
                  </Stack>
                )}
              </Paper>

              {/* Dynamic Order History List */}
              <Paper
                sx={{
                  border: "1px solid #EDEDED",
                  borderRadius: 0,
                  boxShadow: "none",
                  p: { xs: 3, md: 4.5 },
                  bgcolor: "white",
                }}
              >
                <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 3 }}>
                  <Box sx={{ color: "#1A1A1A", display: "flex" }}>
                    <OrderIcon sx={{ fontSize: 22 }} />
                  </Box>
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: 600,
                      color: "#1A1A1A",
                      fontFamily: "Montserrat, sans-serif",
                      letterSpacing: "0.02em",
                    }}
                  >
                    Recent Studio Purchases
                  </Typography>
                </Stack>

                <List sx={{ p: 0 }}>
                  {orderHistory.length === 0 ? (
                    <Typography sx={{ fontSize: "13px", color: "text.secondary", fontFamily: "Montserrat" }}>
                      No orders found.
                    </Typography>
                  ) : (
                    orderHistory.map((order, idx) => (
                      <Box key={order._id || idx}>
                        {idx > 0 && <Divider sx={{ my: 2, borderColor: "#EDEDED" }} />}
                        <ListItem
                          sx={{
                            px: 0,
                            display: "flex",
                            flexDirection: { xs: "column", sm: "row" },
                            alignItems: { xs: "flex-start", sm: "center" },
                            gap: 2,
                          }}
                        >
                          <ListItemText
                            primary={`Order ID: ${order?._id || "N/A"}`}
                            secondary={order?.createdAt ? `Placed on ${new Date(order.createdAt).toLocaleDateString()}` : "Date N/A"}
                            slotProps={{
                              primary: { sx: { fontSize: "13px", fontWeight: 600, color: "#1A1A1A", fontFamily: "Montserrat" } },
                              secondary: { sx: { fontSize: "12px", fontFamily: "Montserrat", mt: 0.5 } },
                            }}
                          />

                          <Stack
                            direction="row"
                            spacing={4}
                            sx={{
                              width: { xs: "100%", sm: "auto" },
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <Typography
                              sx={{ fontSize: "14px", fontWeight: 600, color: "#1A1A1A", fontFamily: "Montserrat" }}
                            >
                              ₹{order?.totalAmount || 0}
                            </Typography>
                            <Box
                              sx={{
                                bgcolor: order?.orderStatus === "Processing" ? "#FFF8E1" : "#E8F5E9",
                                color: order?.orderStatus === "Processing" ? "#F57F17" : "#2E7D32",
                                px: 2,
                                py: 0.5,
                                fontSize: "10px",
                                fontWeight: 700,
                                textTransform: "uppercase",
                                letterSpacing: "0.05em",
                                fontFamily: "Montserrat, sans-serif",
                              }}
                            >
                              {order?.orderStatus || "Unknown"}
                            </Box>
                          </Stack>
                        </ListItem>
                      </Box>
                    ))
                  )}
                </List>
              </Paper>

              {/* Logout Button */}
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  onClick={handleLogout}
                  variant="text"
                  startIcon={<LogoutIcon sx={{ fontSize: "16px !important" }} />}
                  sx={{
                    color: "#9C2B2B",
                    fontSize: "12px",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    fontFamily: "Montserrat, sans-serif",
                    "&:hover": { bgcolor: "#FFEBEE" },
                  }}
                >
                  Log out from Account
                </Button>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Profile;