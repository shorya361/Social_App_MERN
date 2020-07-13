const express = require('express');
const router = express.Router();
const User = require('../../models/User'),
  Arts = require('../../models/Arts'),
  comments = require('../../models/comments');

// Add comments to art.
router.post('/addComment', async (req, res) => {
  const { Art, UserId, comment } = req.body;
  try {
    let founduser = await User.findById(UserId);
    let newComment = new comments({
      text: comment,
      author: { id: UserId, username: founduser.name },
    });
    founduser.comments.push(newComment.id);
    let ART = await Arts.findById(Art);
    ART.comments.push(newComment.id);
    await ART.save();
    await founduser.save();
    await newComment.save();
    res.json({ founduser, ART, newComment });
  } catch (error) {
    console.log('error in adding a comment :' + error.message);
    res.status(500).send('Server Error');
  }
});

// update a comment
router.put('/updateComment', async (req, res) => {
  try {
    const { comment, commentID } = req.body;
    let updated = await comments.findById(commentID);
    updated.text = comment;
    updated.save();
    res.json({ updated });
  } catch (error) {
    console.log('error in updating the comment :' + error.message);
    res.status(500).send('server error');
  }
});

// delete a comment
router.delete('/deleteComment', async (req, res) => {
  try {
    const { comment } = req.body;
    let tobedeleted = await comments.findById(comment);
    user = await User.findById(tobedeleted.author.id);
    await user.comments.splice(user.comments.indexOf(comment), 1);
    await user.save();
    await comments.findByIdAndDelete(comment);
    res.json(user);
  } catch (error) {
    console.log('error in deleting the comment :' + error.message);
    res.status(500).send('server error');
  }
});

module.exports = router;
