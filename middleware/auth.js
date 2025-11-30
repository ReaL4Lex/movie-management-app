// middleware/auth.js - REQUIREMENT 12, 13
const Movie = require('../models/Movie');

// REQUIREMENT 12: Restrict to logged-in users
const ensureAuthenticated = (req, res, next) => {
  if (req.session.userId) {
    return next();
  }
  req.flash('error', 'Please log in to access this page');
  res.redirect('/login');
};

// For registration/login pages
const ensureGuest = (req, res, next) => {
  if (!req.session.userId) {
    return next();
  }
  res.redirect('/movies');
};

// REQUIREMENT 13: Restrict to movie owners
const checkMovieOwnership = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      req.flash('error', 'Movie not found');
      return res.redirect('/movies');
    }

    // Check if current user owns the movie
    if (movie.owner.toString() !== req.session.userId) {
      req.flash('error', 'You do not have permission to perform this action');
      return res.redirect('/movies');
    }

    req.movie = movie;
    next();
  } catch (error) {
    console.error(error);
    req.flash('error', 'An error occurred');
    res.redirect('/movies');
  }
};

module.exports = {
  ensureAuthenticated,
  ensureGuest,
  checkMovieOwnership
};
