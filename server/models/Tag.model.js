const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tagSchema = new Schema(
  {
    name: { type: String, trim: true },
    totalUsed: { type: Number, default: 0 },
  }
);

module.exports = mongoose.model("Tag", tagSchema);