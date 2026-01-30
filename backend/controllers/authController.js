// backend/controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// @desc    Register a new user
// @route   POST /auth/register
exports.registerUser = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        // 1. Check if user exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // 2. Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 3. Create user
        const user = await User.create({
            fullName,
            email,
            password: hashedPassword,
        });

        if (user) {
            // Optional: Log them in immediately after signup
            req.login(user, (err) => {
                if (err) {
                    return res.status(500).json({ message: 'Error logging in after signup' });
                }
                res.status(201).json({
                    _id: user._id,
                    fullName: user.fullName,
                    email: user.email,
                    message: 'User registered and logged in'
                });
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Login user
// @route   POST /auth/login
exports.loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // 1. Check for email
        // We must manually .select('+password') because we set select: false in the schema
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // 2. Check if user uses Google Auth (no password)
        if (!user.password) {
            return res.status(400).json({ 
                message: 'This account uses Google Sign-In. Please use Google to log in.' 
            });
        }

        // 3. Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // 4. Manual Session Login (Connects with Passport session)
        req.login(user, (err) => {
            if (err) {
                return next(err);
            }
            return res.json({
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                message: 'Logged in successfully'
            });
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};