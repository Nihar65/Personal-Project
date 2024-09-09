const mongoose=require("mongoose");
const connectMongoDb=async ()=>{
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/Auth", {
        }
    ).then(()=>{console.log("Mongo db connected successfully")});
        
    }
    catch(error){
        console.log("Mongo connection issues in connectMongoDb",error)
    }
}
module.exports=connectMongoDb