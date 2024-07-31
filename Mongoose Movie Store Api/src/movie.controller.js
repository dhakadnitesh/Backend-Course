const Movie = require('./movie.model');

// Create a new movie
exports.createMovie = async (req, res) => {
    try {
        const newMovie = new Movie(req.body);
        const savedMovie = await newMovie.save();
        res.status(201).json(savedMovie);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all movies with filtering, sorting, and pagination
exports.getMovies = async (req, res) => {
    try {
        const { q, sortBy, page = 1, limit = 10 } = req.query;
        const query = {};

        if (q) {
            query.title = new RegExp(q, 'i'); // case-insensitive search
        }

        const movies = await Movie.find(query)
            .sort(sortBy ? { [sortBy]: 1 } : {})
            .skip((page - 1) * limit)
            .limit(Number(limit));

        res.json(movies);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get a single movie by ID
exports.getMovieById = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) return res.status(404).json({ message: 'Movie not found' });
        res.json(movie);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update a movie by ID
exports.updateMovieById = async (req, res) => {
    try {
        const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedMovie) return res.status(404).json({ message: 'Movie not found' });
        res.json(updatedMovie);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a movie by ID
exports.deleteMovieById = async (req, res) => {
    try {
        const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
        if (!deletedMovie) return res.status(404).json({ message: 'Movie not found' });
        res.json({ message: 'Movie deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
