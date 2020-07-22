const express = require('express');
const router = express.Router();
const User = require('../../models/User'),
  Posts = require('../../models/Posts'),
  comments = require('../../models/comments');

// GET ALL POST
router.get('/', async (req, res) => {
  try {
    const Posts = await Posts.find({});
    console.log('inside get Arts Route');
    console.log(Posts);
    res.json({ Posts });
  } catch (error) {
    console.log('error in getting posts :' + error.message);
    res.status(500).send('server error');
  }
});

//ADD NEW POST
router.post('/addPost', async (req, res) => {
  try {
    const { name, image, description, userID } = req.body;
    let user = await User.findById({ _id: userID });

    let newPost = await new Posts({
      name: name,
      image: image,
      description: description,
      author: {
        id: userID,
        username: user.name,
      },
    });
    await newPost.save();
    await user.Posts.push(newPost.id);
    await user.save();
    res.json({ newPost, user });
  } catch (error) {
    console.log('error in adding new post :' + error.message);
    res.status(500).send('server error');
  }
});

//UPDATE ART/POST
router.put('/updatePost', async (req, res) => {
  try {
    const { name, image, description, PostID } = req.body;
    let thisPost = await Posts.findById({ _id: PostID });
    thisPost.name = name;
    thisPost.image = image;
    thisPost.description = description;
    thisPost.save();
    res.json(thisPost);
  } catch (error) {
    console.log('error in updating post :' + error.message);
    res.status(500).send('server error');
  }
});

//DELETE THE POST
router.put('/deletePost', async (req, res) => {
  try {
    const { Post } = req.body;
    console.log(req);
    let Arttobedeleted = await Posts.findById(Post);
    for (const id in Arttobedeleted.comments) {
      const comment = Arttobedeleted.comments[id];
      // console.log(comment);
      let tobedeleted = await comments.findById(comment);
      // console.log(tobedeleted);
      user = await User.findById(tobedeleted.author.id);
      await user.comments.splice(user.comments.indexOf(comment), 1);
      await user.save();
      await comments.findByIdAndDelete(comment);
    }
    let author = await User.findById(Arttobedeleted.author.id);
    await author.Posts.splice(author.Posts.indexOf(Post), 1);
    await author.save();
    await Posts.findByIdAndDelete(Post);
    res.json({ author });
  } catch (error) {
    console.log('error in deleting the art :' + error.message);
    res.status(500).send('server error');
  }
});

module.exports = router;
