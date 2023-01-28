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
var router = express.Router(); 
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

app.get('*/mille', function(req, res, next){
    // console.log("req.url: ",req.subdomains)
    console.log("req.headers.host: ",req.headers.host)
    console.log("req.url: ",req.url)
    res.send("Now on "+req.headers.host+", Hello "+ req.headers.host.toString().split(".")[0])
    // if (req.headers.host == 'test1.localhost:3000') { //Port is important if the url has it
    //     req.url = '/test1' + req.url;
    // }
    // else if(req.headers.host == 'test2.localhost:3000') {
    //     req.url = '/test2' + req.url;
    // }  
    // next();
});


app.get('/', function(req,res){
    //Default case, no subdomain
    console.log("i am Default");
    res.send("i am default");

})

app.get('/:username', function(req,res){
    //Buyers subdomain
    console.log("i am test1");
    res.send(req.params);
})

app.get('/test2', function(req,res){
    //Sellers subdomain
    console.log("i am sellers");
    res.send("i am test2");
})