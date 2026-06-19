const express = require('express');
const router = express.Router();
const userController = require('../controllers/authController')


router.post('/register',userController.userRegister)
router.get("/verify-email", userController.verifyEmail);
router.post('/login',userController.userLogin)


module.exports = router