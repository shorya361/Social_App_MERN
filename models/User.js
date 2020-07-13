const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  city: {
    type: String,
  },
  description: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  activated: {
    type: Boolean,
    default: true,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
  Posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Arts',
    },
  ],
});
module.exports = User = mongoose.model('user', UserSchema);
