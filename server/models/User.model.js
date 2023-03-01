const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
  },
  isCreator: {
    type: Boolean,
    default: false
  },
  favorites: [
    { type: Schema.Types.ObjectId, ref: "Document" }
  ],
});

module.exports = mongoose.model('User', userSchema);
