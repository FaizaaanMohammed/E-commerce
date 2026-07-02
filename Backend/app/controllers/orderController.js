const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const httpStatusCode = require("../utils/httpsStatusCode");

class orderController {
  
  // 🛒 1. CREATE NEW ORDER (CHECKOUT FROM CART)
  async createOrder(req, res) {
  try {
    const adminId = req?.admin?.id;
    const { remainingPaymentMethod } = req.body;

    // 1. User ka active cart find karenge
    const cart = await Cart.findOne({ adminId });
    if (!cart || cart.products.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Your Cart is empty ! Please add some Items to cart!",
      });
    }

    let totalAmount = 0;
    const orderItems = [];

    // 2. Loop chala kar har ek product ki quantity aur price fetch karenge
    for (const item of cart.products) {
      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product record Not found in Database!`,
        });
      }

      // 🚨 NaN SAFE GUARD: Quantity aur Stock ko strictly Number mein convert karenge
      const itemQuantity = Number(item.quantity) || 1; 
      const productStock = Number(product.stock) || 0;

      // Inventory check verification
      if (productStock < itemQuantity) {
        return res.status(400).json({
          success: false,
          message: `${product.title} stock is only! Sirf ${productStock} items available.`,
        });
      }

      // Pricing aur Calculations sync
      const priceAtPurchase = product.price || 0;
      totalAmount += priceAtPurchase * itemQuantity;

      // Order items array mein push karenge
      orderItems.push({
        productId: item.productId,
        quantity: itemQuantity,
        priceAtPurchase
      });

      // 🚨 Stock update safely (bina NaN ke risk ke)
      product.stock = productStock - itemQuantity;
      await product.save();
    }

    // 3. New Order Create karenge
    const newOrder = await Order.create({
      userId: adminId,
      items: orderItems,
      totalAmount,
      walletPaymentAmount: 0,
      remainingPaymentMethod: remainingPaymentMethod || "COD",
      orderStatus: "Delivered",
      coinsEarnedFromOrder: Math.floor(totalAmount * 0.01)
    });

    // 4. Cart khali kar denge
    cart.products = [];
    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Order successfully placed 🛒",
      data: newOrder,
    });

  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}

  // 📦 2. GET USER ORDERS (CUSTOMER HISTORY)
  async getUserOrders(req, res) {
    try {
      const adminId = req?.admin?.id;
      const orders = await Order.find({ userId: adminId })
        .populate("items.productId", "title images")
        .sort({ createdAt: -1 });

      return res.status(httpStatusCode.OK).json({
        success: true,
        count: orders.length,
        data: orders,
      });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  // 📈 3. GET ALL ORDERS FOR ADMIN PANEL
  async getAllOrdersForAdmin(req, res) {
    try {
      const orders = await Order.find()
        .populate("userId", "name email")
        .populate("items.productId", "title price")
        .sort({ createdAt: -1 });

      return res.status(httpStatusCode.OK).json({
        success: true,
        count: orders.length,
        data: orders,
      });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }
  // 🔄 4. UPDATE ORDER STATUS (ADMIN ACTION DROPDOWN)
async updateOrderStatus(req, res) {
  try {
    const { orderId } = req.params; // URL se order ID nikalenge
    const { status } = req.body;    // Frontend dropdown se badla hua status aayega ('Shipped', 'Delivered', etc.)

    console.log("🔥 BACKEND HIT HUA! Order ID:", orderId, "Naya Status:", status);

    // Validation check: Status khali nahi hona chahiye
    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status value sending will mandatory!",
      });
    }

    // Database mein order ka status dhoondh kar update karenge[cite: 1]
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { orderStatus: status }, // Schema ke orderStatus field mein save hoga[cite: 1]
      { new: true } // Taaki hume updated data response mein mile
    );

    if (!updatedOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not Found in DataBase!",
      });
    }

    // 🪙 GAMIFIED WALLET SYSTEM RULE[cite: 1]: 
   
    if (status === "Delivered") {
      console.log(`Order ${orderId} delivered . User get ${updatedOrder.coinsEarnedFromOrder} coins reward !`);
      
      // TODO: Jab wallet module connect karenge, toh yahan User.findByIdAndUpdate chala kar 
      // user ke coinBalance mein 'updatedOrder.coinsEarnedFromOrder' plus kar denge[cite: 1].
    }

    return res.status(200).json({
      success: true,
      message: `Order status successfully Changed '${status}'!`,
      data: updatedOrder,
    });

  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}
}

module.exports = new orderController();