const httpStausCode = require("../utils/httpsStatusCode")


const AdminAuthcheck = (req,res,next)=>{
    try{
      if(req.user && req.user.role === "admin"){
        next()
      }
    }
    catch(err){
        return res.status(httpStausCode.FORBIDDEN).json({
            success:false,
            message:"You are not authorize for this operation"
        })
    }
}

module.exports = AdminAuthcheck