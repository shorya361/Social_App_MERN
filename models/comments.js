var mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
var CommentSchema = mongoose.Schema({
  text: String,
  created: { type: Date, default: Date.now },
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    username: String,
  },
});

module.exports = mongoose.model('Comment', CommentSchema);
