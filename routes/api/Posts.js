const express = require('express');
const router = express.Router();
const User = require('../../models/User'),
  Posts = require('../../models/Posts'),
  comments = require('../../models/comments');

// GET ALL POST
router.get('/', async (req, res) => {
  try {
    const Posts = await Posts.find({});
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
    await user.Posts.unshift(newPost.id);
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

//Upvote a Post
router.put('/Like', async (req, res) => {
  try {
    const { Post, UserID } = req.body;
    let post = await Posts.findById(Post);
    let user = await User.findById(UserID);
    post.Likes.push(UserID);
    user.Likes.push(Post);
    let dislike = post.Dislikes.indexOf(UserID);
    if (dislike !== -1) {
      post.Dislikes.splice(dislike, 1);
      user.Dislikes.splice(user.Dislikes.indexOf(Post), 1);
    }
    await user.save();
    await post.save();
    res.json({ user, post });
  } catch (error) {
    console.log('error in upvoting the art :' + error.message);
  }
});

//Disable Upvote a Post
router.put('/UnLike', async (req, res) => {
  try {
    const { Post, UserID } = req.body;
    let post = await Posts.findById(Post);
    let user = await User.findById(UserID);
    post.Likes.splice(post.Likes.indexOf(UserID), 1);
    user.Likes.splice(user.Likes.indexOf(Post), 1);

    await user.save();
    await post.save();
    res.json({ user, post });
  } catch (error) {
    console.log('error in upvoting the art :' + error.message);
  }
});

//Downvote A Post
router.put('/DownVote', async (req, res) => {
  try {
    const { Post, UserID } = req.body;
    let post = await Posts.findById(Post);
    let user = await User.findById(UserID);
    post.Dislikes.push(UserID);
    user.Dislikes.push(Post);
    let like = post.Likes.indexOf(UserID);
    if (like !== -1) {
      post.Likes.splice(like, 1);
      user.Likes.splice(user.Likes.indexOf(Post), 1);
    }
    await user.save();
    await post.save();
    res.json({ user, post });
  } catch (error) {
    console.log('error in downvoting the art :' + error.message);
  }
});

//Disable Upvote a Post
router.put('/UnDisLike', async (req, res) => {
  try {
    const { Post, UserID } = req.body;
    let post = await Posts.findById(Post);
    let user = await User.findById(UserID);
    post.Dislikes.splice(post.Dislikes.indexOf(UserID), 1);
    user.Dislikes.splice(user.Dislikes.indexOf(Post), 1);

    await user.save();
    await post.save();
    res.json({ user, post });
  } catch (error) {
    console.log('error in upvoting the art :' + error.message);
  }
});

// Get Timeline of a user
router.post('/getTimeline', async (req, res) => {
  try {
    const { UserID } = req.body;
    // console.log(UserID);
    let user = await User.findById(UserID).populate('Posts');
    var timeline = [];
    if (user.Posts.length > 0) {
      user.Posts.map((eachPost) => {
        timeline.push(eachPost);
      });
    }
    var post = await Posts.find({});
    post.map((each) => {
      if (user.Followings.indexOf(each.author.id) !== -1) {
        timeline.push(each);
      }
    });
    const sortedtimeline = timeline.sort((a, b) => a.date - b.date);
    res.json(sortedtimeline.reverse());
  } catch (error) {
    console.log('error in getting timeline :' + error.message);
  }
});

module.exports = router;
