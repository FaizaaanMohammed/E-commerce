const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const AdminAuthcheck = require('../middlewares/AdminAuthCheck');
const Authcheck = require('../middlewares/AuthCheck');

// Secure Admin Management Gateways
router.get("/admin/users", Authcheck, AdminAuthcheck, (req, res, next) => {
    // #swagger.tags = ['User List']
    userController.getAllUsersForAdmin(req, res, next);
});

router.put("/admin/users/status/:id", Authcheck, AdminAuthcheck, (req, res, next) => {
    // #swagger.tags = ['User List']
    userController.toggleUserStatus(req, res, next);
});

module.exports = router;