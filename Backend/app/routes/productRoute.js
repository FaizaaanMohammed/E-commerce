const express = require('express');
const productController = require('../controllers/productController');
const AdminAuthcheck = require('../middlewares/AdminAuthCheck');
const Authcheck = require('../middlewares/AuthCheck');
const upload = require('../utils/fileUpload');
const router = express.Router();


router.post('/create-product',Authcheck,AdminAuthcheck,upload.array('images', 5),productController.createProduct)
router.get('/All-product',productController.getProduct)
router.put('/update-product/:id',Authcheck,AdminAuthcheck,upload.array('images', 5),productController.updateProduct)
router.delete('/delete-product/:id',Authcheck,AdminAuthcheck,productController.deleteProduct)


module.exports = router