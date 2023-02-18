const Tag = require("../../models/Tag.model");

module.exports = async (req, res, next) => {
  Tag.find({ name: { $exists: true } })
    .then((tags) => {
      res.status(200).json(tags);
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
