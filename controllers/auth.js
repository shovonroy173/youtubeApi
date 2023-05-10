const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const createError = require("../error");

const signup = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const user = new User({ ...req.body, password: hash });
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

const signin = async (req, res, next) => {
  try {
    const user = await User.findOne({ name: req.body.name });
    if (!user) {
      //    return next(createError(404 , "User not found"));
      res.status(401).send("user not");
    }
    console.log(user.password);
    const isCorrect = bcrypt.compare(req.body.password, user.password);
    if (!isCorrect) {
      return next(createError(404, "Invalid passowrd"));
    } else {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res
        .cookie("access_token", token, {
          expires: new Date(Date.now() + 3600000),
          httpOnly: true,
        })
        .json({...user._doc, ["accessToken"]: token});
    }
  } catch (err) {
    next(err);
  }
};

const googleAuth = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res
        .cookie("access_token", token, {
          expires: new Date(Date.now() + 3600000),
          httpOnly: true,
        })
        .status(200)
        .json(user);
    } else {
      const newUser = new User({
        ...req.body,
        fromGoogle: true,
      });
      const savedUser = await newUser.save();
      const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET);
      res
        .cookie("access_token", token, {
          expires: new Date(Date.now() + 3600000),
          httpOnly: true,
        })
        .status(200)
        .json(savedUser._doc);
    }
  } catch (er) {
    next(er);
  }
};

module.exports = { signup, signin, googleAuth };
