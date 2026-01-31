// backend/server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const connectDB = require('./config/db');

// 1. Load Config
dotenv.config({ path: './.env' });

// Validate critical environment variables
if (!process.env.PERPLEXITY_API_KEY) {
    console.error('\x1b[31m%s\x1b[0m', '❌ ERROR: PERPLEXITY_API_KEY not found in environment variables!');
    console.error('\x1b[33m%s\x1b[0m', '⚠️  Please add PERPLEXITY_API_KEY to your .env file');
    console.error('\x1b[36m%s\x1b[0m', '📝 Get your API key from: https://www.perplexity.ai/settings/api');
    process.exit(1);
}

// 2. Connect to Database
connectDB();

const app = express();

// 3. Body Parser Middleware (to handle JSON data from React)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 4. CORS Middleware (Allow React to talk to Node)
app.use(cors({
    origin: 'http://localhost:3000', // Your frontend URL
    credentials: true // Important for cookies/sessions
}));

// 5. Passport Config
require('./config/googleAuth')(passport);

// 6. Session Middleware
app.use(session({
    secret: process.env.SESSION_SECRET || 'finquest_secret_key', // Put this in .env!
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
}));

// 7. Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// 8. Routes
app.use('/auth', require('./routes/authRoutes'));
app.use('/api/advisor', require('./routes/advisorRoutes'));
app.use('/api/expenses', require('./routes/expenseRoutes'));
app.use('/api/goals', require('./routes/goalRoutes'));
// app.use('/api/users', require('./routes/userRoutes')); // We'll add this later for register/login

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});