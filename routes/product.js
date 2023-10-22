const express = require('express');
const router = express.Router();
const productFunctions = require('../functions/productFunctions');
const authMiddleware=require('../middleware/authMiddleware');

// Search products route
router.post('/search',  authMiddleware.isAuthenticated, productFunctions.searchProducts);
router.get('/searchall',authMiddleware.isAuthenticated, productFunctions.searchAllProducts);

module.exports = router;
