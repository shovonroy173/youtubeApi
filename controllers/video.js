const createError = require("../error");
const Video = require("../models/Video");
const User = require("../models/User");

const addVideo = async (req, res, next) => {
  console.log("LINE AT API" , req.userId);
  try {
    const { title, desc, imgUrl } = req.body.inputs;
    const videoBody = { title, desc, imgUrl };
    console.log(req.body);
    // res.send("ok")
    const newVideo = new Video({ userId: req.body.userId, ...videoBody });

    const savedVideo = await newVideo.save();
    res.status(200).json(savedVideo);
  } catch (error) {
    console.log(error);
    res.status(409).json(error);
  }
};

const updateVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return next(createError(404, "Video not found!"));
    }
    if (req.user.id === video.userId) {
      const updatedUser = await Video.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } else {
      return next(createError(403, "You are not allowed to edit this video!"));
    }
  } catch (error) {
    next(error);
  }
};

const deleteVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return next(createError(404, "Video not found!"));
    }
    if (req.user.id === video.userId) {
      const updatedUser = await Video.findByIdAndDelete(req.params.id);
      res.status(200).json("video deleted");
    } else {
      return next(createError(403, "You are not allowed to edit this video!"));
    }
  } catch (error) {
    next(error);
  }
};

const getVideo = async (req, res, next) => {
  
  try {
    const video = await Video.findById(req.params.id);
    res.status(200).json(video);
  } catch (error) {}
};

const addView = async (req, res, next) => {
  try {
    const video = await Video.findByIdAndUpdate(
      req.params.id,
      {
        $inc: { views: 1 },
      },
      {
        new: true,
      }
    );
    res.status(200).json(video.views);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const random = async (req, res, next) => {
  try {
    const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
    res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
};

const trend = async (req, res, next) => {
  try {
    const videos = await Video.find().sort({ views: -1 });
    res.status(200).json(videos);
  } catch (error) {
    console.log(error);
    // next(error);
    res.status(409).json(error);
  }
};

const latest = async (req, res, next) => {
  try {
    const videos = await Video.find().sort({ updatedAt: -1 });
    res.status(200).json(videos);
  } catch (error) {
    console.log(error);
    // next(error);
    res.status(409).json(error);
  }
};
const likes = async (req, res, next) => {
  console.log(req);
  
  try {
    const videos = await Video.find({ likes: req.params.like });
    console.log(videos);
    
    res.status(200).json(videos);
  } catch (error) {
    console.log(error);
    // next(error);
    res.status(409).json(error);
  }
};
const dislikes = async (req, res, next) => {
  try {
    const videos = await Video.find({ dislikes: req.user.id });
    res.status(200).json(videos);
  } catch (error) {
    console.log(error);
    // next(error);
    res.status(409).json(error);
  }
};
const subscribed = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const subscribedChannels = user.subscribedUsers;
    const list = Promise.all(
      subscribedChannels.map((channelId) => {
        return Video.find({ userId: channelId });
      })
    );
    res
      .status(200)
      .json((await list).flat().sort((a, b) => b.createdAt - a.createdAt));
  } catch (error) {}
};

const getByTag = async (req, res, next) => {
  const tags = req.query.tags.split(",");
  console.log(tags.toString());
  try {
    const videos = await Video.find({ tags: { $in: tags } }).limit(20);
    // console.log(videos);
    res.status(200).json(videos);
  } catch (error) {
    console.log(error);
    // next(error);
    res.status(409).json(error);
  }
};

const music = async (req, res, next) => {
  const tags = req.url;
  const newTag = tags.slice(1, 6);
  console.log(newTag);

  try {
    const videos = await Video.find({ tags: { $in: newTag } }).limit(20);
    // console.log(videos);
    res.status(200).json(videos);
  } catch (error) {
    console.log(error);
    // next(error);
    res.status(409).json(error);
  }
};
const gaming = async (req, res, next) => {
  const tags = req.url;
  const newTag = tags.slice(1, 7);
  console.log(newTag);

  try {
    const videos = await Video.find({ tags: { $in: newTag } }).limit(20);
    // console.log(videos);
    res.status(200).json(videos);
  } catch (error) {
    console.log(error);
    // next(error);
    res.status(409).json(error);
  }
};
const sports = async (req, res, next) => {
  const tags = req.url;
  const newTag = tags.slice(1, 7);
  console.log(newTag);

  try {
    const videos = await Video.find({ tags: { $in: newTag } }).limit(20);
    // console.log(videos);
    res.status(200).json(videos);
  } catch (error) {
    console.log(error);
    // next(error);
    res.status(409).json(error);
  }
};
const news = async (req, res, next) => {
  const tags = req.url;
  const newTag = tags.slice(1, 5);
  console.log(newTag);

  try {
    const videos = await Video.find({ tags: { $in: newTag } }).limit(20);
    // console.log(videos);
    res.status(200).json(videos);
  } catch (error) {
    console.log(error);
    // next(error);
    res.status(409).json(error);
  }
};
const movies = async (req, res, next) => {
  const tags = req.url;
  const newTag = tags.slice(1, 7);
  console.log(newTag);

  try {
    const videos = await Video.find({ tags: { $in: newTag } }).limit(20);
    // console.log(videos);
    res.status(200).json(videos);
  } catch (error) {
    console.log(error);
    // next(error);
    res.status(409).json(error);
  }
};
const search = async (req, res, next) => {
  const query = req.query.q;
  try {
    const videos = await Video.find({
      title: { $regex: query, $options: "i" },
    }).sort({ views: 1 });
    res.status(200).json(videos);
  } catch (error) {
    console.log(error);
    // next(error);
    res.status(409).json(error);
  }
};

module.exports = {
  sports,
  news,
  movies,
  gaming,
  music,
  dislikes,
  likes,
  latest,
  addVideo,
  updateVideo,
  deleteVideo,
  getVideo,
  addView,
  random,
  trend,
  subscribed,
  getByTag,
  search,
};
