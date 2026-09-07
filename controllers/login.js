const loginUser = require("../models/login")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config()

async function handleLogin(req, res) {
    try {
        const { email, password } = req.body;
        const user = await loginUser.findOne({email:email});
        if (!user) return res.status(404).json({ msg: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(404).json({ msg: "Invalid crendential" });

        const token = jwt.sign(
            { userId: user.id, username: user.username },
            process.env.JWT_SECRET, { expiresIn: "1d" })

        res.json({ token , msg:"Success"})
    } catch (error) {
     res.status(500).json({ msg: error.message })
    }
}

async function handleRegister(req, res) {
    try {
        const { username, email, password } = req.body;
        const existingUser = await loginUser.findOne({ email: email, username: username });
        if (existingUser) return res.status(400).json({
            msg: "Username or email already exists."
        });

        const hasedPassword = await bcrypt.hash(password, 10);

        const user = await loginUser.create({
            username,
            email,
            password: hasedPassword,
        })
        return res.status(401).json({ msg: "Created successfull", data: user })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

module.exports = {
    handleLogin,
    handleRegister,
}