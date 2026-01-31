const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    title: { 
        type: String, 
        required: true, 
        trim: true 
    },
    amount: { 
        type: Number, 
        required: true 
    },
    classification: {
        type: String,
        enum: ['Needs', 'Wants', 'Investments', 'Debt'],
        required: true
    },
    category: { 
        type: String, 
        default: 'General' 
    },
    // --- WEALTH FIELDS ---
    subCategory: { 
        type: String, 
        default: '' // e.g. 'Mutual Funds', 'Stocks', 'Personal Loan'
    },
    interestRate: { 
        type: Number, 
        default: 0 // For Debt: Annual Interest Rate %
    },
    expectedReturn: { 
        type: Number, 
        default: 0 // For Investments: Expected Annual Return %
    },
    // -------------------------
    date: { 
        type: Date, 
        default: Date.now 
    }
}, { timestamps: true });

// Index for faster queries
ExpenseSchema.index({ userId: 1, date: -1 });

module.exports = mongoose.model('Expense', ExpenseSchema);
