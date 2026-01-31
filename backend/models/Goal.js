const mongoose = require('mongoose');

const GoalSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true,
        unique: true // One goal document per user
    },
    monthlyIncome: { type: Number, default: 0 },
    monthlyExpenses: { type: Number, default: 0 },
    monthlyInvestment: { type: Number, default: 0 },
    expectedReturnRate: { type: Number, default: 12 },
    shortTermGoalTitle: { type: String, default: "" },
    shortTermTarget: { type: Number, default: 0 },
    shortTermDeadline: { type: String, default: "" },
    longTermGoalTitle: { type: String, default: "" },
    longTermTarget: { type: Number, default: 0 },
    longTermDeadline: { type: String, default: "" },
    updatedAt: { type: Date, default: Date.now }
});

// Index for faster user lookup
GoalSchema.index({ userId: 1 });

module.exports = mongoose.model('Goal', GoalSchema);
