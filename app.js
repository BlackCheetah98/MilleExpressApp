
const express = require("express");
require('dotenv/config')
const constants = require('./constants')
const morgan = require('morgan')
const app = express();
const api="/api/v1"

const mongoose = require('mongoose')

const UsersSchema = mongoose.Schema({
    name:{type:String,required:true},
    profilePicture:{type:String,default:constants.defaultUserImage},
    code:{type:Number,default:0},
    isAuth:{Boolean,default:false},
    isOnboarded:{Boolean,default:false},
    webSite:{type:String,default:"{}"},
    nativeSite:{type:String,default:"{}"}
});

const Users = mongoose.model("collUsers",UsersSchema); //collection

//middleware
app.use(express.json())
app.use(morgan('tiny'))
var router = express.Router(); 
//db Connection
mongoose.connect("mongodb+srv://User01:Abc123@millecluster.m6ezxdm.mongodb.net/?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useUnifiedTopology:true,
    dbName:'dbUsers'
}).then(()=>{
    console.log("mongo db connected successfully")
})

app.listen(8000,()=>{
    console.log("Server is running",)
})

//Website Builder functionality
app.get('*', function(req, res, next){
    
    if(req.headers.host.toString().split(".").length > 1)
        //retrieve user record from db
        if(true) {
            //const comm = require("./comm")
            //comm.argument = req.headers.host.toString().split(".")[0];
            res.send("Now on "+req.headers.host+", Hello "+ req.headers.host.toString().split(".")[0])
            console.log("entered server")
            // res.sendFile(__dirname + '/frontend/public/index.html');
        }
        else {
            res.send("User Website Not Found")
            // res.sendFile('./templates/promoCreateWebsite.html');
            
        }
    else
        next();
    
    // if (req.headers.host == 'test1.localhost:3000') {
    //     req.url = '/test1' + req.url;
    // }
    // next();
});


app.get('/', function(req,res){
    res.sendFile(__dirname + '/index.html');
})



app.get('/main', function(req,res){
    res.sendFile(__dirname + '/index.html');
})

//get custom domain parameters
// app.get('/:username', function(req,res){
//     //Buyers subdomain
//     console.log("i am test1");
//     res.send(req.params);
// })

app.post(api+'/createUserProfile', function(req,res){
    //Sellers subdomain
    const user = new Users ({
        name:req.body.name,
        profilePicture:req.body.profilePicture,
        code:req.body.code,
        isAuth:req.body.isAuth,
        isOnboarded:req.body.isOnboarded
    })
    user.save().then((createdUser)=>{
            res.status(201).json(createdUser)
    }).catch((err)=>{
        res.status(500).json({
            error:err,
            success:false
        })
    })
})

app.get(api+'/getAllUserProfiles', async function(req,res){
    const usersList = await Users.find();
    res.send(usersList)
})