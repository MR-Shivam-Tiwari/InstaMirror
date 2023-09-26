const mongoose=require("mongoose");


const userSchema= new mongoose.Schema({
    image:String,
    author:String,
    location:String,
    description:String
})

const User=mongoose.model("User",userSchema)

module.exports=User;

