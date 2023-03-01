const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../models/User.model");

module.exports = async (req, res, next) => {
  const email = req.body.email;
  const name = req.body.name || '';
  const password = req.body.password;
  
  const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  const validEmail = emailRegexp.test(email)
  if (!validEmail) {
    return res.status(422).json("Provide valid email!");
  }
  
  if (!password || password.length < 4) {
    return res.status(422).json("Password must be at least 4 characters!");
  }
  
  bcrypt
    .hash(password, 12)
    .then((hashedPw) => {
      const user = new User({
        email: email,
        password: hashedPw,
        name: name,
      });
      return user.save();
    })
    .then((result) => {
      const token = jwt.sign(
        {
          email: result.email,
          userId: result._id.toString(),
        },
        process.env.SECRET,
        { expiresIn: "24h" }
      );
      const user = { _id: result._id, name: result.name, email: result.email };
      res.status(201).json({ token: token, user });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
