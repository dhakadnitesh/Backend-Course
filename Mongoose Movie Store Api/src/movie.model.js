const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: String,
    rating: Number,
    genre: String,
    releaseYear: Number
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
