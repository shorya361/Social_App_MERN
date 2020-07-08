const express = require('express');
const router = express.Router();

// GET api/auth
// Public
router.get('/', (req, res) => {
  res.send('Auth Route....');
});
module.exports = router;
