const Product = require("../models/Product");
const httpStatusCode = require("../utils/httpsStatusCode"); // 1. Spelling standard rakh di hai
const cloudinary = require("cloudinary").v2;




console.log("Cloudinary API Key:", process.env.CLOUDINARY_API_KEY);

class ProductController {
  // ==================== CREATE PRODUCT ====================
  // ==================== CREATE PRODUCT ====================
async createProduct(req, res) {
  try {
    // 1. Cloudinary config apply karein
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    let requestData = {};

    // 2. Bulletproof Parsing: Check karein data wrapper string hai ya direct fields hain
    if (req.body.data && typeof req.body.data === "string") {
      requestData = JSON.parse(req.body.data);
    } else {
      // Agar direct payload aa raha ho (Jaise aapke frontend screenshot mein hai)
      requestData = req.body;
    }

    // 3. Variables destructure karein safely
    const { title, description, price, category, stock, coinRewardEligible } = requestData;

    // --- Baki ka aapka upload aur creation logic bilkul same rahega ---
    let imageUrls = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "product_images",
        });
        imageUrls.push(result.secure_url);
      }
    } else if (requestData.images && Array.isArray(requestData.images)) {
      imageUrls = requestData.images;
    }

    const newProduct = await Product.create({
      title,
      description,
      price,
      category,
      stock,
      images: imageUrls,
      coinRewardEligible,
    });

    return res.status(httpStatusCode.CREATED).json({
      success: true,
      message: "Product has been created",
      data: newProduct,
    });

  } catch (err) {
    console.error("Actual Backend Error Structure:", err); // Yeh line real issue debug karne mein help karegi
    return res.status(httpStatusCode.BAD_REQUEST).json({
      success: false,
      message: err.message,
    });
  }
}

  // ==================== GET ALL PRODUCTS ====================
  async getProduct(req, res) {
    try {
      const products = await Product.find();
      return res.status(httpStatusCode.OK).json({
        success: true,
        message: "All Products Fetched Successfully",
        length: products.length,
        data: products,
      });
    } catch (err) {
      return res.status(httpStatusCode.BAD_REQUEST).json({
        success: false,
        message: err.message,
      });
    }
  }

  // ==================== EDIT/UPDATE PRODUCT ====================
  async updateProduct(req, res) {
    try {
      const { id } = req.params;
      let requestData = req.body;

      if (typeof req.body.data === "string") {
        requestData = JSON.parse(req.body.data);
      }

      // Nayi images handle karne ke liye array
      let imageUrls = [];

      // Agar edit karte waqt nayi files upload ki hain
      if (req.files && req.files.length > 0) {
        for (const file of req.files) {
          const result = await cloudinary.uploader.upload(file.path, {
            folder: "product_images",
          });
          imageUrls.push(result.secure_url);
        }
        // req.body mein images array ko nayi urls se replace/add karein
        requestData.images = imageUrls;
      }

      const updatedProduct = await Product.findByIdAndUpdate(id, requestData, {
        new: true,
        runValidators: true,
      });

      if (!updatedProduct) {
        return res.status(httpStatusCode.NOT_FOUND).json({
          success: false,
          message: "Product not found",
        });
      }

      return res.status(httpStatusCode.OK).json({
        success: true,
        message: "Product Updated successfully",
        data: updatedProduct,
      });
    } catch (err) {
      return res.status(httpStatusCode.BAD_REQUEST).json({
        success: false,
        message: err.message,
      });
    }
  }

  // ==================== DELETE PRODUCT ====================
  async deleteProduct(req, res) {
    try {
      const { id } = req.params;

      const productDelete = await Product.findByIdAndDelete(id);

      if (!productDelete) {
        return res.status(httpStatusCode.NOT_FOUND).json({
          success: false,
          message: "Product Not found",
        });
      }

      return res.status(httpStatusCode.OK).json({
        success: true, // Fixed: Pehle yahan false tha
        message: "Product has been deleted",
      });
    } catch (err) {
      return res.status(httpStatusCode.BAD_REQUEST).json({
        success: false,
        message: err.message,
      });
    }
  }
}

module.exports = new ProductController();
