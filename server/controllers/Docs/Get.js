const Document = require("../../models/Document.model");

module.exports = async (req, res, next) => {
  const { userId, isPublished } = req.query;

  if (!userId && !!isPublished) {
    res.status(404);
  }
  const currentPage = req.query.page || 1;
  const perPage = 12;
  let totalItems;
  const query = userId ? { creator: userId } : { isPublished: true };
  Document.find(query)
    .countDocuments()
    .then((count) => {
      totalItems = count;
      return Document.find(query)
        .select({
          _id: 1,
          title: 1,
          description: 1,
          tags: 1,
          path: 1,
          history: 1,
          isPublished: 1,
          publishedAt: 1,
          updatedAt: 1,
          inFavorites: 1,
          creator: 1
        })
        .sort({ updatedAt: -1 })
        .populate("history")
        .populate("creator")
        .skip((currentPage - 1) * perPage)
        .limit(perPage);
    })
    .then((docs) => {
      res.status(200).json({
        docs,
        totalItems,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
