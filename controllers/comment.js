const createError = require("../error");
const Comment = require("../models/Comment");
const Video = require("../models/Comment");

const addComment = async (req, res, next) => {
  const newComment = new Comment({ ...req.body, userId: req.user.id });
  try {
    const saveComment = await newComment.save();
    res.status(200).json(saveComment);
  } catch (err) {
    next(err);
    console.log(err);
  }
};
const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findOne({videoId:req.params.id});
    console.log("req.body" ,req.body);
    const video = await Video.findById(req.params.id);
    if (req.user.id === comment.userId || req.user.id === video.userId) {
      await Comment.findByIdAndDelete(req.params.id);
      res.status(200).json("The comment has been deleted");
    } else {
      return next(createError(403, "You can delete only your comment"));
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};
const getComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({videoId:req.params.videoId});
    res.status(200).json(comments);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = { addComment, deleteComment, getComments };
