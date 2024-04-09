const User = require("./models/User");
const jwt = require("jsonwebtoken");
const createError = require("./error");

const verifyToken = async (req, res, next) => {
  console.log("LINE AT 6" , req.body.userId);

  if (req.body.userId) {
    console.log("LINE AT 9", req.body?.userId);

    const user = await User.findById(req.body?.userId);
    if (!user.token) {
      return next(401, "You are not authenticated!!");
    } else {
      jwt.verify(user.token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
          console.log(err);
          return next(403, "Forbidden");
        } else {
          // console.log("LINE AT 20 verifyTOken" , user);
          req.userId = user.id;
          next();
        }
      });
    }
  }
};

module.exports = verifyToken;
