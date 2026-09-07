const {hanldePostData} = require("../controllers/user")
const express = require("express");
const publicRouter = express.Router();

publicRouter.post("/user",hanldePostData)

module.exports = publicRouter