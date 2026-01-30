// backend/config/googleAuth.js
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

module.exports = (passport) => {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/api/auth/google/callback" // Matches your backend route
    },
    async (accessToken, refreshToken, profile, done) => {
        const newUser = {
            googleId: profile.id,
            fullName: profile.displayName,
            email: profile.emails[0].value,
            avatar: profile.photos[0].value
        };

        try {
            // Check if user already exists in FinQuest
            let user = await User.findOne({ email: profile.emails[0].value });

            if (user) {
                // If user exists but doesn't have a googleId, link it
                if (!user.googleId) {
                    user.googleId = profile.id;
                    await user.save();
                }
                return done(null, user);
            } else {
                // If user doesn't exist, create them
                user = await User.create(newUser);
                return done(null, user);
            }
        } catch (err) {
            console.error(err);
            return done(err, null);
        }
    }));

    // Serialization: determines which data of the user object should be stored in the session
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    // Deserialization: used to retrieve the user from the database using the ID from the session
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (err) {
            done(err, null);
        }
    });
};