
const path = require('path');
const express = require("express");
var cors = require("cors");
const postgresLib =require('postgres');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express();
app.use(cors());
app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use(bodyParser.urlencoded({ extended: true }));

// View engine setup
app.use(cors());
app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// View engine setup
app.set('view engine', 'ejs');
app.use(express.static( "public" ));


const api="/api/v1"
// const sql = postgresLib("postgres://root:Rl68aKwkLzNFSEOSdMmoevXWEWfuuJPs@dpg-chakafbhp8u791ldatc0-a.singapore-postgres.render.com/mille_vl9d?ssl=true");
const sql = postgresLib("postgres://mooiktnb:spz15AFa9eeMGpzmL677l5B_kdDEYc8m@mahmud.db.elephantsql.com/mooiktnb?ssl=true");
//postgres://root:Rl68aKwkLzNFSEOSdMmoevXWEWfuuJPs@dpg-chakafbhp8u791ldatc0-a.singapore-postgres.render.com/mille_vl9d
app.listen(8000, () => {
  console.log(`Server listening on 8000`);
});

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get(api, (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.get(api+"/getinitdata", async (req, res) => {
  console.log("/getInitData")
  try{
    const rawCategories = await sql`SELECT * FROM public."tblCategories" ORDER BY category_id ASC`;
    const rawTrends = await sql`SELECT * FROM public."tblWebSpaces" ORDER BY webspace_id ASC`;
    let categories = [];
    rawCategories.forEach(cat => {
      categories.push({
        ID:cat.category_id,
        name:cat.name,
        header:cat.header,
        imgUrl:cat.image,
        iconUrl:cat.icon,
        // tag:cat.tag_id,
        
      })
    });
    let trends = [];
    rawTrends.forEach(trend => {
      trends.push({
        ID:trend.webspace_id,
        name:trend.name
      })
    });
    res.status(200).json({
        status: "OK",
        data: {
          categories: categories,
          trends:trends
        },
    });
    }
    catch(err){
        console.log(err);
        res.status(400).json({
          status: "NOTOK"
      })
    }
});



app.post(api+"/registerUser", async (req, res) => {
  try{
    const { name, phone, email, password } = req.body;
    console.log("/registerUser",req);
    // Check if the username or email already exists
    const existingUser = await sql`select * from public."tblUsers" where number=${phone}`
    console.log(existingUser)
    if (existingUser.length>0) {
      console.log("exist")
      return res.status(200).json({ message: 'USEREXISTS' });
    }
    console.log("new user")
    // Hash and salt the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword)
    await sql`INSERT INTO public."tblUsers" ( name,hashed_password, number, email) VALUES ( ${name}, ${hashedPassword},${phone}, ${email} );`;
    res.status(201).json({ message: 'User registered successfully' });

  }
  catch(err){
      console.log(err);
      res.status(400).json({
        status: "NOTOK"
    })
  }
});

app.post(api+"/loginUserUsingEmail", async (req, res) => {
  try{
    const { email, password } = req.body;
    console.log("/loginUser", req.body);
    // Check if the username or email already exists
    // const existingUser = await sql`select * from tblUsers where username=${username}`
    // if (existingUser) {
    //   return res.status(400).json({ message: 'Username or email already exists' });
    // }

    // Hash and salt the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, 10);
    // const hashedPassword2 = await bcrypt.hash(password, salt);
    // `DELETE FROM public."tblProcurements" WHERE item_id=${req.body.item_id}`
    console.log(req.body,hashedPassword);
    // console.log(hashedPassword2);
    const users = await sql`SELECT * FROM public."tblUsers" where email=${req.body.email};`;
    console.log(users);
    if( users.length <= 0 ) {
      console.log("no user exist !!!")
      res.status(200).json({ message: 'NOUSEREXIST' });
    }
    else {
      console.log("users[0].hashed_password : ",users[0].hashed_password)
      bcrypt.compare(password, users[0].hashed_password, function(error, isMatch) {
        if (error) {
          // return callback(error)
          console.log(error)
        } else {
          let currentUser= users[0];
          currentUser.hashed_password="hashedpasswordresetted"
          res.status(200).json({ message: 'USEREXIST', isMatch:isMatch,userObj:currentUser });
        }
      })
      // let user = await sql`SELECT user_id, latitude, longitude, is_number_verified, is_email_verified, user_type
      // FROM public."tblUsers" where user_email='${email}' and hashed_password='${hashedPassword}';`;
      // if( user.length >0){
      //   res.status(200).json({ message: 'PASSWORDWRONG' })
      // } else{
      //   res.status(200).json({ message: 'USEREXIST', 
      //   data: {
      //     userDetails:user
      //   } })
      // }
    }
    
  }
  catch(err){
      console.log(err);
      res.status(400).json({
        status: "NOTOK"
    })
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

