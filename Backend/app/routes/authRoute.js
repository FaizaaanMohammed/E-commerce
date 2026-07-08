const express = require('express');
const router = express.Router();
const userController = require('../controllers/authController')

router.post('/register', (req, res, next) => {
    // #swagger.tags = ['Authentication']
    userController.userRegister(req, res, next);
});

router.get("/verify-email", (req, res, next) => {
    // #swagger.tags = ['Authentication']
    userController.verifyEmail(req, res, next);
});

router.post('/login', (req, res, next) => {
    // #swagger.tags = ['Authentication']
    userController.userLogin(req, res, next);
});

module.exports = router;