const Document = require("../../models/Document.model");

module.exports = async (req, res, next) => {
  const docId = req.params.docId;
  const userId = req.query.userId;

  const query = { _id: docId };
  if (userId) {
    query.creator = userId;
  }
  
  Document.findOne(query)
    .select({
      _id: 1,
      title: 1,
      description: 1,
      tags: 1,
      creator: 1,
      path: 1,
      history: 1,
      isPublished: 1,
    })
    .populate("history")
    .populate("creator")
    .then((doc) => {
      if (!doc) {
        return res.status(422).json("Document not found");
      }
      res.status(200).json({ doc });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
