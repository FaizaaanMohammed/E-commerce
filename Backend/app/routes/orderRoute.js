const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const AuthCheck = require("../middlewares/AuthCheck");

// 1. Customer Endpoint: Checkout/Place Order from Cart
router.post("/create-order", AuthCheck, orderController.createOrder);

// 2. Customer Endpoint: Track personal order history
router.get("/my-orders", AuthCheck, orderController.getUserOrders);

//  3. Admin Dashboard Endpoint: View all customer orders
router.get("/admin/all-orders", AuthCheck, orderController.getAllOrdersForAdmin);

module.exports = router;