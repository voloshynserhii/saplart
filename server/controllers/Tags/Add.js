const Tag = require("../../models/Tag.model");

module.exports = async (req, res, next) => {
  const { newTag } = req.body;

  if (!newTag) {
    return res.status(422).json('No tag provided')
  }

  const existingTags = await Tag.find({ name: newTag });
  if (existingTags.length) return;

  const tag = new Tag({
    name: newTag,
  });
  
  tag
    .save()
    .then((result) => {
      res.status(201).json({
        tag: result,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
