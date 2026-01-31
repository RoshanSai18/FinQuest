const express = require('express');
const router = express.Router();
const goalController = require('../controllers/goalController');
const { ensureAuth } = require('../middleware/authMiddleware');

// All routes require authentication
router.get('/', ensureAuth, goalController.getGoal);
router.post('/', ensureAuth, goalController.updateGoal);

module.exports = router;
