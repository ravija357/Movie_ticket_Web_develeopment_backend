import Booking from '../models/Booking.js';
import User from '../models/User.js';
import Movie from '../models/Movie.js';

// Create a new booking
export const createBooking = async (req, res) => {
    const { userId, movieId, seats } = req.body;

    if (!userId || !movieId || !seats) {
        return res.status(400).json({ error: 'User ID, Movie ID, and seats are required' });
    }

    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const movie = await Movie.findByPk(movieId);
        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
        }

        const newBooking = await Booking.create({
            user_id: userId,
            movie_id: movieId,
            seats,
            totalPrice: movie.price * seats,
        });

        res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create booking' });
    }
};
