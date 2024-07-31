const express = require('express');
const router = express.Router();
const movieController = require('./movie.controller');

router.post('/', movieController.createMovie);
router.get('/', movieController.getMovies);
router.get('/:id', movieController.getMovieById);
router.put('/:id', movieController.updateMovieById);
router.delete('/:id', movieController.deleteMovieById);

module.exports = router;
