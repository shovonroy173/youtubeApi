const express = require("express");
const router = express.Router();
const {update, deleteUser, getUser, like, dislike, subscribe, unsubscribe} = require("../controllers/user");
const verifyToken  = require("../verifyToken");
 
// update user

router.put("/:id" ,   update  );
router.delete("/:id" ,     deleteUser ); 
router.get("/find/:id" ,  getUser );
router.put("/subscribe/:id"    , verifyToken ,subscribe );
router.put("/unsubscribe/:id"    , verifyToken ,unsubscribe );
router.put("/like/:videoId"   ,verifyToken , like );
router.put("/dislike/:videoId"    ,verifyToken , dislike );
module.exports = router; 