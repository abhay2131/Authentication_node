const mongoose = require("mongoose");



 const connectDB = async (req, res) => {

    try{
        const conn = await mongoose.connect("mongodb://127.0.0.1:27017/userDB");
        console.log("Connected to the database: ");
    }
    catch(error){
        console.log("Failed to connect to the database: ", error.message);
    }
}

module.exports = connectDB;