const express = require('express');
const router = express.Router();

// GET Home page
router.get('/', (req, res) => {
  res.render('index', {
    title: 'Movie Management App',
    user: req.session.userId
  });
});

module.exports = router;
