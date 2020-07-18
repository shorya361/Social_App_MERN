const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
// GET api/auth
// Public
// Signing UP
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select('-password')
      .populate('Posts');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// GET api/auth
// Public
// log in
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    // See if the user exists.

    let user = await User.findOne({ email });
    // console.log(user);
    if (!user) {
      // console.log('no user');
      return res.json({ errors: [{ msg: ' Email ID is invalid' }] });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ errors: [{ msg: ' Wrong Password' }] });
    }

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
    console.log('error in logging in  :' + err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
