const express = require('express');
const walletController = require('../controllers/walletController');
const AdminAuthcheck = require('../middlewares/AdminAuthCheck');
const Authcheck = require('../middlewares/AuthCheck');
const router = express.Router();

// 1. GET Current Rules
router.get('/get-config', Authcheck, (req, res, next) => {
    // #swagger.tags = ['Wallet']
    walletController.getWalletConfig(req, res, next);
});

// 2. PUT Update Rules
router.put('/update-config', Authcheck, AdminAuthcheck, (req, res, next) => {
    // #swagger.tags = ['Wallet']
    walletController.updateWalletConfig(req, res, next);
});

// 3. POST Trigger System Air-Drop
router.post('/trigger-airdrop', Authcheck, AdminAuthcheck, (req, res, next) => {
    // #swagger.tags = ['Wallet']
    walletController.triggerAirDrop(req, res, next);
});

module.exports = router;