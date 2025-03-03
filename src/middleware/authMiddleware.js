import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

// ✅ Middleware to Protect Routes
export const protect = async (req, res, next) => {
    let token;

    // Check if Authorization header exists
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]; // Extract token
    }

    if (!token) {
        return res.status(401).json({ message: '❌ Not authorized, no token' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Attach user to request
        req.user = await User.findByPk(decoded.userId, { attributes: { exclude: ['password'] } });

        if (!req.user) {
            return res.status(401).json({ message: '❌ User not found' });
        }

        next(); // Proceed to next middleware or controller
    } catch (error) {
        return res.status(401).json({ message: '❌ Token is invalid or expired' });
    }
};




// import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv';

// dotenv.config();

// export const authenticate = (req, res, next) => {
//     const token = req.header('Authorization');

//     if (!token) {
//         return res.status(401).json({ error: 'Access denied. No token provided.' });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded;
//         next();
//     } catch (error) {
//         res.status(400).json({ error: 'Invalid token' });
//     }
// };
