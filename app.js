
const express = require("express");
require('dotenv/config')
const constants = require('./constants')
const morgan = require('morgan')
const db = require("./db");
const app = express();
const api="/api/v1"

const postgresLib =require('postgres');
const { parseSsl } = require('pg-ssl');

// const { flash } = require('express-flash-message');

const sql = postgresLib("postgres://adminroot:9ItHnxe6kRmRpzmOP0STgMozZrx6SVQd@dpg-cfe14o1mbjsrs6a5o9vg-a.singapore-postgres.render.com/mille?ssl=true");

//middleware
app.use(express.json())
app.use(morgan('tiny'))
var router = express.Router(); 

app.listen(8000,()=>{
    console.log("Server is running",)
})

// View engine setup
app.set('view engine', 'ejs');
app.use(express.static(__dirname+'/templates/assets/dist/js'));
app.use(express.static(__dirname+'/templates/assets/dist/css'));
app.use(express.static(__dirname+'/templates/assets/brand'));
app.use(express.static(__dirname+'/templates/styles'));
app.use(express.static(__dirname+'/templates/scripts'));
app.use(express.static( "public" ));

// app.use(flash({ sessionKeyName: 'flashMessage' }));

app.get('/', async (req,res)=>{
    try{
        const webspaces = await sql`select * from webspaces`;
        console.log("users: ",webspaces);
        // res.status(200).json({
        //     status: "success",
        //     data: {
        //         user: webspaces//,
        //         // reviews: reviews.rows,
        //     },
        // });
    let items = [];
    let k=0
    webspaces.forEach(ws => {
        items.push(
        {
            index:k,
            name:ws.title,
            description:ws.description,
            link:ws.url,
            imgLink:ws.thumbnail,
            categories:ws.category_id
        });
        k++;
    });

    res.render('index',{items: items});
    
    }
    catch(err){
        console.log(err);
    }
    // res.render('templIndex', { title: 'Hey', message: 'Hello there!' })
    // res.sendFile(__dirname + '/templates/index.html');
})

app.get('/main', function(req,res){
    res.sendFile(__dirname + '/index.html');
})
