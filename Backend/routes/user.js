const express = require('express')
const router = express.Router();
const {login,signup} =  require("../controllers/usercontroller")

module.exports = router;
router.post("/login/",login)
router.post("/signup/",signup)