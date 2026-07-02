const express = require("express");
const router = express.Router();
const authRouter = require("./authRoute");
const productRoute = require("./productRoute");
const cartRoute = require("./cartRoute");
const reviewRoute = require("./reviewRoute");
const orderRoute = require("./orderRoute");

router.use('/auth',authRouter);
router.use('/product',productRoute);
router.use('/cart',cartRoute);
router.use('/reviews',reviewRoute);
router.use("/orders",orderRoute);



module.exports = router 