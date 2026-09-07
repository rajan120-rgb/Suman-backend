const mongoose = require("mongoose");

const userShema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    profileImage:{
        type:String,
        // default:'/images/avatar.png'
        // required:true
    }

},{timestamps:true})

const User = mongoose.model("user", userShema);

module.exports = User;