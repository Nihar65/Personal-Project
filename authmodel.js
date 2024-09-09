const mongoose=require("mongoose");
const schema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    work:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        minLength:6
    }
})
const User=mongoose.model("Users",schema);
module.exports=User