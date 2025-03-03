import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
// import movieRoutes from './routes/movieRoutes.js';
// import bookingRoutes from './routes/bookingRoutes.js';
// import paymentRoutes from './routes/paymentRoutes.js';

const app = express();

// ✅ Configure CORS for frontend (running on Vite port 5173)
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

// Middleware
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
// app.use('/api/movies', movieRoutes);
// app.use('/api/bookings', bookingRoutes);
// app.use('/api/payments', paymentRoutes);


app.get('/', (req, res) => {
    res.send('🎬 Welcome to the Movie Ticket Booking API');
});

export default app;







// import express from 'express';
// import cors from 'cors';
// import bodyParser from 'body-parser';
// import authRoutes from './routes/authRoutes.js';
// import movieRoutes from './routes/movieRoutes.js';
// import bookingRoutes from './routes/bookingRoutes.js';
// import sequelize from './config/db.js';

// const app = express();

// // Enable CORS for frontend (running on port 5173)
// app.use(cors({
//     origin: 'http://localhost:5173', // Allow requests from this origin (your frontend)
//     methods: 'GET,POST,PUT,DELETE', // Allow these HTTP methods
//     allowedHeaders: 'Content-Type,Authorization', // Allow these headers
// }));

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// app.use('/auth', authRoutes);
// app.use('/movies', movieRoutes);
// app.use('/bookings', bookingRoutes);

// app.get('/', (req, res) => {
//     res.send('Welcome to the Movie Ticket Booking API');
// });

// export default app;
