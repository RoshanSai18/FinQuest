const Goal = require('../models/Goal');

// @desc    Get user's financial goal
// @route   GET /api/goals
// @access  Private
exports.getGoal = async (req, res) => {
    try {
        // Get authenticated user ID
        const userId = req.user?._id;
        if (!userId) {
            return res.status(401).json({ error: 'User not authenticated' });
        }

        const goal = await Goal.findOne({ userId });
        res.json(goal || {}); // Return empty object if no goal exists
    } catch (err) {
        console.error('Get goal error:', err);
        res.status(500).json({ message: err.message });
    }
};

// @desc    Create or update user's financial goal
// @route   POST /api/goals
// @access  Private
exports.updateGoal = async (req, res) => {
    try {
        // Get authenticated user ID
        const userId = req.user?._id;
        if (!userId) {
            return res.status(401).json({ error: 'User not authenticated' });
        }

        let goal = await Goal.findOne({ userId });
        
        if (goal) {
            // Update existing goal
            goal = await Goal.findOneAndUpdate(
                { userId },
                { ...req.body, userId, updatedAt: Date.now() },
                { new: true, runValidators: true }
            );
        } else {
            // Create new goal
            goal = await Goal.create({
                ...req.body,
                userId,
                updatedAt: Date.now()
            });
        }
        
        res.json(goal);
    } catch (err) {
        console.error('Update goal error:', err);
        res.status(400).json({ message: err.message });
    }
};
