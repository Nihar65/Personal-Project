const mongoose=require("mongoose");
const schema=new mongoose.Schema({
    otp:{
        type:Number,
        required:true,
        unique:true
    }
})
const generatedotp=mongoose.model("generatedotp",schema);
module.exports=generatedotp