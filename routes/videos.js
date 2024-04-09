const express = require("express");
const router = express.Router();
const { addVideo, subscribed, trend, random, addView, updateVideo, deleteVideo, getVideo, getByTag, search, latest, likes, dislikes, music, sports, gaming, news, movies } = require("../controllers/video");
const verifyToken = require("../verifyToken");
 
// create a video

router.post("/"   , verifyToken,  addVideo );
router.put("/:id"  , updateVideo );
router.delete("/:id"    , deleteVideo );
router.get("/find/:id" , getVideo );
router.put("/view/:id" , addView );
router.get("/trend" , trend );
router.get("/random" , random );
router.get("/sub"   ,  subscribed );
router.get("/tags" , getByTag );
router.get("/search" ,search ); 
router.get("/latest" ,latest ); 
router.get("/music" ,music ); 
router.get("/sports" ,sports ); 
router.get("/gaming" ,gaming ); 
router.get("/news" ,news ); 
router.get("/movies" ,movies ); 
router.get("/likes"    , likes ); 
router.get("/dislikes"  , dislikes ); 


module.exports = router; 