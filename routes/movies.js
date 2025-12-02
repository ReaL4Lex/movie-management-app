// routes/movies.js - With authentication (REQUIREMENT 3, 4, 5, 6, 7, 8, 12, 13)
const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');
const { ensureAuthenticated, checkMovieOwnership } = require('../middleware/auth');

// REQUIREMENT 6: Display all movies (public)
router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find().populate('owner', 'username').sort({ createdAt: -1 });
    res.render('movies/list', {
      title: 'All Movies',
      movies: movies
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', {
      title: 'Server Error',
      message: 'Error loading movies'
    });
  }
});

// REQUIREMENT 12: Restrict add to logged-in users
router.get('/add', ensureAuthenticated, (req, res) => {
  res.render('movies/add', {
    title: 'Add Movie'
  });
});

// REQUIREMENT 5: Add movie with validation
router.post('/add', ensureAuthenticated, async (req, res) => {
  try {
    const { name, description, year, genres, rating, image } = req.body;

    // Basic validation
    if (!name || !name.trim()) {
      req.flash('error', 'Movie name is required');
      return res.redirect('/movies/add');
    }

    if (!description || description.length < 10) {
      req.flash('error', 'Description must be at least 10 characters');
      return res.redirect('/movies/add');
    }

    // Create movie with owner
    const movie = new Movie({
      name: name.trim(),
      description: description.trim(),
      year: parseInt(year),
      genres: Array.isArray(genres) ? genres : [genres],
      rating: parseFloat(rating),
      image: image || '/images/default-movie.jpg',
      owner: req.session.userId // Set owner to current user
    });

    await movie.save();

    req.flash('success', 'Movie added successfully!');
    res.redirect('/movies');
  } catch (error) {
    console.error(error);

    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      req.flash('error', errors.join(', '));
    } else {
      req.flash('error', 'Error adding movie');
    }

    res.redirect('/movies/add');
  }
});

// User's movies
router.get('/my/movies', ensureAuthenticated, async (req, res) => {
  try {
    const movies = await Movie.find({ owner: req.session.userId }).sort({ createdAt: -1 });
    res.render('movies/list', {
      title: 'My Movies',
      movies: movies,
      myMovies: true
    });
  } catch (error) {
    console.error(error);
    req.flash('error', 'Error loading your movies');
    res.redirect('/movies');
  }
});

//  Movie details with ID param
router.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id).populate('owner', 'username');

    if (!movie) {
      req.flash('error', 'Movie not found');
      return res.redirect('/movies');
    }

    // Check if current user is the owner
    const isOwner = req.session.userId && movie.owner._id.toString() === req.session.userId;

    res.render('movies/view', {
      title: movie.name,
      movie: movie,
      isOwner: isOwner
    });
  } catch (error) {
    console.error(error);
    req.flash('error', 'Error loading movie details');
    res.redirect('/movies');
  }
});

// REQUIREMENT 7, 13: Edit movie (owner only)
router.get('/:id/edit', ensureAuthenticated, checkMovieOwnership, (req, res) => {
  res.render('movies/edit', {
    title: 'Edit Movie',
    movie: req.movie
  });
});

router.put('/:id', ensureAuthenticated, checkMovieOwnership, async (req, res) => {
  try {
    const { name, description, year, genres, rating, image } = req.body;

    // Update movie
    req.movie.name = name.trim();
    req.movie.description = description.trim();
    req.movie.year = parseInt(year);
    req.movie.genres = Array.isArray(genres) ? genres : [genres];
    req.movie.rating = parseFloat(rating);
    req.movie.image = image || '/images/default-movie.jpg';

    await req.movie.save();

    req.flash('success', 'Movie updated successfully!');
    res.redirect(`/movies/${req.params.id}`);
  } catch (error) {
    console.error(error);
    req.flash('error', 'Error updating movie');
    res.redirect(`/movies/${req.params.id}/edit`);
  }
});

// REQUIREMENT 8, 13: Delete movie (owner only)
router.post('/:id/delete', ensureAuthenticated, checkMovieOwnership, async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    req.flash('success', 'Movie deleted successfully!');
    res.redirect('/movies');
  } catch (error) {
    console.error(error);
    req.flash('error', 'Error deleting movie');
    res.redirect('/movies');
  }
});

module.exports = router;
