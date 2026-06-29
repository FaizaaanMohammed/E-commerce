import React, { useState, useEffect } from 'react';
import { 
  Box, Card, Typography, useTheme, Button, TextField, InputAdornment, 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Chip, IconButton, Modal, Backdrop, Fade 
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function Products({ mode }) {
  const theme = useTheme();
  
  // 🔌 LIVE API STATES
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // 📝 MODAL & FORM STATES (Combined for Add & Edit)
  const [openModal, setOpenModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    stock: ''
  });

  // 📡 1. GET ALL PRODUCTS FROM API
  const fetchProducts = async () => {
    try {
      setLoading(true);
      // const response = await axios.get('/api/v1/products'); // 👈 Apni API URL yahan dalo bhai
      // setProducts(response.data.products);
      
      // Temporary Premium Fallback Data
      setProducts([
        { _id: 'PROD001', name: 'Nexus Cyber Sneakers', category: 'Footwear', price: 8999, stock: 42 },
        { _id: 'PROD002', name: 'Alpha Mechanical Keyboard', category: 'Accessories', price: 4500, stock: 5 },
        { _id: 'PROD003', name: 'Quantum Liquid Cooler', category: 'Hardware', price: 12999, stock: 0 },
      ]);
    } catch (err) {
      console.error("Error fetching products from backend:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ➕ OPEN MODAL FOR CREATING NEW PRODUCT
  const handleOpenAddModal = () => {
    setIsEditing(false);
    setFormData({ name: '', category: '', price: '', stock: '' });
    setOpenModal(true);
  };

  // ✏️ OPEN MODAL FOR EDITING EXISTING PRODUCT
  const handleOpenEditModal = (product) => {
    setIsEditing(true);
    setCurrentProductId(product._id);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price,
      stock: product.stock
    });
    setOpenModal(true);
  };

  // 💾 SUBMIT FORM (CREATE OR UPDATE)
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    const parsedData = {
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock)
    };

    try {
      if (isEditing) {
        // 📡 UPDATE API CALL
        // await axios.put(`/api/v1/products/${currentProductId}`, parsedData);
        
        setProducts(products.map(p => p._id === currentProductId ? { ...p, ...parsedData } : p));
        alert("Product updated successfully!");
      } else {
        // 📡 CREATE API CALL
        // const response = await axios.post('/api/v1/products', parsedData);
        // setProducts([...products, response.data.product]);

        const newProductPlaceholder = {
          _id: `PROD${Math.floor(Math.random() * 900) + 100}`,
          ...parsedData
        };
        setProducts([...products, newProductPlaceholder]);
        alert("Product added successfully!");
      }
      setOpenModal(false);
    } catch (err) {
      console.error("Form submission failed:", err);
    }
  };

  // 📡 2. DELETE PRODUCT BY ID API
  const handleDeleteProduct = async (id) => {
    if (window.confirm("Bhai, pakka product udaana hai?")) {
      try {
        // await axios.delete(`/api/v1/products/${id}`); // 👈 Delete API path yahan dalo
        setProducts(products.filter(item => item._id !== id)); // Optimistic UI update
        alert("Product successfully deleted!");
      } catch (err) {
        console.error("Delete operation failed:", err);
      }
    }
  };

  // Search Filter logic
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusChip = (stock) => {
    if (stock === 0) return <Chip label="Out of Stock" size="small" sx={{ bgcolor: 'rgba(244, 63, 94, 0.1)', color: '#f43f5e', fontWeight: 700 }} />;
    if (stock <= 5) return <Chip label="Low Stock" size="small" sx={{ bgcolor: 'rgba(234, 179, 8, 0.1)', color: '#eab308', fontWeight: 700 }} />;
    return <Chip label="In Stock" size="small" sx={{ bgcolor: 'rgba(16, 185, 129, 0.1)', color: '#10b981', fontWeight: 700 }} />;
  };

  return (
    <Box component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} sx={{ width: '100%', pb: 4 }}>
      
      {/* Page Title & Actions Header */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, gap: 2, mb: 5 }}>
        <Box>
          <Typography variant="h3" sx={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 800, color: theme.palette.text.primary, mb: 0.5, letterSpacing: '-1px' }}>
            Products Inventory
          </Typography>
          <Typography variant="body1" sx={{ fontFamily: '"Plus Jakarta Sans", sans-serif', color: theme.palette.text.secondary, fontWeight: 500 }}>
            Manage core stock, categories, and marketplace pricing metrics.
          </Typography>
        </Box>

        {/* Create Product Button */}
        <Button
          component={motion.button}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenAddModal}
          sx={{
            background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
            textTransform: 'none',
            borderRadius: '14px',
            fontFamily: '"Plus Jakarta Sans", sans-serif',
            fontWeight: 700,
            fontSize: '0.9rem',
            px: 3,
            py: 1.5,
            boxShadow: '0 8px 20px rgba(6, 182, 212, 0.25)',
            '&:hover': { background: 'linear-gradient(135deg, #06b6d4 30%, #3b82f6 100%)' }
          }}
        >
          Add Product
        </Button>
      </Box>

      {/* Modern Sub-Header Search Tool Control */}
      <Box sx={{ mb: 4, width: '100%' }}>
        <TextField
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search products by name or catalog category..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: theme.palette.text.secondary }} />
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              bgcolor: mode === 'dark' ? '#0f172a' : '#ffffff',
              borderRadius: '16px',
              border: 'none',
              '& fieldset': { border: `1px solid ${mode === 'dark' ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0,0,0,0.06)'}` },
              '&:hover fieldset': { borderColor: '#06b6d4' },
              '&.Mui-focused fieldset': { borderColor: '#06b6d4', borderWidth: '1px' },
            },
            input: { fontFamily: '"Plus Jakarta Sans", sans-serif', color: theme.palette.text.primary, fontWeight: 500 }
          }}
        />
      </Box>

      {/* 📊 ADVANCED INVENTORY DATA LEDGER TABLE */}
      <Card sx={{ bgcolor: mode === 'dark' ? '#0f172a' : '#ffffff', border: `1px solid ${mode === 'dark' ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0,0,0,0.06)'}`, borderRadius: '24px', p: 3, width: '100%', boxShadow: mode === 'dark' ? 'none' : '0 10px 30px rgba(0,0,0,0.02)' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ '& th': { borderBottom: `1px solid ${mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)'}`, color: theme.palette.text.secondary, fontWeight: 800, fontFamily: '"Plus Jakarta Sans", sans-serif', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.5px' } }}>
                <TableCell>Product Details</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Stock Count</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <AnimatePresence>
                {filteredProducts.map((product) => (
                  <TableRow 
                    key={product._id} 
                    component={motion.tr}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    sx={{ '& td': { borderBottom: `1px solid ${mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.04)'}`, color: theme.palette.text.primary, py: 2.5 } }}
                  >
                    <TableCell sx={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 700, fontSize: '0.95rem' }}>
                      {product.name}
                    </TableCell>
                    
                    <TableCell sx={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 500, color: theme.palette.text.secondary }}>
                      {product.category}
                    </TableCell>
                    
                    <TableCell sx={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, fontSize: '1rem' }}>
                      ₹{product.price.toLocaleString('en-IN')}
                    </TableCell>
                    
                    <TableCell sx={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600 }}>
                      {product.stock} Units
                    </TableCell>
                    
                    <TableCell>{getStatusChip(product.stock)}</TableCell>
                    
                    <TableCell align="right">
                      <Box display="flex" justifyContent="flex-end" gap={1}>
                        <IconButton 
                          onClick={() => handleOpenEditModal(product)}
                          sx={{ color: '#06b6d4', border: `1px solid ${mode === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.06)'}`, borderRadius: '10px', p: 1 }}
                        >
                          <EditIcon sx={{ fontSize: 18 }} />
                        </IconButton>
                        <IconButton 
                          onClick={() => handleDeleteProduct(product._id)} 
                          sx={{ color: '#f43f5e', border: `1px solid ${mode === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.06)'}`, borderRadius: '10px', p: 1 }}
                        >
                          <DeleteIcon sx={{ fontSize: 18 }} />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </AnimatePresence>
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* 📋 PREMIUM DYNAMIC MODAL (ADD & EDIT) */}
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { timeout: 300 } }}
      >
        <Fade in={openModal}>
          <Box sx={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            width: { xs: '90%', sm: 450 },
            bgcolor: mode === 'dark' ? '#0f172a' : '#ffffff',
            border: `1px solid ${mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0,0,0,0.1)'}`,
            borderRadius: '24px', p: 4, outline: 'none',
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
          }}>
            <Typography variant="h5" sx={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 800, mb: 3, color: theme.palette.text.primary }}>
              {isEditing ? '⚡ Edit Product details' : '✨ Add New Product'}
            </Typography>

            <form onSubmit={handleFormSubmit}>
              <Box display="flex" flexDirection="column" gap={2.5}>
                <TextField 
                  label="Product Name" required fullWidth
                  value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                  InputLabelProps={{ style: { fontFamily: '"Plus Jakarta Sans"' } }}
                />
                <TextField 
                  label="Category" required fullWidth
                  value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}
                  InputLabelProps={{ style: { fontFamily: '"Plus Jakarta Sans"' } }}
                />
                <TextField 
                  label="Price (INR)" type="number" required fullWidth
                  value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})}
                  InputLabelProps={{ style: { fontFamily: '"Plus Jakarta Sans"' } }}
                />
                <TextField 
                  label="Stock Units" type="number" required fullWidth
                  value={formData.stock} onChange={(e) => setFormData({...formData, stock: e.target.value})}
                  InputLabelProps={{ style: { fontFamily: '"Plus Jakarta Sans"' } }}
                />

                <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
                  <Button 
                    onClick={() => setOpenModal(false)}
                    sx={{ color: theme.palette.text.secondary, textTransform: 'none', fontFamily: '"Plus Jakarta Sans"', fontWeight: 600 }}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" variant="contained"
                    sx={{
                      background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
                      textTransform: 'none', borderRadius: '10px', fontWeight: 700, fontFamily: '"Plus Jakarta Sans"'
                    }}
                  >
                    {isEditing ? 'Save Changes' : 'Add Product'}
                  </Button>
                </Box>
              </Box>
            </form>
          </Box>
        </Fade>
      </Modal>

    </Box>
  );
}