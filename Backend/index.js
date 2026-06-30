const dns = require('node:dns');
dns.setServers(['8.8.8.8', '8.8.4.4']) // Forces fallback to Google's public DNS
dns.setDefaultResultOrder('ipv4first');
const dotenv = require("dotenv").config();
const express = require("express");
const ConnectDb = require('./app/config/db');
const mainRoute = require('./app/routes/indexRoute');
const cors = require("cors")



ConnectDb();

const app = express();


// cors

// List of allowed URLs
const allowedOrigins = [
  "https://e-commerce-lemon-nine-65.vercel.app", 
  "https://e-commerce-djzo.vercel.app",    
  "http://localhost:5173",                       
  "http://localhost:3000"                       
];



app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like Postman, mobile apps, or server-to-server)
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));


app.use(express.json());

app.use('/api/v1',mainRoute)




app.use ('/' , (req,res)=>{
  res.send("E-commrece site is running")
})

const PORT = process.env.PORT || 5000;

app.listen(PORT , ()=>{
    console.log(`server is running on ${PORT}`);
})