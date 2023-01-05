const express = require("express");
require('dotenv/config')
const morgan = require('morgan')
const app = express();
const api=process.env.API_URL

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
mongoose.connect(process.env.CONNECTION_STRING,{
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
    res.send("Root API Request")
})

app.get(`/users`,async (req,res)=>{
    const usersList = await Users.find()
    res.send(usersList)
})

app.post(`/users`,(req,res)=>{
    const userInstance = new Users({
        name:"Niranjan",
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
