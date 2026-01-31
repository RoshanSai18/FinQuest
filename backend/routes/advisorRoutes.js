const express = require('express');
const router = express.Router();
const advisorController = require('../controllers/advisorController');
const { ensureAuth } = require('../middleware/authMiddleware');

// All advisor routes require authentication
router.use(ensureAuth);

// POST /api/advisor/analyze - Analyze financial data and get structured audit
router.post('/analyze', advisorController.analyzeFinancials);

// POST /api/advisor/chat - Chat with AI financial advisor
router.post('/chat', advisorController.chatWithAdvisor);

// GET /api/advisor/profile - Get stored financial profile
router.get('/profile', advisorController.getFinancialProfile);

// DELETE /api/advisor/chat/history - Clear chat history
router.delete('/chat/history', advisorController.clearChatHistory);

module.exports = router;
