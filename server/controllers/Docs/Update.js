const fs = require("fs");
const path = require("path");
// const { validationResult } = require("express-validator/check");

const Document = require("../../models/Document.model");
const Log = require("../../models/Log.model");

const clearImage = (filePath) => {
  filePath = path.join(__dirname, "../..", filePath);
  fs.unlink(filePath, (err) => console.log(err));
};

module.exports = async (req, res, next) => {
  const docId = req.params.docId;

  const { title, description, userId, isPublished } = req.body;
  const tags = req.body.tags?.split(",") || [];

  let { path } = req.body;

  if (!userId) {
    return res.status(422).json('No user provided');
  }
  
  const doc = await Document.findById(docId).exec();

  if(isPublished !== undefined) {
    doc.isPublished = isPublished;
    doc.publishedAt = Date.now();
    doc.save();

    return res.status(200).json('success');
  }

  if(!!doc.isPublished) return;

  if (req.file) {
    path = req.file.path;
  }
  
  if (!path) {
    return res.status(422).json('No file picked');
  }
  
  const log = new Log({
    document: docId,
    title,
    description,
    tags,
    path,
    creator: userId,
    action: "documentUpdate",
  });
  
  const newLog = await log.save()
  
  Document.findById(docId)
    .select({ title: 1, description: 1, tags: 1, path: 1, creator: 1 })
    .then((doc) => {
      if (!doc) {
        return res.status(404).json('Could not find document');
      }
      if (String(userId) !== String(doc.creator)) {
        return res.status(422).json('Only owner can change document');
      }
      if (path !== doc.path) {
        clearImage(doc.path);
      }
      doc.title = title;
      doc.path = path;
      doc.description = description;
      doc.tags = tags;

      const history = doc?.history || []
      history.push(newLog._id);
      doc.history = history;
      
      console.log(history)
      return doc.save();
    })
    .then((result) => {
      res.status(200).json({ doc: result });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
