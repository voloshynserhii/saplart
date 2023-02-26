const fs = require("fs");
const path = require("path");

const Document = require("../../models/Document.model");
const User = require("../../models/User.model");

module.exports = async (req, res, next) => {
  try {
    const docId = req.params.docId;

    const { userId } = req.body;

    if (!userId) {
      return res.status(422).json("No user provided");
    }

    const user = await User.findById(userId).exec();
    if (!user) {
      return res.status(404).json("Could not find user");
    }
    const doc = await Document.findById(docId);
    if (!doc) {
      return res.status(404).json("Could not find document");
    }
    const favorites = user.favorites || [];
    if (!favorites.includes(docId)) {
      favorites.push(docId);
      user.favorites = favorites;
    } else {
        const filtered = favorites.filter(id => String(id) !== docId)
        user.favorites = filtered;
    }
    user.save();

    const inFavorites = doc.inFavorites || [];
    if (!inFavorites.includes(userId)) {
      inFavorites.push(userId);
      doc.inFavorites = inFavorites;
    } else {
        const filtered = inFavorites.filter(id => String(id) !== userId);

        doc.inFavorites = filtered;
    }
    doc.save();

    res.status(200).json({ user });
  } catch (err) {
    res.status(400).json("Could not add to favorites!");
  }
};
