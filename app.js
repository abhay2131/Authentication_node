//jshint esversion:6
require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const app = express();
const connectDB = require("./db/db");
const User = require("./db/userSchema");

const PORT = process.env.PORT || 3000;

// set up middlewares
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.set("view engine", "ejs");


// connecting to the database server:
connectDB();

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/register", (req, res) => {
    res.render("register");
});


app.post("/login", async(req, res) => {
   try{
    const password = req.body.password
    const loginUser = await User.findOne({
        email: req.body.username
    });

    if(!loginUser){
        res.send("User not found!");
    }
    else{
         if(loginUser.password === password){
              res.render("secrets");
         }
         else{
            res.send("Enter the correct password!");
         }
    }
   }
    catch(err){
        console.log(err.message);
    }
});

app.post("/register", (req, res) => {
    const newUser = new User({
       email: req.body.username,
       password: req.body.password
    });

    const status = newUser.save();
    if(!status){
        console.log(status.meassage);
    }
    else{
        res.render("secrets");
    }
})









const server = app.listen(PORT, () => {
    console.log("Server is running on port: ", PORT);
});