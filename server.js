require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");
const morgan = require("morgan");
const app = express();

app.use(cors());
app.use(express.json());
//get all users
app.get("/api/v1/users", async (req, res) => {
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
            status: "succes",
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

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`server is up,listening on port ${port}`);
});