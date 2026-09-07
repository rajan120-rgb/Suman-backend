const mongoose = require("mongoose");

function connectDB() {
    mongoose.connect("mongodb://127.0.0.1:27017/portfolio-backend")
        .then(() => console.log("MongoDB connected"))
        .catch((err) => console.log("MongoDB connection error:", err));
}

module.exports = connectDB;