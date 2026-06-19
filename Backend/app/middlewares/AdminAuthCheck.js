const jwt = require("jsonwebtoken");
const httpStausCode = require("../utils/httpsStatusCode");



const adminAuthCheck = (req,res,next)=>{
  
    const token = req?.body?.token || req?.query?.token || req?.headers?.['x-access-token'] || req?.headers?.['authorization']

    if(!token){
        return res.status(httpStausCode.BAD_REQUEST).json({
           status:false,
           message:"Token Is Required For Acess this url"
        })
    }

    if(token.startsWith('Bearer ')){
        token = token.split(' ')[1];
    }

     try{
        const decoded = jwt.verify(token , process.env.JWT_SECRET);
        req.admin = decoded
     }
     catch(err){
        return res.status(httpStausCode.BAD_REQUEST).json({
          status:false,
          message:"Invalid Token"
        })
     }

     return next();

}

module.exports = adminAuthCheck