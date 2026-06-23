const Review = require("../models/Review");
const Product = require("../models/Product");
const httpStausCode = require("../utils/httpsStatusCode");

class reviewController {
  //  1. ADD OR UPDATE REVIEW
  async addReview(req, res) {
    try {
      const { productId, rating, comment } = req.body;
      const adminId = req?.admin?.id; 

      
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(httpStausCode.NOT_FOUND).json({
          success: false,
          message: "Product not found!",
        });
      }

      // Is Existing review
      let alreadyReviewed = await Review.findOne({ productId, adminId });

      if (alreadyReviewed) {
       
        alreadyReviewed.rating = rating;
        alreadyReviewed.comment = comment;
        await alreadyReviewed.save();

        return res.status(httpStausCode.OK).json({
          success: true,
          message: "Review Updated",
          data: alreadyReviewed,
        });
      }

      // New review
      const newReview = await Review.create({
        productId,
        adminId,
        rating,
        comment,
      });

      return res.status(httpStausCode.OK).json({
        success: true,
        message: "Review successfully add ho gaya!",
        data: newReview,
      });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  // 2. GET ALL REVIEWS FOR A PRODUCT
  async getProductReviews(req, res) {
    try {
      const { productId } = req.params;

      
      const reviews = await Review.find({ productId }).populate({
        path: "adminId",
        select: "name email", 
      });

      return res.status(httpStausCode.OK).json({
        success: true,
        count: reviews.length,
        data: reviews,
      });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }
}

module.exports = new reviewController();