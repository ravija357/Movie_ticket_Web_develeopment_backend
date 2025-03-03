// import Movie from '../models/Movie.js';

// // Get all movies
// export const getMovies = async (req, res) => {
//     try {
//         const movies = await Movie.findAll();
//         res.status(200).json(movies);
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to retrieve movies' });
//     }
// };

// // Create a new movie
// export const createMovie = async (req, res) => {
//     const { title, description, price, showtimes } = req.body;

//     if (!title || !description || !price || !showtimes) {
//         return res.status(400).json({ error: 'Title, description, price, and showtimes are required' });
//     }

//     try {
//         const newMovie = await Movie.create({
//             title,
//             description,
//             price,
//             showtimes,
//         });

//         res.status(201).json({ message: 'Movie created successfully', movie: newMovie });
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to create movie' });
//     }
// };


import Movie from '../models/Movie.js';

// Get all movies
export const getMovies = async (req, res) => {
    try {
        const movies = await Movie.findAll();
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve movies' });
    }
};

