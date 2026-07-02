const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");
const AuthCheck = require("../middlewares/AuthCheck");


router.post("/add-review", AuthCheck, reviewController.addReview);
router.get("/product-review/:productId", reviewController.getProductReviews);
router.get("/all-reviews", reviewController.getAllReviewsForAdmin);

module.exports = router;