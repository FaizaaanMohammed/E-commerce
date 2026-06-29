const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  adminId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  },
  products:[
    
  ]
},
{timestamps:true}
);


module.exports = mongoose.model('Order',orderSchema);