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

  // get all product

  async getProduct (req,res){
   try{
     const products = await Product.find();
     return res.status(httpStausCode.OK).json({
        success:true,
        message:"All Product Get Succesfully",
        length:products.length,
        data:products
     })
   }
   catch(err){
       return res?.status(httpStausCode.BAD_REQUEST).json({
         success:false,
         message:`${err?.message}`
       })
   }
  }

  // edit product
  
  async updateProduct (req,res){
     try{
       const {id} = req?.params;
        
       const updateProduct  = await Product.findByIdAndUpdate(id,req.body,{
         new:true,
         runValidators:true
       })

       if(!updateProduct){
         return res.status(httpStausCode.NOT_FOUND).json({
            success:false,
            message:"Product not found"
         })
       }

       return res.status(httpStausCode.OK).json({
        success:true,
        message:"Product Update successfully",
        data:updateProduct
       })

     }
     catch(err){
        return res.status(httpStausCode.BAD_REQUEST).json({
            success:false,
            message:`${err.message}`
        })
     }
  }

  // delete product 

  async deleteProduct (req,res){
    try{
      const {id} = req?.params;
      
      const productDelete = await Product.findByIdAndDelete(id);

      if(!productDelete){
        return res.status(httpStausCode.NOT_FOUND).json({
            success:false,
            message:"Product Not found"
        })
      }

      return res.status(httpStausCode.OK).json({
         success:false,
         message:"Product has been delete"
      })

    }
    catch(err){
        return res.status(httpStausCode.NOT_FOUND).json({
            success:false,
            message:`${err.message}`
        })
    }
  }

}

module.exports = new ProductController();
