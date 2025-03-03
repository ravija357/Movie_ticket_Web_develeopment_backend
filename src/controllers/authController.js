import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { Op } from 'sequelize'; // Import Sequelize operators
import User from '../models/User.js';

dotenv.config();

export const signupUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const emailLower = email.toLowerCase(); // Normalize email

        // Check if user already exists
        const existingUser = await User.findOne({ where: { email: emailLower } });
        if (existingUser) {
            return res.status(400).json({ message: '❌ Email already registered' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = await User.create({
            username,
            email: emailLower, // Store lowercase email
            password: hashedPassword,
        });

        // Generate JWT token
        const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        });

        res.status(201).json({
            message: '✅ User registered successfully',
            user: { id: newUser.id, username, email: newUser.email },
            token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '❌ Server error' });
    }
};

// ✅ **User Login**
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const emailLower = email.toLowerCase(); // Normalize email

        // Check if the email exists
        const user = await User.findOne({ where: { email: emailLower } });
        if (!user) {
            return res.status(400).json({ message: '❌ Invalid credentials' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: '❌ Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(200).json({
            message: '✅ Login successful',
            token,
            user: { id: user.id, username: user.username, email: user.email }, // Use user's email
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '❌ Server error' });
    }
};

// ✅ **Forgot Password**
export const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const emailLower = email.toLowerCase(); // Normalize email
        const user = await User.findOne({ where: { email: emailLower } });
        if (!user) {
            return res.status(404).json({ message: '❌ Email not found' });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(20).toString('hex');
        const resetTokenExpiry = Date.now() + 3600000; // 1 hour expiration

        // Update user with reset token and expiry
        user.resetToken = resetToken;
        user.resetTokenExpiry = resetTokenExpiry;
        await user.save();

        // Configure nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Use environment variable for frontend URL
        const resetUrl = `${process.env.FRONTEND_BASE_URL}/reset-password/${resetToken}`;

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Password Reset Request',
            html: `<p>You requested a password reset.</p>
                   <p>Click <a href="${resetUrl}">here</a> to reset your password.</p>
                   <p>The link expires in 1 hour.</p>`,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: '✅ Password reset link sent to email' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '❌ Server error' });
    }
};

// ✅ **Reset Password**
export const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    try {
        // Find user with valid reset token and unexpired token
        const user = await User.findOne({
            where: { 
                resetToken: token, 
                resetTokenExpiry: { [Op.gt]: Date.now() } // Correct Sequelize operator
            },
        });

        if (!user) {
            return res.status(400).json({ message: '❌ Invalid or expired token' });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update user password and clear reset token
        user.password = hashedPassword;
        user.resetToken = null;
        user.resetTokenExpiry = null;
        await user.save();

        res.status(200).json({ message: '✅ Password reset successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '❌ Server error' });
    }
};


// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import User from '../models/User.js';
// import crypto from 'crypto';
// import nodemailer from 'nodemailer';

// // Signup User
// export const signupUser = async (req, res) => {
//     // signup logic
// };

// // Login User
// export const loginUser = async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         // Check if the email exists in the database
//         const user = await User.findOne({ where: { email } });
//         if (!user) {
//             return res.status(400).json({ message: 'Invalid credentials' });
//         }

//         // Compare passwords
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ message: 'Invalid credentials' });
//         }

//         // Generate JWT token
//         const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
//             expiresIn: '1h', // Token expiry time
//         });

//         res.status(200).json({ token, user });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server error' });
//     }
// };

// // Forgot Password
// export const forgotPassword = async (req, res) => {
//     // forgot password logic
// };

// // Reset Password
// export const resetPassword = async (req, res) => {
//     // reset password logic
// };
