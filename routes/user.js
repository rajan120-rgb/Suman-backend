const express = require("express");
const router = express.Router();
const {handleGetData,handleGetDataById,handleDeleteDataById,handleUpdateDataById} = require("../controllers/user")


router.get("/",handleGetData)


router.route("/:id").get(handleGetDataById).delete(handleDeleteDataById).put(handleUpdateDataById)

module.exports = router;