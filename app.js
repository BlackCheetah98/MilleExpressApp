
const express = require("express");
require('dotenv/config')
const constants = require('./constants')
const morgan = require('morgan')
const db = require("./db");
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
/*
app.get('*', function(req, res, next){
    
    if(req.headers.host.toString().split(".").length > 1)
        //retrieve user record from db
        if(true) {
            //const comm = require("./comm")
            //comm.argument = req.headers.host.toString().split(".")[0];
            //res.send("Now on "+req.headers.host+", Hello "+ req.headers.host.toString().split(".")[0])
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
*/

app.get('/', function(req,res){
    res.sendFile(__dirname + '/index.html');
})

app.get('/main', function(req,res){
    res.sendFile(__dirname + '/index.html');
})

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

//get all users
app.get("/api/v1/users", async (req, res) => {
    const { Client } = require('pg')
    const client = new Client({
        host: 'dpg-cfe14o1mbjsrs6a5o9vg-a',
        port: 5334,
        database:'mille',
        user: 'adminroot',
        password: '9ItHnxe6kRmRpzmOP0STgMozZrx6SVQd',
      })
      client.connect((err) => {
        if (err) {
          console.error('pg connection error', err.stack)
        } else {
          console.log('connected to postgres')
        }
      })
    try{
        //const results = await db.query("select * from users")
        const userRatingsData = await db.query(
            "select * from users left join (select id_user, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by id_user) reviews on users.user_id = reviews.id_user;"
        );
        res.status(200).json({
            status: "success",
            results: userRatingsData.rows.length,
            data: {
              user: userRatingsData.rows,
            },
          });
    }catch(err){
        console.log(err);
    }
});

//get a user
//www.milleservices.com/api/v1/users/100
app.get("/api/v1/users/:user_id", async (req, res) => {
    console.log(req.params.id);
    try{
        const user = await db.query(
            "select * from users left join (select id_user, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by id_user) reviews on users.user_id = reviews.id_user where id = $1",
            [req.params.user_id]
        );
        // select * from restaurants wehre id = req.params.id
      
        const reviews = await db.query(
            "select * from reviews where restaurant_id = $1",
            [req.params.user_id]
        );
        console.log(reviews);
      
        res.status(200).json({
            status: "success",
            data: {
                user: user.rows[0],
                reviews: reviews.rows,
            },
        });
    }catch(err){
        console.log(err);
    }
});

//create a user
app.post("/api/v1/users", async (req, res) => {
    console.log(req.body);
    try{
        const results = await db.query("INSERT INTO users (first_name, last_name, rating) values ($1, $2, $3) returning *",
        [req.body.first_name, req.body.last_name, req.body.rating] )
        res.status(200).json({
            status: "success",
            data: {
                user: results.rows[0],
            },
        });
    }catch(err){
        console.log(err);
    }
});

//update a user
app.put("/api/v1/users/:user_id", async (req, res) => {
    console.log(req);
    try{
        const results = await db.query("UPDATE users SET first_name = $1, last_name = $2, rating = $3 where user_id = $4 returning *", 
        [req.body.first_name, req.body.last_name, req.body.rating, req.params.user_id]);
        res.status(200).json({
            status: "success",
            data: {
                user: results.rows[0],
            },
        });
    }catch(err){
        console.log(err);
    }
    console.log(req.params.id);
    console.log(req.body);
});

//delete a user
app.delete("/api/v1/users/:user_id", async (req, res) => {
    try {
        const results = db.query("DELETE FROM users where id = $1", [
            req.params.user_id,
        ]);
        res.status(204).json({
            status: "sucess",
        });
    } catch (err) {
            console.log(err);
    }
});

//add reviews
app.post("/api/v1/users/:user_id/addReview", async (req, res) => {
    try {
        const newReview = await db.query(
            "INSERT INTO reviews (id_user, name, review, rating) values ($1, $2, $3, $4) returning *;",
            [req.params.user_id, req.body.name, req.body.review, req.body.rating]
        );
        console.log(newReview);
        res.status(201).json({
            status: "success",
            data: {
                review: newReview.rows[0],
            },
        });
    } catch (err) {
        console.log(err);
    }
});
