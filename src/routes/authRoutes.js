import express from 'express';
import { signupUser, loginUser, forgotPassword, resetPassword } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js'; // Import middleware

const router = express.Router();

router.post('/signup', signupUser);
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

// 🔒 Protected Routes (Example Usage)
router.get('/profile', protect, (req, res) => {
    res.status(200).json({ message: '✅ Welcome!', user: req.user });
});

export default router;



// import express from 'express';
// import { signupUser, loginUser, forgotPassword, resetPassword } from '../controllers/authController.js';

// const router = express.Router();

// router.post('/signup', signupUser);
// router.post('/login', loginUser);
// router.post('/forgot-password', forgotPassword); // Forgot password route
// router.post('/reset-password', resetPassword); // Reset password route

// export default router;
