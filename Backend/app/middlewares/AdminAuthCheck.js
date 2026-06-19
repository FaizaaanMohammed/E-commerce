const httpStausCode = require("../utils/httpsStatusCode");

const AdminAuthcheck = (req, res, next) => {

  
  try {
    console.log("Current user role from token:", req?.admin?.role)
    if (req?.admin && req?.admin?.role === "admin") {
      return next();
    }

    return res.status(httpStausCode.FORBIDDEN).json({
      success: false,
      message: "Access Denied: you are not Authorize for admin panel",
    });
  } catch (err) {
    return res.status(httpStausCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "You are not authorize for this operation",
    });
  }
};

module.exports = AdminAuthcheck;
