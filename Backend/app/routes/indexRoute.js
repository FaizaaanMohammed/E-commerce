const express = require("express");
const router = express.Router();
const authRouter = require("./authRoute");
const productRoute = require("./productRoute");

router.use('/auth',authRouter);
router.use('/product',productRoute);



module.exports = router 