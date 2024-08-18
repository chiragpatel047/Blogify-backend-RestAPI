const mongoose = require("mongoose");

const UserModel = mongoose.Schema({
    
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
},{timestamps : true});

module.exports = mongoose.model("UserModel",UserModel);