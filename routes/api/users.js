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
  [
    check('name', 'Name is Required').not().isEmpty(),
    check('email', 'Plz include a valid email').isEmail(),
    check(
      'password',
      ' Plz enter a password with 5 or more characters'
    ).isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { name, email, password } = req.body;

    try {
      // See if the user exists.

      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: { msg: ' User already exists !!' } });
      }
      user = new User({
        name,
        email,
        password,
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
      jwt.sign(
        payload,
        config.get('jwtsecret'),
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
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
module.exports = router;
