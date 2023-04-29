const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User.model");

module.exports = async (req, res, next) => {
  const {email, password} = req.body;

  try {
    const user = await User.findOne({ email: email }).lean();
    if (!user) {
      return res.status(401).json("A user with this email could not be found");
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      return res.status(401).json("Wrong password!");
    }

    const token = await jwt.sign(
      {
        email: user.email,
        userId: user._id.toString(),
      },
      process.env.SECRET,
      { expiresIn: "24h" }
    );
    // req.session.userId = user._id.toString();
    delete user.password
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json(err.message);
  }
};
