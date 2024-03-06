const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption")
const secret = process.env.SECRET;

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true,
        unique: true
    },
});

userSchema.plugin(encrypt, {secret: secret, encryptedFields: ["password"]});

const User = new mongoose.model("User", userSchema);

module.exports =  User;