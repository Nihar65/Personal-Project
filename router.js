const express=require("express");
const router=express.Router();
const {GenerateOtp}=require('../controllers/userController')
const {Registration}=require('../controllers/userController')
const {LoggedIn}=require('../controllers/userController')
router.post("/gen_otp",GenerateOtp)
router.post("/register",Registration)
router.post("/loggedin",LoggedIn)
module.exports=router