const express = require("express");
const router = express.Router();
const authRouter = require("./authRoute");
const productRoute = require("./productRoute");
const cartRoute = require("./cartRoute");

router.use('/auth',authRouter);
router.use('/product',productRoute);
router.use('/cart',cartRoute);



module.exports = router 