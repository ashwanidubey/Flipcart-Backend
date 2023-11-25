const express = require('express');
const router = express.Router();
const productFunctions = require('../functions/productFunctions');
const authMiddleware=require('../middleware/authMiddleware');

// Search products route

router.get('/search',  productFunctions.searchProducts);
router.get('/searchall', productFunctions.searchAllProducts);

module.exports = router;
