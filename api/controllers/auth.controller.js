import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';

/**
 * Handles user signup, hashes the password, and saves the user to the database.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express middleware function.
 * @returns {Promise<void>}
 */

export const signup = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        // Validate input data
        if (!username || !email || !password) {
            return next(errorHandler(400, 'Missing required fields.'));
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return next(errorHandler(409, 'Email is already in use.'));
        }

        const hashedPassword = bcryptjs.hashSync(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });

        await newUser.save();

        res.status(201).json({ success: true, message: 'User created successfully!' });
    } catch (error) {
        next(errorHandler(500, 'An error occurred during user signup.'));
    }
};