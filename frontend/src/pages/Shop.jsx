import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Stack,
  Link,
  Slider,
  IconButton,
  Button,
  Drawer,
  Pagination,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import TuneIcon from "@mui/icons-material/Tune";
import CloseIcon from "@mui/icons-material/Close";
import QuickViewModal from "../components/QuickViewModal";
import api from "../Auth/AxiosInstance";
import endpoints from "../Auth/endpoints";

const Shop = () => {
  const theme = useTheme();
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down("lg"));

  // State Management
  const [priceRange, setPriceRange] = useState([10, 100000]);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [masterCategories, setMasterCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Pagination States
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const ITEMS_PER_PAGE = 6;

  // Phase 1: Fetch unique categories across the total collection on initialization
  const fetchMasterCategories = async () => {
    try {
      const res = await api.get(endpoints.product.getAllProduct);
      const allProducts = res?.data?.data || [];
      
      const uniqueCats = allProducts.reduce((acc, product) => {
        const catName = product.category || "Uncategorized";
        if (!acc.includes(catName)) {
          acc.push(catName);
        }
        return acc;
      }, []);
      
      setMasterCategories(uniqueCats);
    } catch (err) {
      console.error("Error generating master categories:", err);
    }
  };

  // Phase 2: Fetch products using current operational state parameters + Pagination parameters
  const fetchFilteredProducts = async () => {
    try {
      const params = {
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
        page: page,
        limit: ITEMS_PER_PAGE
      };
      
      if (selectedCategory) {
        params.category = selectedCategory;
      }

      const res = await api.get(endpoints.product.getAllProduct, { params });
      
      // Update items array
      setFilteredProducts(res?.data?.data || []);
      
      // Calculate total page count dynamically from backend metrics if provided, else fall back to total length math
      const serverTotal = res?.data?.totalCount || res?.data?.length || 0;
      setTotalPages(Math.ceil(serverTotal / ITEMS_PER_PAGE) || 1);
    } catch (err) {
      console.error("Error fetching filtered product data matrix:", err);
    }
  };

  // Load category navigation targets once when layout mounts
  useEffect(() => {
    fetchMasterCategories();
  }, []);

  // Sync displayed catalog view whenever specific filters or current page shifts
  useEffect(() => {
    fetchFilteredProducts();
  }, [selectedCategory, priceRange, page]);

  // Reset current page position back to 1 if filter selection adjustments take place
  useEffect(() => {
    setPage(1);
  }, [selectedCategory, priceRange]);

  // Pagination Change Handler
  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Smooth scroll back to top on page change
  };

  // Sidebar Filter Component Markup
  const renderSidebarFilters = () => {
    const categoryCounts = filteredProducts.reduce((acc, product) => {
      const catName = product.category || "Uncategorized";
      acc[catName] = (acc[catName] || 0) + 1;
      return acc;
    }, {});

    return (
      <Stack spacing={4} sx={{ width: "100%", p: { xs: 3, lg: 0 } }}>
        {isMobileOrTablet && (
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ borderBottom: "1px solid #d5cfc6", pb: 2, mb: 2 }}
          >
            <Typography variant="h6" sx={{ fontFamily: "Montserrat", fontWeight: 700 }}>
              Filters
            </Typography>
            <IconButton onClick={() => setMobileFiltersOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Stack>
        )}

        {/* Categories Section */}
        <Box>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2.5 }}>
            <Typography
              variant="subtitle1"
              sx={{
                fontFamily: '"Playfair Display", serif',
                fontWeight: 900,
                fontSize: "20px",
              }}
            >
              Categories
            </Typography>
            {selectedCategory && (
              <Link
                component="button"
                onClick={() => setSelectedCategory(null)}
                sx={{ fontFamily: "Montserrat", fontSize: "12px", color: "#888", textDecoration: "underline", cursor: "pointer" }}
              >
                Clear
              </Link>
            )}
          </Stack>
          <Stack spacing={2}>
            {masterCategories.map((catName) => (
              <Stack 
                key={catName} 
                direction="row" 
                justifyContent="space-between" 
                alignItems="center"
                onClick={() => setSelectedCategory(selectedCategory === catName ? null : catName)}
                sx={{ cursor: 'pointer' }}
              >
                <Link
                  href="#"
                  underline="none"
                  onClick={(e) => e.preventDefault()}
                  sx={{
                    fontFamily: "Montserrat",
                    fontSize: "14px",
                    color: selectedCategory === catName ? "#cda587" : "#111111",
                    fontWeight: selectedCategory === catName ? 600 : 500,
                    transition: "color 0.2s",
                  }}
                >
                  {catName}
                </Link>
                <Typography 
                  sx={{ 
                    fontSize: "12px", 
                    color: selectedCategory === catName ? "#cda587" : "#aaa", 
                    fontFamily: "Montserrat",
                    fontWeight: selectedCategory === catName ? 600 : 400 
                  }}
                >
                  ({categoryCounts[catName] || 0})
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Box>

        <hr style={{ border: "0", borderTop: "1px solid #d5cfc6" }} />

        {/* Price Boundaries Section */}
        <Box>
          <Typography
            variant="subtitle1"
            sx={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 900,
              mb: 2,
              fontSize: "20px",
            }}
          >
            Price Range
          </Typography>
          <Slider
            value={priceRange}
            onChange={(e, val) => setPriceRange(val)}
            valueLabelDisplay="auto"
            min={10}
            max={10000000}
            sx={{
              color: "#111",
              height: 2,
              "& .MuiSlider-thumb": { bgcolor: "#111", width: 10, height: 10 },
            }}
          />
          <Typography sx={{ fontSize: "13px", fontFamily: "Montserrat", mt: 1, color: "#444" }}>
            Price: <strong>${priceRange[0]} — ${priceRange[1]}</strong>
          </Typography>
        </Box>

        <hr style={{ border: "0", borderTop: "1px solid #d5cfc6" }} />

        {/* Stock Availability UI Padding Metrics */}
        <Box>
          <Typography
            variant="subtitle1"
            sx={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 900,
              mb: 2.5,
              fontSize: "20px",
            }}
          >
            Availability
          </Typography>
          <Stack spacing={2}>
            {[
              { label: "In Stock", count: filteredProducts.filter(p => p.stock > 0).length },
              { label: "Out of Stock", count: filteredProducts.filter(p => p.stock <= 0).length }
            ].map((item) => (
              <Stack key={item.label} direction="row" justifyContent="space-between" alignItems="center">
                <Typography sx={{ fontFamily: "Montserrat", fontSize: "14px", color: "#111" }}>
                  {item.label}
                </Typography>
                <Typography sx={{ fontSize: "12px", color: "#aaa", fontFamily: "Montserrat" }}>
                  ({item.count})
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Box>
      </Stack>
    );
  };

  return (
    <Box sx={{ bgcolor: "#f8f6f3", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      
      {/* Mobile Toggle Trigger Action Bar */}
      {isMobileOrTablet && (
        <Box sx={{ px: 4, pt: 4, display: "flex", justifyContent: "flex-start" }}>
          <Button
            variant="outlined"
            startIcon={<TuneIcon />}
            onClick={() => setMobileFiltersOpen(true)}
            sx={{
              borderColor: "#111",
              color: "#111",
              borderRadius: 0,
              fontFamily: "Montserrat",
              fontSize: "13px",
              fontWeight: 600,
            }}
          >
            Filter Sidebar
          </Button>
        </Box>
      )}

      {/* Frame Core Layout Framework Container */}
      <Box sx={{ display: "flex", flexGrow: 1, px: { xs: 4, md: 8 }, py: 6, gap: 5 }}>
        
        {/* Persistent Layout Desktop Element */}
        {!isMobileOrTablet && (
          <Box sx={{ width: "240px", minWidth: "240px" }}>
            {renderSidebarFilters()}
          </Box>
        )}

        {/* Slide Draw Layout Layer for Mobile Views */}
        <Drawer
          anchor="left"
          open={mobileFiltersOpen}
          onClose={() => setMobileFiltersOpen(false)}
          PaperProps={{ sx: { width: "290px", bgcolor: "#f8f6f3" } }}
        >
          {renderSidebarFilters()}
        </Drawer>

        {/* Product Catalog Core Presentation Grid */}
        <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
          <Grid container spacing={4} sx={{ width: "100%", flexGrow: 1 }}>
            {filteredProducts.length === 0 ? (
              <Box sx={{ width: "100%", py: 10, textAlign: "center", mx: "auto" }}>
                <Typography sx={{ fontFamily: "Montserrat", color: "#666" }}>
                  No products found matching the criteria.
                </Typography>
              </Box>
            ) : (
              filteredProducts.map((product) => (
                <Grid item xs={12} sm={6} md={4} size={{ xs: 12, sm: 6, md: 4 }} key={product._id}>
                  <Box
                    onMouseEnter={() => setHoveredProduct(product._id)}
                    onMouseLeave={() => setHoveredProduct(null)}
                    sx={{
                      width: "100%",
                      aspectRatio: "3/4",
                      bgcolor: "#fff",
                      position: "relative",
                      overflow: "hidden",
                      cursor: "pointer",
                      mb: 2.5,
                    }}
                  >
                    {/* Double Image Interactive Crossfade Transitions */}
                    <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
                      <Box
                        component="img"
                        src={product.images?.[0] || 'https://via.placeholder.com/300x400'}
                        alt={product.title}
                        sx={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          position: "absolute",
                          top: 0,
                          left: 0,
                          opacity: hoveredProduct === product._id ? 0 : 1,
                          transition: "opacity 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
                        }}
                      />
                      <Box
                        component="img"
                        src={product.images?.[1] || product.images?.[0] || 'https://via.placeholder.com/300x400'}
                        alt={product.title}
                        sx={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          position: "absolute",
                          top: 0,
                          left: 0,
                          opacity: hoveredProduct === product._id ? 1 : 0,
                          transition: "opacity 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
                        }}
                      />
                    </Box>

                    {/* Action Overlay Navigation Icons */}
                    <AnimatePresence>
                      {hoveredProduct === product._id && (
                        <Stack
                          component={motion.div}
                          initial={{ opacity: 0, x: 15 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 15 }}
                          transition={{ duration: 0.22 }}
                          spacing={1.2}
                          sx={{ position: "absolute", bottom: 25, right: 15, zIndex: 20 }}
                        >
                          <IconButton
                            onClick={() => {
                              setSelectedProduct(product);
                              setQuickViewOpen(true);
                            }}
                            sx={{
                              bgcolor: "#fff",
                              color: "#111",
                              p: 1.2,
                              boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                              "&:hover": { bgcolor: "#111", color: "#fff" },
                            }}
                          >
                            <RemoveRedEyeIcon sx={{ fontSize: "16px" }} />
                          </IconButton>
                          <IconButton sx={{ bgcolor: "#fff", color: "#111", p: 1.2, "&:hover": { bgcolor: "#111", color: "#fff" } }}>
                            <ShoppingBagIcon sx={{ fontSize: "16px" }} />
                          </IconButton>
                          <IconButton sx={{ bgcolor: "#fff", color: "#111", p: 1.2, "&:hover": { bgcolor: "#111", color: "#fff" } }}>
                            <FavoriteBorderIcon sx={{ fontSize: "16px" }} />
                          </IconButton>
                        </Stack>
                      )}
                    </AnimatePresence>
                  </Box>

                  {/* Pricing and Metadata Labels */}
                  <Stack spacing={1} alignItems="center" sx={{ textAlign: "center" }}>
                    <Typography
                      variant="body1"
                      sx={{
                        fontFamily: '"Montserrat", sans-serif',
                        fontWeight: 500,
                        fontSize: "15px",
                        color: "#111",
                        "&:hover": { color: "#cda587" },
                        transition: "color 0.2s",
                      }}
                    >
                      {product.title}
                    </Typography>
                    <Stack direction="row" spacing={1.5}>
                      <Typography sx={{ fontFamily: "Montserrat", fontWeight: 600, fontSize: "14px", color: "#111" }}>
                        ${product.price ? product.price.toFixed(2) : "0.00"}
                      </Typography>
                    </Stack>
                  </Stack>
                </Grid>
              ))
            )}
          </Grid>

          {/* Elegant Center-Aligned Pagination Bar Component */}
          {filteredProducts.length > 0 && (
            <Stack direction="row" justifyContent="center" sx={{ mt: 6, mb: 2 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                shape="circular"
                sx={{
                  "& .MuiPaginationItem-root": {
                    fontFamily: "Montserrat",
                    fontWeight: 500,
                    color: "#111",
                    "&.Mui-selected": {
                      bgcolor: "#111",
                      color: "#fff",
                      "&:hover": {
                        bgcolor: "#333",
                      },
                    },
                    "&:hover": {
                      bgcolor: "#e5dfd5",
                    },
                  },
                }}
              />
            </Stack>
          )}
        </Box>
      </Box>

      {/* Target Interaction Overlays */}
      <QuickViewModal
        open={quickViewOpen}
        handleClose={() => {
          setQuickViewOpen(false);
          setSelectedProduct(null);
        }}
        product={selectedProduct}
      />
    </Box>
  );
};

export default Shop;