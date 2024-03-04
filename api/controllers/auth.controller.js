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
        const hashedPassword = bcryptjs.hashSync(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });

        await newUser.save();

        res.status(201).json({ message: "User created successfully!" });
    } 
    
    catch (error) {
        next(errorHandler(550, 'An error occurred during user signup.'));
    }
};