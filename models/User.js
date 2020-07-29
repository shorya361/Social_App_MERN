const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, "can't be blank"],
    match: [/\S+@\S+\.\S+/, 'is invalid'],
    index: true,
  },
  image: {
    type: String,
    default:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT8TeQ5iojLROQXom0AApSQbIamNDJRFDYgjw&usqp=CAU',
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
  Followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
  ],
  Followings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
  ],
  Likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Posts',
    },
  ],
  Dislikes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Posts',
    },
  ],
  Posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Posts',
    },
  ],
});
module.exports = User = mongoose.model('user', UserSchema);
