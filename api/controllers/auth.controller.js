import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';

export const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = bcryptjs.hashSync(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });

        await newUser.save();

        res.status(201).json({ message: "User created successfully!" });
    } 
    
    catch (error) {
        console.error("Error during user signup:", error);
        res.status(500).json({ error: error.message || "Internal Server Error" });
    }
};