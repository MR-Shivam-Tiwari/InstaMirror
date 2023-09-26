const express = require('express')
const bodyParser = require("body-parser");
const port = process.env.PORT || 8080
const mongoose = require('mongoose');
const User=require("./model/user")
const multer=require("multer")
const cors=require("cors")

const app = express()
app.use(express.urlencoded());
app.use(express.json())
app.use("/uploads",express.static("./uploads"));
app.use(cors())

const DB="mongodb+srv://shivamt2023:ft123shivam123@cluster0.iacqnok.mongodb.net/"


mongoose.connect(DB,{ useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log("connection successful")
}).catch((err)=>console.log("err"))



//storge
const Storage=multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})

const upload=multer({
    storage:Storage
}).single('image')

//route

app.post("/post", upload,async(req,res)=>{
 const userpost=new User({
      image:req.file.filename,
      author:req.body.author,
      location:req.body.location,
      description:req.body.description
    })

  const data =await  userpost.save()
  if(!data){
    res.send("error")
}else{
    res.send(data)
}
    
})


app.get("/post",async(req,res)=>{
    const data=await User.find()
    if(!data){
        res.send("error")
    }else{
        res.send(data)
    }
})

app.listen(port,console.log("server is up at 8080"))