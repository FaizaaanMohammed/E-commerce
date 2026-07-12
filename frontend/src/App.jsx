import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
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
import BlogPage from './pages/SalePage';


const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

// Layout component that adds the Top Navbar to all standard pages
const StandardLayout = () => {
  return (
    <Box sx={{ bgcolor: '#f8f6f3', minHeight: '100vh' }}>
      <TopNavbar />
      <Box component="main">
        <Outlet /> 
      </Box>
      <Footer/>
    </Box>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        {/* HOME ROUTE: Completely isolated with its own Left Sidebar */}
        <Route path="/" element={<Home />} />

        {/* ALL OTHER ROUTES: Bundled under the Top Navbar layout */}
        <Route element={<StandardLayout />}>
          <Route path="/shop" element={<Shop />} />
          <Route path="/collections" element={<CollectionPage />} />
          <Route path="/new-arrivals" element={<NewArrivalsPage />} />
          <Route path="/blog" element={<BlogPage />} />
          
         
          <Route 
            path="/wishlist" 
            element={
              <ProtectedRoute>
                <Wishlist />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/cart" 
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />

        </Route>
      </Routes>
    </Router>
  );
}

export default App;