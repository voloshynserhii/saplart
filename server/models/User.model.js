const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  name: {
    type: String,
    trim: true,
  },
  about: {
    type: String,
    trim: true,
  },
  contacts: {
    phone: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    socialLinks: [{
      type: String,
      trim: true,
    }]
  },
  avatarPath: {
    type: String,
  },
  isCreator: {
    type: Boolean,
    default: false,
  },
  favorites: [{ type: Schema.Types.ObjectId, ref: "Document" }],
});

module.exports = mongoose.model("User", userSchema);
