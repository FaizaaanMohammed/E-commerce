const mongoose = require("mongoose");

const ConnectDb = async()=>{
   try{
      const res = await mongoose.connect(process.env.MONGO_DB_URL);
      console.log(`MongoDB Connected: ${res.connection.host}`);
   }
   catch(err){
     console.log(err.message);
     process.exit(1)
   }
}

module.exports = ConnectDb