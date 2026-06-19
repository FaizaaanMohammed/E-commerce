const Product = require("../models/Product");
const httpStausCode = require("../utils/httpsStatusCode");

class ProductController {
  async createProduct(req, res) {
    try {
      const {
        title,
        description,
        price,
        category,
        stock,
        images,
        coinRewardEligible,
      } = req?.body;

      const newProduct = await Product.create({
        title,
        description,
        price,
        category,
        stock,
        images,
        coinRewardEligible,
      });

     return res.status(httpStausCode.CREATED).json({
        sucess:true,
        message:"Product has been created",
        total : newProduct.length,
        data:newProduct
     })



    } catch (err) {
      return res.status(httpStausCode.BAD_REQUEST).json({
        sucess: false,
        message: `${err?.message}`,
      });
    }
  }
}

module.exports = new ProductController();
