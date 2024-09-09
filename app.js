const express=require("express");
const app=express();
const cors=require('cors')
const authRoute=require('./routes/router')
const dataBaseConn=require("./config/connectMongoDb");
dataBaseConn();
app.use(express.json())
app.use(cors())
app.use("/Auth",authRoute)
   
app.listen(3500,()=>{console.log("port running successfully")})