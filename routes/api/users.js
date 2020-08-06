const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const Posts = require('../../models/Posts');
const Comment = require('../../models/comments');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const nodemailer = require('nodemailer');
// GET api/users
// Public
// Register User
router.post(
  '/register',

  async (req, res) => {
    try {
      const { name, email, password, city, description } = req.body;
      const { AdminCode } = req.body;
      // See if the user exists.
      // console.log(req.body);

      // console.log('inside register backend: ', req.body);
      let user = await User.findOne({ email });
      if (user) {
        return res.json({ errors: { msg: ' This Email ID is not available' } });
      }
      var isAdmin = false;
      if (AdminCode == 'cloberine_time') {
        isAdmin = true;
      }
      (image =
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT8TeQ5iojLROQXom0AApSQbIamNDJRFDYgjw&usqp=CAU'),
        (user = new User({
          name,
          email,
          password,
          city,
          description,
          isAdmin,
          image,
        }));
      // Encrypt User
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      const payload = {
        user: {
          id: user.id,
        },
      };
      // console.log(user);
      jwt.sign(
        payload,
        process.env.jwtsecret || config.get('jwtsecret'),
        { expiresIn: 36000 },
        (err, token) => {
          if (err) {
            throw err;
          }
          res.json({ token });
        }
      );
      //      res.send('User registered. ');
    } catch (err) {
      console.log('error in registration :' + err.message);
      res.status(500).send('Server Error');
    }
  }
);

//Deactivate Account
router.post('/changeStatus', async (req, res) => {
  try {
    const { Profile } = req.body;
    let user = await User.findById(Profile);
    // console.log(user);
    user.activated = !user.activated;
    await user.save();
    res.json({ user });
  } catch (error) {
    console.log('error in deativating :' + error.message);
    res.status(500).send('server error');
  }
});

//update Profile
router.put('/updateProfile', async (req, res) => {
  try {
    const { userId, name, description, city, Image } = req.body;
    // console.log(Image);
    let user = await User.findById(userId);
    user.name = name;
    (user.description = description), (user.city = city);
    user.image = Image;
    user.Posts.map(async (eachPost) => {
      let post = await Posts.findById(eachPost);
      post.author.username = name;
      await post.save();
    });
    user.comments.map(async (eachComment) => {
      let comment = await Comment.findById(eachComment);
      comment.author.username = name;
      comment.author.image = Image;
      await comment.save();
      // console.log(comment);
    });

    await user.save();
    // console.log(user);
    res.json({ user });
  } catch (error) {
    console.log('error in updating :' + error.message);
  }
});

//get all users
router.get('/', async (req, res) => {
  try {
    let user = await User.find({}).populate('Posts');

    res.json(user);
  } catch (error) {
    console.log('error in updating :' + error.message);
  }
});

// follow Request
router.put('/follow', async (req, res) => {
  try {
    let { UserID, follow } = req.body;
    let user = await User.findById(UserID);
    let following = await User.findById(follow);
    user.Followings.push(follow);
    following.Followers.push(UserID);
    await user.save();
    await following.save();
    res.json({ user, following });
  } catch (error) {
    console.log('error in Following route :' + error.message);
  }
});

//Unfollow Request
router.put('/unfollow', async (req, res) => {
  try {
    const { UserID, follow } = req.body;
    let user = await User.findById(UserID);
    let following = await User.findById(follow);
    await user.Followings.splice(user.Followings.indexOf(follow), 1);
    await following.Followers.splice(following.Followers.indexOf(UserID), 1);
    await user.save();
    await following.save();
    res.json({ user, following });
  } catch (error) {
    console.log('error in Following route :' + error.message);
  }
});

//===========================================================================================
//Reset Password section
// Its BIG.
const usePasswordHashToMakeToken = ({
  password: passwordHash,
  _id: userId,
}) => {
  const secret = passwordHash;
  const token = jwt.sign({ userId }, secret, {
    expiresIn: 3600, // 1 hour
  });
  return token;
};

const resetPasswordTemplate = (user, url) => {
  const from = process.env.email || config.get('email');
  const to = user.email;
  const subject = '🌻 Social App Password Reset 🌻';
  const html = `
  <p>Hey ${user.displayName || user.email},</p>
  <p>We heard that you lost your password. Sorry about that!</p>
  <p>But don’t worry! You can use the following link to reset your password:</p>
  <a href=${url}>${url}</a>
  <p>If you don’t use this link within 1 hour, it will expire.</p>
  <p>Do something outside today! </p>
  <p>–Your Friend Shorya Upadhayay.</p>
  `;

  return { from, to, subject, html };
};

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.email || config.get('email'),
    pass: process.env.password || config.get('password'),
  },
});

//FOrgot Password
router.post('/resetPassword/:email', async (req, res) => {
  try {
    const { email } = req.params;
    // console.log(email);
    let user = await User.findOne({ email });
    if (!user) {
      return res.json({ errors: { msg: ' This Email ID is not available' } });
    }

    const token = usePasswordHashToMakeToken(user);
    const url =
      'http://localhost:3000/password/reset/' + user._id + '/' + token;

    console.log(url);
    console.log(req);
    const emailTemplate = resetPasswordTemplate(user, url);
    transporter.sendMail(emailTemplate, (err, info) => {
      if (err) {
        console.log('Error sending email');
        return res.json({ errors: { msg: 'Error sending email' } });
      } else {
        console.log(`** Email sent **`, info.response);
        return res.json('** Email sent **');
      }
    });
  } catch (error) {
    console.log('error in reset Password route :' + error.message);
  }
});

router.post('/ChangePassword/:userID/:token', async (req, res) => {
  try {
    const { userID, token } = req.params;
    const { password } = req.body;
    let user = await User.findById(userID);
    const secret = user.password;
    const payload = jwt.decode(token, secret);
    const currentTime = parseInt(Date.now() / 1000);

    if (payload.userId == user._id && currentTime < payload.exp) {
      // res.json('tada');
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      return res.json('password has been Changed!');
    }
    return res.json({ errors: { msg: 'Token has expired' } });
  } catch (error) {
    console.log('error in Change Password route :' + error.message);
  }
});

module.exports = router;
