import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

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
    } 
    
    catch (error) {
        next(errorHandler(500, 'An error occurred during user signup.'));
    }
};


export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return next(errorHandler(400, 'Missing required fields. Email and password are required.'));
        }

        const validUser = await User.findOne({ email });
        if (!validUser) {
            return next(errorHandler(404, 'User not found. Please check your email and password.'));
        }

        const isValidPassword = bcryptjs.compareSync(password, validUser.password);
        if (!isValidPassword) {
            return next(errorHandler(401, 'Incorrect email or password. Please try again.'));
        }

        const token = jwt.sign({ id: validUser._id}, process.env.JWT_SECRET);
        const { password: pass, ...rest } = validUser._doc;

        //!res.cookie('access_token', token, { httpOnly: true }).status(200).json({ success: true, message: 'Sign in successful!', user: rest });
        res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest);
    } 
    
    catch (error) {
        // Handle unexpected errors
        next(errorHandler(500, 'An unexpected error occurred during sign-in.'));
        //next(error);
    }
};


export const google = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            const { password: pass, ...rest } = user._doc;
            res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest);
        }

        else {
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
            const newUser = new User({
                username: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4),
                email: req.body.email,
                password: hashedPassword,
                avatar: req.body.photo,
            });
            await newUser.save();
            const token = jwt.sign({ id: newUser._id}, process.env.JWT_SECRET);
            const { password: pass, ...rest } = newUser._doc;
            res.cookie("access_token", token, { httpOnly: true }).status(200).json(rest);
        }
    }

    catch (error) {
        next(error);
    }
}


export const signOut = async (request, response, next) => {
    try {
      response.clearCookie('access_token');
      response.status(200).json('User session has been terminated.');
    } 
    
    catch (error) {
      next(error);
    }
};



// export const forgotPassword = async (req, res) => {
//     try {
//         const { email } = req.body;

//         // Find user by email
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         // Generate reset token
//         const resetToken = jwt.sign({ id: user._id }, process.env.RESET_TOKEN_SECRET, { expiresIn: '1h' });

//         // Update user document with reset token and expiration time
//         user.resetToken = resetToken;
//         user.resetTokenExpiration = Date.now() + 3600000; // 1 hour
//         await user.save();

//         // Send reset email
//         sendResetEmail(email, resetToken); // Implement this function

//         res.status(200).json({ message: "Password reset instructions sent to your email" });
//     } 
    
//     catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// };