const User = require("../models/User");
const httpStausCode = require("../utils/httpsStatusCode");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto"); 
const sendEmail = require("../utils/sendEmail");

class UserController {

  // 1. USER REGISTER (With Email Verification Logic)
  async userRegister(req, res) {
    try {
      const { name, email, password ,role} = req.body;

      // Validation
      if (!name || !email || !password) {
        return res.status(httpStausCode.BAD_REQUEST).json({
          success: false,
          message: "All fields Required",
        });
      }

      // User already exists check
      const userExist = await User.findOne({ email });
      if (userExist) {
        return res.status(httpStausCode.BAD_REQUEST).json({
          success: false,
          message: "User Already Registered",
        });
      }

      // Hashed password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Unique verification token aur 24 ghante ki expiry generate karein
      const verificationToken = crypto.randomBytes(32).toString("hex");
      const tokenExpiry = Date.now() + 24 * 60 * 60 * 1000; 

      // Create New User (isVerified initially false rahega)
      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        role:role,
        virtualBalance: 1000,
        isVerified: false, 
        verificationToken: verificationToken,
        verificationTokenExpires: tokenExpiry
      });

      // Verification URL jo frontend par redirect karega
     const verificationUrl = `${process.env.FRONTEND_URL}/api/v1/auth/verify-email?token=${verificationToken}`;

      // User ko email bhejna
      try {
        await sendEmail({
          email: newUser.email,
          subject: "Email Verification - Action Required",
          html: `<h3>Welcome ${newUser.name}!</h3>
                 <p>Thank you for registering. Please click the button below to verify your email address:</p>
                 <a href="${verificationUrl}" target="_blank" style="background: #2563eb; color: white; padding: 10px 20px; text-decoration: none; display: inline-block; border-radius: 5px; font-weight: bold;">Verify Email</a>
                 <p>Note: This link is valid for only 24 hours.</p>`,
        });
      } catch (mailErr) {
        console.log("Email sending failed:", mailErr);
        // Mail fail hone par bhi response return ho jayega taaki execution na ruke
      }

      return res.status(httpStausCode.CREATED).json({
        success: true,
        message: "Registration successful! Please check your email to verify your account.",
      });

    } catch (err) {
      console.log(err);
      return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  }

  // 2. VERIFY EMAIL (Naya Endpoint - Jab user link click karega)
  async verifyEmail(req, res) {
  try {
    const { token } = req.query;
   

    if (!token) {
      return res.status(httpStausCode.BAD_REQUEST).json({
        success: false,
        message: "Verification token is missing",
      });
    }

    // 🌟 STEP 1: Sirf token ke basis par user ko dhoondhein (Bina expiry ke check karein)
    const user = await User.findOne({ verificationToken: token });
    
    

    if (!user) {
      return res.status(httpStausCode.BAD_REQUEST).json({
        success: false,
        message: "Invalid token. User not found in database with this token.",
      });
    }

    // 🌟 STEP 2: Agar user mil gaya, toh update karein
    user.isVerified = true;
    user.verificationToken = undefined; // Token clear karein
    user.verificationTokenExpires = undefined;
    await user.save();

    return res.status(httpStausCode.OK).json({
      success: true,
      message: "Email verified successfully! You can now log in.",
    });

  } catch (err) {
    console.log("Verification Error:", err);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

  // 3. USER LOGIN (Check validation for verification)
  async userLogin(req, res) {
    try {
      const { email, password } = req?.body;

      if (!email || !password) {
        return res.status(httpStausCode.BAD_REQUEST).json({
          sucess: false,
          message: "All fields are required"
        });
      }

      const extinguisher = await User.findOne({ email });

      if (!extinguisher) {
        return res.status(httpStausCode.BAD_REQUEST).json({
          sucess: false,
          message: "User does not exist"
        });
      }

      // ⚠️ IMPORTANT: Agar user verified nahi hai, toh login rok do
      if (!extinguisher.isVerified) {
        return res.status(403).json({
          success: false,
          message: "Your email is not verified. Please check your email to verify your account.",
        });
      }

      let isCheck = await bcrypt.compare(String(password), extinguisher.password);

      if (!isCheck) {
        return res.status(400).json({
          success: false,
          message: "Invalid Credentials",
        });
      }

      const token = jwt.sign(
        {
          id: extinguisher._id,
          name: extinguisher.name,
          email: extinguisher.email,
          role: extinguisher.role
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      // Security Fix: Password field ko response data se hata diya hai
      return res.status(httpStausCode.OK).json({
        sucess: true,
        message: "Logged in successfully",
        data: {
          id: extinguisher._id,
          name: extinguisher.name,
          email: extinguisher.email,
          role: extinguisher.role
        },
        token: token
      });

    } catch (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
}

module.exports = new UserController();