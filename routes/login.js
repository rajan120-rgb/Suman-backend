const { handleLogin ,handleRegister} = require("../controllers/login")
const loginUser = require("../models/login")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config()

const express = require("express");
const loginRouter = express.Router();

loginRouter.post("/register",handleRegister)
loginRouter.post("/login", handleLogin)

module.exports = loginRouter;