const User = require("../models/User");
const httpStausCode = require("../utils/httpsStatusCode");
const bcrypt = require("bcrypt");

class UserController {
  async userRegister(req, res) {
    try {
      const { name, email, password } = req.body;

      //   validation

      if ((!name || !email || !password)) {
        return res.status(httpStausCode.BAD_REQUEST).json({
          success: false,
          message: "All fields Required",
        });
      }

      //   user already exist

      const userExist = await User.findOne({ email });
      if (userExist) {
        return res.status(httpStausCode.BAD_REQUEST).json({
          success: false,
          message: "User Already Registerd",
        });
      }

      // hashed password

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // create newUser

      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        virtualBalance: 1000,
      });

      // 5. Success Response bhejen (Password ko response se exclude kar dena security ke liye)
      return res.status(httpStausCode.CREATED).json({
        success: true,
        message: "User registered successfully",
        data: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          virtualBalance: newUser.virtualBalance,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new UserController();
