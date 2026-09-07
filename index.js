const connectDB = require("./configs/connect");
const userData = require("./models/user")
const userRouter = require("./routes/user")
const publicRouter = require("./routes/public")
const loginRouter = require("./routes/login")
const auth = require("./middlewares/auth")

const express = require("express");
const multer = require("multer");

const app = express();

const PORT = 8000;

connectDB();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/images/");
    },

    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({
    storage: storage
});

// Middleware to read JSON data
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(express.static("public"));

// Home route
app.get("/", (req, res) => {
    res.send("Hello World");
});

app.use("/api/user", auth, userRouter);
app.use("/public", upload.single("profileImage"), publicRouter);
app.use("/", loginRouter)

// Start server
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});