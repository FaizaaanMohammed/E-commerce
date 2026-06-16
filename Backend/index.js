const dns = require('node:dns');
dns.setServers(['8.8.8.8', '8.8.4.4']) // Forces fallback to Google's public DNS
dns.setDefaultResultOrder('ipv4first');
const dotenv = require("dotenv");
const express = require("express");
const ConnectDb = require('./app/config/db');
const mainRoute = require('./app/routes/indexRoute');
const cors = require("cors")

dotenv.config();

ConnectDb();

const app = express();


app.use(express.json());

app.use('/api/v1',mainRoute)

// cors

app.use(cors({
  origin:"https://e-commerce-lemon-nine-65.vercel.app/",
  credentials:true
}))

app.use ('/' , (req,res)=>{
  res.send("E-commrece site is running")
})

const PORT = process.env.PORT || 5000;

app.listen(PORT , ()=>{
    console.log(`server is running on ${PORT}`);
})