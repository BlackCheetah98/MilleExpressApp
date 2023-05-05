
const path = require('path');
const express = require("express");
var cors = require("cors");
const postgresLib =require('postgres');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use(bodyParser.urlencoded({ extended: true }));

// View engine setup
app.set('view engine', 'ejs');
app.use(express.static( "public" ));

const api="/api/v1"
const sql = postgresLib("postgres://root:Rl68aKwkLzNFSEOSdMmoevXWEWfuuJPs@dpg-chakafbhp8u791ldatc0-a.singapore-postgres.render.com/mille_vl9d?ssl=true");
//postgres://root:Rl68aKwkLzNFSEOSdMmoevXWEWfuuJPs@dpg-chakafbhp8u791ldatc0-a.singapore-postgres.render.com/mille_vl9d
app.listen(8000, () => {
  console.log(`Server listening on 8000`);
});

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get(api, (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.get(api+"/getinitdata", async (req, res) => {
  
  try{
    const rawCategories = await sql`SELECT * FROM public."tblCategories" ORDER BY category_id ASC`;
    const rawCategoryHeaders = await sql`SELECT * FROM public."tblCategoryHeaders" ORDER BY header_id ASC`;
    let categories = [];
    rawCategories.forEach(cat => {
      categories.push({
        ID:cat.category_id,
        name:cat.category_name,
        // status:cat.status,
        imgUrl:cat.image,
        iconUrl:cat.icon,
        tag:cat.tag_id,
        
      })
    });
    let headers = [];
    rawCategoryHeaders.forEach(cat => {
      headers.push({
        ID:cat.header_id,
        name:cat.header_name,
        // status:cat.status,
        imgUrl:cat.header_image,
        iconUrl:cat.header_icon,
        
      })
    });
    res.status(200).json({
        status: "OK",
        data: {
          categories: categories,
            headers:headers
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

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

