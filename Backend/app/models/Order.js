const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product", // Lowercase "product" model jaisa aapne register kiya tha
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min: [1, "Quantity kam se kam 1 honi chahiye bhai"]
      },
      priceAtPurchase: {
        type: Number,
        required: true // Purchase ke time ka original price record karne ke liye
      }
    }
  ],
  totalAmount: {
    type: Number,
    required: true,
    default: 0
  },
  walletPaymentAmount: {
    type: Number,
    required: true,
    default: 0 // Loyalty wallet se kata hua amount[cite: 1]
  },
  remainingPaymentMethod: {
    type: String,
    enum: ['COD', 'ONLINE'], // Insufficient wallet balance ke baad ka selection mode[cite: 1]
    required: true
  },
  orderStatus: {
    type: String,
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending'
  },
  coinsEarnedFromOrder: {
    type: Number,
    default: 0 // Delivery par user ko milne wale reward coins[cite: 1]
  }
},
{ timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);