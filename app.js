const express = require("express");
require('dotenv/config')
const morgan = require('morgan')
const app = express();
const api="/api/v1"

const mongoose = require('mongoose')

const UsersSchema = mongoose.Schema({
    name:String,
    profilePicture:String,
    code:{type:Number,default:0},
    isAuth:Boolean
});
const Users = mongoose.model("collUsers",UsersSchema); //collection

//middleware
app.use(express.json())
app.use(morgan('tiny'))

//db Connection
mongoose.connect("mongodb+srv://root:Demo123@nirancluster.yqpm8sy.mongodb.net/?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useUnifiedTopology:true,
    dbName:'dbUsers'
}).then(()=>{
    console.log("mongo db connected successfully")
})
app.listen(3000,()=>{
    console.log("Server is running")
})

//APIs
app.get('/',(req,res)=>{
    console.log("Server is running")
    console.log("req.subdomains: ",req.subdomains)
    res.send("Mille v0.0.0.1 API Request",req.subdomains[0])
})

app.get(`/users`,async (req,res)=>{
    const usersList = await Users.find()
    res.send(usersList)
})

app.post(`/users`,(req,res)=>{
    const userInstance = new Users({
        name:"Kishore",
        profilePicture:"dfghjkjhgfdfghjkjhgfd",
        code:1234,
        isAuth:false
    })
    userInstance.save().then(resObject =>{
        res.status(201).json(resObject)
    }).catch((err)=>{
        res.status(500).json({
            error:err,
            success:false
        })
    })
})
