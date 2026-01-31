const Expense = require('../models/Expense');

// @desc    Add new expense (Manual or Scanned)
// @route   POST /api/expenses
// @access  Private
exports.addExpense = async (req, res) => {
    try {
        const { title, amount, category, classification, date, subCategory, interestRate, expectedReturn } = req.body;
        
        if (!amount || !classification) {
            return res.status(400).json({ error: "Amount and Classification are required" });
        }

        // Get authenticated user ID
        const userId = req.user?._id;
        if (!userId) {
            return res.status(401).json({ error: 'User not authenticated' });
        }

        const expense = await Expense.create({
            userId,
            title,
            amount,
            category,
            classification,
            date: date || Date.now(),
            subCategory: subCategory || '',
            interestRate: interestRate || 0,
            expectedReturn: expectedReturn || 0
        });

        res.status(201).json({ success: true, data: expense });
    } catch (err) {
        console.error('Add expense error:', err);
        res.status(500).json({ success: false, error: err.message });
    }
};

// @desc    Get all expenses (Sorted by Date)
// @route   GET /api/expenses
// @access  Private
exports.getExpenses = async (req, res) => {
    try {
        // Get authenticated user ID
        const userId = req.user?._id;
        if (!userId) {
            return res.status(401).json({ error: 'User not authenticated' });
        }

        const expenses = await Expense.find({ userId })
            .sort({ date: -1 })
            .limit(50);
        
        res.status(200).json({ success: true, count: expenses.length, data: expenses });
    } catch (err) {
        console.error('Get expenses error:', err);
        res.status(500).json({ success: false, error: err.message });
    }
};

// @desc    Get Analytics for Charts
// @route   GET /api/expenses/analytics
// @access  Private
exports.getAnalytics = async (req, res) => {
    try {
        // Get authenticated user ID
        const userId = req.user?._id;
        if (!userId) {
            return res.status(401).json({ error: 'User not authenticated' });
        }

        // 1. Classification breakdown (Needs/Wants/Investments/Debt totals)
        const breakdown = await Expense.aggregate([
            { $match: { userId } },
            {
                $group: {
                    _id: "$classification",
                    totalAmount: { $sum: "$amount" }
                }
            }
        ]);

        // 2. Daily spend trends (For Cash Velocity Chart)
        const dailyTrend = await Expense.aggregate([
            { $match: { userId } },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
                    dailyTotal: { $sum: "$amount" }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        res.status(200).json({
            success: true,
            breakdown, 
            dailyTrend 
        });
    } catch (err) {
        console.error('Get analytics error:', err);
        res.status(500).json({ success: false, error: err.message });
    }
};

// @desc    Delete expense
// @route   DELETE /api/expenses/:id
// @access  Private
exports.deleteExpense = async (req, res) => {
    try {
        // Get authenticated user ID
        const userId = req.user?._id;
        if (!userId) {
            return res.status(401).json({ error: 'User not authenticated' });
        }

        // Only delete if expense belongs to user
        const expense = await Expense.findOneAndDelete({ 
            _id: req.params.id,
            userId 
        });
        
        if (!expense) {
            return res.status(404).json({ success: false, error: "No expense found or unauthorized" });
        }

        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        console.error('Delete expense error:', err);
        res.status(500).json({ success: false, error: "Server Error" });
    }
};
