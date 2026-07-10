import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import TopNavbar from './components/TopNavbar';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Footer from './components/Footer';
import CollectionPage from './pages/CollectionPage';
import NewArrivalsPage from './pages/NewArrivalsPage';
import SalePage from './pages/SalePage';
import Wishlist from './pages/Whistlist';
import Cart from './pages/Cart';
import Profile from './pages/Profile';

// Layout component that adds the Top Navbar to all standard pages
const StandardLayout = () => {
  return (
    <Box sx={{ bgcolor: '#f8f6f3', minHeight: '100vh' }}>
      <TopNavbar />
      <Box component="main">
        <Outlet /> {/* This renders the active sub-page (e.g., Shop) */}
      </Box>
      <Footer/>
    </Box>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        {/* 1. HOME ROUTE: Completely isolated with its own Left Sidebar */}
        <Route path="/" element={<Home />} />

        {/* 2. ALL OTHER ROUTES: Bundled under the Top Navbar layout */}
        <Route element={<StandardLayout />}>
          <Route path="/shop" element={<Shop />} />
          <Route path="/collections" element={<CollectionPage />} />
          <Route path="/new-arrivals" element={<NewArrivalsPage />} />
          <Route path="/sale" element={<SalePage />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />

          {/* Add more pages here later, like /cart or /product/:id */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;