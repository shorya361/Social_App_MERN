var mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);
var UserSchema = new mongoose.Schema({
  Artistname: String,
  Born: String,
  Bio: String,
  Arts_created: [
    {
      name: String,
      image: String,
      description: String,
    },
  ],
});
module.exports = mongoose.model('Famous_Artists', UserSchema);
