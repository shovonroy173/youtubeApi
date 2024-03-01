const express = require("express");
const {signup , signin, googleAuth} = require ("../controllers/auth");
const verifyToken = require("../verifyToken");
const router = express.Router();

// create a user
 router.post("/signup", signup)
// sing in 
router.post("/signin", verifyToken ,  signin)

// google auth
router.post("/google", googleAuth)


module.exports = router;

