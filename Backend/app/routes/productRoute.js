const express = require('express');
const productController = require('../controllers/productController');
const AdminAuthcheck = require('../middlewares/AdminAuthCheck');
const Authcheck = require('../middlewares/AuthCheck');
const upload = require('../utils/fileUpload');
const router = express.Router();

router.post('/create-product', Authcheck, AdminAuthcheck, upload.array('images', 5), (req, res, next) => {
    // #swagger.tags = ['Products']
    productController.createProduct(req, res, next);
});

router.get('/All-product', (req, res, next) => {
    // #swagger.tags = ['Products']
    productController.getProduct(req, res, next);
});

router.put('/update-product/:id', Authcheck, AdminAuthcheck, upload.array('images', 5), (req, res, next) => {
    // #swagger.tags = ['Products']
    productController.updateProduct(req, res, next);
});

router.delete('/delete-product/:id', Authcheck, AdminAuthcheck, (req, res, next) => {
    // #swagger.tags = ['Products']
    productController.deleteProduct(req, res, next);
});

module.exports = router;