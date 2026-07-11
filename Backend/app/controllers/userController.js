const User = require("../models/User");
const WalletConfig = require("../models/WalletConfig");
const httpStausCode = require("../utils/httpsStatusCode");

class userController {
  
  // 📡 1. GET ALL USERS WITH CALCULATED WALLET BALANCES
  async getAllUsersForAdmin(req, res) {
    try {
      // Wallet config se current exchange rate nikalenge (Default to 100 if not set)
      const config = await WalletConfig.findOne();
      const coinToRupeeRate = config?.coinToRupeeRate || 100;

      // Saare users fetch karenge jinka role 'user' hai (Admins ko list se bahar rakhne ke liye)
      const users = await User.find({ role: { $ne: "admin" } })
        .select("name email walletBalance status")
        .sort({ createdAt: -1 });

        

      // Data ko frontend format ke mutabik map karenge
      const formattedUsers = users.map(user => {
        const coins = user.walletBalance || 0;
        // Dynamic Rupee conversion mapping
        console.log('user',user.status)
        const rupeeBalance = Number((coins / coinToRupeeRate).toFixed(2)); 

        return {
          _id: user._id,
          name: user.name,
          email: user.email,
          coinBalance: coins,
          rupeeBalance: rupeeBalance,
          status: user.status ? user.status : "active"
        };
      });

      return res.status(httpStausCode.OK).json({
        success: true,
        count: formattedUsers.length,
        users: formattedUsers
      });

    } catch (err) {
      return res.status(httpStausCode.INTERNAL_SERVER_ERROR).json({ success: false, message: err.message });
    }
  }

  // 3. GEt single user Data 

  // 3. Get single user Data 
async getSingleUserData(req, res) {
  try {
    const { id } = req.params; 

    
    const config = await WalletConfig.findOne();
    const coinToRupeeRate = config?.coinToRupeeRate || 100;

    
    const user = await User.findById(id).select("name email walletBalance status phone address");

    // Agar user nahi milta toh 404 error return karenge
    if (!user) {
      return res.status(httpStausCode.NOT_FOUND).json({ 
        success: false, 
        message: "User not found" 
      });
    }

    // 3. Dynamic Rupee conversion mapping (Same as above)
    const coins = user.walletBalance || 0;
    const rupeeBalance = Number((coins / coinToRupeeRate).toFixed(2));

    // 4. Clean Frontend Responsive Data Format
    const formattedUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone || "", // Frontend form fallback ke liye
      address: user.address || "", // Frontend shipping textfield ke liye
      coinBalance: coins,
      rupeeBalance: rupeeBalance,
      status: user.status || "active"
    };

    return res.status(httpStausCode.OK).json({
      success: true,
      user: formattedUser
    });

  } catch (err) {
    return res.status(httpStausCode.INTERNAL_SERVER_ERROR).json({ 
      success: false, 
      message: err.message 
    });
  }
}

  // 📡 2. TOGGLE USER ACCOUNT STATUS (BLOCK / UNBLOCK)
  async toggleUserStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body; // Expecting 'active' or 'blocked'

      if (!status || !["active", "blocked"].includes(status)) {
        return res.status(httpStausCode.BAD_REQUEST).json({
          success: false,
          message: "Valid status value ('active' or 'blocked') is mandatory!"
        });
      }

      const updatedUser = await User.findByIdAndUpdate(
        id,
        { status: status },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(httpStausCode.BAD_REQUEST).json({
          success: false,
          message: "User account not found in database!"
        });
      }

      return res.status(httpStausCode.OK).json({
        success: true,
        message: `Customer account access successfully updated to '${status}'!`,
        user: updatedUser
      });

    } catch (err) {
      return res.status(httpStausCode.INTERNAL_SERVER_ERROR).json({ success: false, message: err.message });
    }
  }
}

module.exports = new userController();