const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
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
        return res.json({ errors: { msg: ' User already exists !!' } });
      }
      var isAdmin = false;
      if (AdminCode == 'cloberine_time') {
        isAdmin = true;
      }
      user = new User({
        name,
        email,
        password,
        city,
        description,
        isAdmin,
      });
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
        config.get('jwtsecret'),
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
    user.save();
    res.json({ user });
  } catch (error) {
    console.log('error in deativating :' + error.message);
    res.status(500).send('server error');
  }
});

module.exports = router;
