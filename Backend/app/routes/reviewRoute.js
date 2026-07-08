const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");
const AuthCheck = require("../middlewares/AuthCheck");

router.post("/add-review", AuthCheck, (req, res, next) => {
    // #swagger.tags = ['Reviews']
    reviewController.addReview(req, res, next);
});

router.get("/product-review/:productId", (req, res, next) => {
    // #swagger.tags = ['Reviews']
    reviewController.getProductReviews(req, res, next);
});

router.get("/all-reviews", (req, res, next) => {
    // #swagger.tags = ['Reviews']
    reviewController.getAllReviewsForAdmin(req, res, next);
});

module.exports = router;