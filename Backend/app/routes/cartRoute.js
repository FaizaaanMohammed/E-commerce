const express = require("express");
const router = express.Router();
const CartController = require('../controllers/cartController');
const Authcheck = require('../middlewares/AuthCheck')

router.post('/add-cart', Authcheck, (req, res, next) => {
    // #swagger.tags = ['Cart']
    CartController.addToCart(req, res, next);
});

router.get('/get-cart', Authcheck, (req, res, next) => {
    // #swagger.tags = ['Cart']
    CartController.getCart(req, res, next);
});

router.delete("/remove-item/:productId", Authcheck, (req, res, next) => {
    // #swagger.tags = ['Cart']
    CartController.removeItemCart(req, res, next);
});

module.exports = router;