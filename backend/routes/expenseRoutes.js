const express = require('express');
const router = express.Router();
const { addExpense, getExpenses, getAnalytics, deleteExpense } = require('../controllers/expenseController');
const { ensureAuth } = require('../middleware/authMiddleware');

// All routes require authentication
router.route('/')
    .get(ensureAuth, getExpenses)
    .post(ensureAuth, addExpense);

router.route('/:id')
    .delete(ensureAuth, deleteExpense);

router.route('/analytics')
    .get(ensureAuth, getAnalytics);

module.exports = router;
