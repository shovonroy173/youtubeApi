const User = require("../models/User");
const Video = require("../models/Video");
const createError = require("../error");

const update = async (req, res, next) => {
  // console.log(req.user.id);
  if (req.params.id === req.body.userId) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: { name: req.body.name },
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, "You can update only your account!"));
  }
};
const deleteUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const updatedUser = await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User deleted");
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, "You can delete only your account!"));
  }
};
const getUser = async (req, res, next) => {
  // console.log(req.params.id);
  try {
    const getUser = await User.findOne({ _id: req.params.id });
    // console.log(getUser);
    res.status(200).json(getUser);
  } catch (err) {
    next(err);
  }
};
const subscribe = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.userId, {
      $push: { subscribedUsers: req.params.id },
    });
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: 1 },
    });

    res.status(200).json("Subcription successfull");
  } catch (error) {
    console.log(error);
    next(error);
  }
};
const unsubscribe = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.userId, {
      $pull: { subscribedUsers: req.params.id },
    });
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: -1 },
    });

    res.status(200).json("UnSubcription successfull");
  } catch (error) {
    next(error);
  }
};
const like = async (req, res, next) => {
  const id = req.userId;
  const videoId = req.params.videoId;
  console.log(videoId);
  try {
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { likes: id },
      $pull: { dislikes: id },
    });
    res.status(200).json("Video has been liked!");
  } catch (err) {
    next(err);
  }
};
const dislike = async (req, res, next) => {
  const id = req.userId;
  const videoId = req.params.videoId;
  console.log(videoId);
  try {
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { dislikes: id },
      $pull: { likes: id },
    });
    res.status(200).json("Video has been disliked!");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  update,
  deleteUser,
  getUser,
  subscribe,
  unsubscribe,
  like,
  dislike,
};
