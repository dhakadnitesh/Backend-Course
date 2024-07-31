const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const movieRoutes = require('./movie.routes');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/movies', movieRoutes);

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/moviestore', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.log('Error connecting to MongoDB:', error);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
