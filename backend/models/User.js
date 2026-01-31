// backend/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Please add a name'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    password: {
        type: String,
        // Not required because Google Auth users won't have a password
        select: false // Doesn't return password by default in queries
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true // Allows multiple nulls for users who use email/password
    },
    avatar: {
        type: String,
        default: 'https://via.placeholder.com/150'
    },
    financialProfile: {
        monthlyIncome: Number,
        incomeSource: String,
        monthlyExpenses: Number,
        totalDebt: Number,
        debtBreakdown: {
            homeLoan: Number,
            carLoan: Number,
            personalLoan: Number,
            creditCard: Number
        },
        investments: {
            equity: Number,
            debt: Number,
            gold: Number,
            realEstate: Number,
            ppf: Number,
            otherAssets: Number
        },
        age: Number,
        dependents: Number,
        lastAnalyzed: Date
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);