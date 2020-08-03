var mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
var ArtSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  created: { type: Date, default: Date.now },

  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    username: String,
    image: String,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
  Likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
  ],
  Dislikes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
  ],
});
module.exports = mongoose.model('Posts', ArtSchema);
