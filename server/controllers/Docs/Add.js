const Document = require("../../models/Document.model");

module.exports = async (req, res, next) => {
  const { title, description, userId } = req.body;
  const tags = req.body.tags?.split(",");
  const { path } = req?.file || '';
  
  if (!path) {
    return res.status(422).json('No image provided');
  }
  if (!userId) {
    return res.status(422).json('No user provided');
  }
  const doc = new Document({
    title,
    description,
    tags,
    path,
    creator: userId,
  });
  doc
    .save()
    .then((result) => {
      res.status(201).json({
        doc: result,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
