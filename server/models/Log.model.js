const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const logSchema = new Schema(
  {
    document: { type: Schema.Types.ObjectId, ref: "Document" },
    title: { type: String },
    description: { type: String },
    path: {
      type: String,
      required: true,
    },
    tags: [{ type: String }],
    action: {
      type: String,
      required: true,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Log", logSchema);
