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

        const existingUsername = await User.findOne({ username });
        const existingUserEmail = await User.findOne({ email });

        if (existingUsername && existingUserEmail) {
            return next(errorHandler(409, 'Username and email are already in use.'));
        }

        if (existingUsername) {
            return next(errorHandler(409, 'Username is already in use.'));
        }

        if (existingUserEmail) {
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


export const signin = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const validUser = await User.findOne({ email });
        if (!validUser) {
            return next(errorHandler(404, 'User not found.'));
        }

        const isValidPassword = bcrypt.compareSync(password, validUser.password);
        if (!isValidPassword) {
            return next(errorHandler(401, 'Incorrect password.'));
        }

        res.status(200).json({ success: true, message: 'Sign in successful!', user: validUser});
    } 
    
    catch (error) {
        // Handle unexpected errors
        next(errorHandler(500, 'An error occurred during sign-in.'));
    }
};