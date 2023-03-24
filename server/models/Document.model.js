const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const documentSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    path: {
      type: String,
    },
    tags: [{ type: String, trim: true }],
    // tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    history: [{ type: Schema.Types.ObjectId, ref: "Log" }],
    isPublished: { type: Boolean, default: false },
    publishedAt: Date,
    inFavorites: [{ type: Schema.Types.ObjectId, ref: "User" }],
    rating: { type: Number, default: 0 },
    rateCount: { type: Number, default: 0 },
    totalRating: { type: Number, default: 0 }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Document", documentSchema);
