const User = require("../../models/User.model");
const Document = require("../../models/Document.model");

module.exports = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id).lean();
    delete user.password;

    if (!user) {
      return res.status(404).json("No user found");
    }

    const documents = await Document.find({
      creator: user._id,
      isPublished: true,
    }).lean();
    user.documents = documents

    return res.status(200).json({ user });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
  }
};
