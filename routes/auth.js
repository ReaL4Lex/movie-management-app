// routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { ensureGuest } = require('../middleware/auth');

// REQUIREMENT 9: Registration route and form
router.get('/register', ensureGuest, (req, res) => {
  res.render('register', {
    title: 'Register'
  });
});

router.post('/register', ensureGuest, async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    // Basic validation
    if (!username || !email || !password || !confirmPassword) {
      req.flash('error', 'All fields are required');
      return res.redirect('/register');
    }

    if (password !== confirmPassword) {
      req.flash('error', 'Passwords do not match');
      return res.redirect('/register');
    }

    if (password.length < 6) {
      req.flash('error', 'Password must be at least 6 characters');
      return res.redirect('/register');
    }

    // Check if user exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      req.flash('error', 'User with this email or username already exists');
      return res.redirect('/register');
    }

    // Create user
    const user = new User({
      username,
      email,
      password
    });

    await user.save();

    req.flash('success', 'Registration successful! Please log in.');
    res.redirect('/login');
  } catch (error) {
    console.error(error);

    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      req.flash('error', errors.join(', '));
    } else {
      req.flash('error', 'An error occurred during registration');
    }

    res.redirect('/register');
  }
});

// REQUIREMENT 10: Login route and form
router.get('/login', ensureGuest, (req, res) => {
  res.render('login', {
    title: 'Login'
  });
});

router.post('/login', ensureGuest, async (req, res) => {
  console.log('Login POST hit with:', { email: req.body.email, hasPassword: !!req.body.password });
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      console.log('Login failed: missing email or password');
      req.flash('error', 'Email and password are required');
      return res.redirect('/login');
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      console.log('Login failed: user not found for email:', email);
      req.flash('error', 'Invalid email or password');
      return res.redirect('/login');
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      console.log('Login failed: password mismatch for user:', user.username);
      req.flash('error', 'Invalid email or password');
      return res.redirect('/login');
    }

    // Create session
    req.session.userId = user._id;
    req.session.username = user.username;
    console.log('Login successful for user:', user.username, 'session ID:', req.session.id);

    req.flash('success', `Welcome back, ${user.username}!`);
    res.redirect('/movies');
  } catch (error) {
    console.error('Login error:', error);
    req.flash('error', 'An error occurred during login');
    res.redirect('/login');
  }
});

// REQUIREMENT 11: Logout route
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
    }
    res.redirect('/');
  });
});

module.exports = router;
