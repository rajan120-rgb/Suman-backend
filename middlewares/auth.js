const loginUser = require("../models/login")

const jwt = require("jsonwebtoken");

const auth = async (req,res,next)=>{
    try {
        const bearerHeader = req.headers['authorization']
        if(typeof bearerHeader != 'undefined'){
           const token = bearerHeader.split(" ")[1];
           const user = jwt.verify(token,process.env.JWT_SECRET);

           req.token = user
           next()
        }else{
            res.status(401).json({msg:"No token provided"})
        }
    } catch (error) {
          res.status(403).json({msg:"Invalid or expired token"})
    }
}

module.exports = auth;