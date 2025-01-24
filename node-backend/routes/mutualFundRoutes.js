const express = require('express');
const mutualFundController = require('../controllers/mutualFundController');

const router = express.Router();

// Routes
router.get('/', mutualFundController.getMutualFunds);
router.post('/calculate', mutualFundController.calculateFutureValue);

module.exports = router;