const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const AuthCheck = require("../middlewares/AuthCheck");

// 1. Customer Endpoint: Checkout/Place Order from Cart
router.post("/create-order", AuthCheck, (req, res, next) => {
    // #swagger.tags = ['Orders']
    orderController.createOrder(req, res, next);
});

// 2. Customer Endpoint: Track personal order history
router.get("/my-orders", AuthCheck, (req, res, next) => {
    // #swagger.tags = ['Orders']
    orderController.getUserOrders(req, res, next);
});

//  3. Admin Dashboard Endpoint: View all customer orders
router.get("/admin/all-orders", AuthCheck, (req, res, next) => {
    // #swagger.tags = ['Orders']
    orderController.getAllOrdersForAdmin(req, res, next);
});

// orderRoute.js ke andar admin section mein ye line add karein:
router.put("/admin/update-status/:orderId", AuthCheck, (req, res, next) => {
    // #swagger.tags = ['Orders']
    orderController.updateOrderStatus(req, res, next);
});

module.exports = router;