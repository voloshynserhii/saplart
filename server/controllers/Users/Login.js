const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User.model");

module.exports = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser = {};

  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.status(401).json('A user with this email could not be found')
      }
      loadedUser._id = user._id;
      loadedUser.name = user.name;
      loadedUser.email = user.email;
      loadedUser.favorites = user.favorites;
      return bcrypt.compare(password, user.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        return res.status(401).json('Wrong password!')
      }
      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser._id.toString(),
        },
        process.env.SECRET,
        { expiresIn: "24h" }
      );
      req.session.userId = loadedUser._id.toString();
      res.status(200).json({ token: token, user: loadedUser });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
