// const Log = require("../../models/Log.model");

// module.exports = async (req, res, next) => {
//   const userId = req.query.userId;
//   if (!userId) {
//     return res.status(422).json('No user provided')
//   }
//   const currentPage = req.query.page || 1;
//   const perPage = 12;
//   let totalItems;
//   Log.find({ creator: userId })
//     .countDocuments()
//     .then((count) => {
//       totalItems = count;
//       return Log.find({ creator: userId })
//         .populate({ path: "creator", select: { name: 1, email: 1 } })
//         .skip((currentPage - 1) * perPage)
//         .limit(perPage);
//     })
//     .then((logs) => {
//       res.status(200).json({
//         logs,
//         totalItems,
//       });
//     })
//     .catch((err) => {
//       if (!err.statusCode) {
//         err.statusCode = 500;
//       }
//       next(err);
//     });
// };

const Document = require("../../models/Document.model");

module.exports = async (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = 12;
  let totalItems;

  const query = { isPublished: true };

  Document.find(query)
    .countDocuments()
    .then((count) => {
      totalItems = count;
      return Document.find(query)
        .sort({ updatedAt: -1 })
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
          rating: 1
        })
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
