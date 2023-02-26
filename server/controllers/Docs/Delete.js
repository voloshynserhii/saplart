const fs = require("fs");
const path = require("path");

const Document = require("../../models/Document.model");

const clearImage = (filePath) => {
  filePath = path.join(__dirname, "../..", filePath);
  fs.unlink(filePath, (err) => console.log(err));
};

module.exports = async (req, res, next) => {
  const docId = req.params.docId;

  Document.findById(docId)
    .then((doc) => {
      if (!doc) {
        return res.status(404).json('Could not find document');
      }
      // Check logged in user
      clearImage(doc.path);
      return Document.findByIdAndRemove(doc);
    })
    .then(() => {
      res.status(200).json({});
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
