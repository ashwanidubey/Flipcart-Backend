const express = require('express');
const router = express.Router();
const orderFunctions = require('../functions/orderFunctions');
const authMiddleware = require('../middleware/authMiddleware');

// Place order route
router.post('/placeorder', authMiddleware.isAuthenticated, orderFunctions.placeOrder);

// Cancel order route
router.post('/cancelorder', authMiddleware.isAuthenticated, orderFunctions.cancelOrder);

module.exports = router;
