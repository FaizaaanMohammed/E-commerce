const express = require('express');
const productController = require('../controllers/productController');
const AdminAuthcheck = require('../middlewares/AdminAuthCheck');
const Authcheck = require('../middlewares/AuthCheck');
const router = express.Router();


router.post('/create-product',Authcheck,AdminAuthcheck,productController.createProduct)


module.exports = router