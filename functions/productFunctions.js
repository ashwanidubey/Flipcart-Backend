// functions/productFunctions.js
const Product = require('../models/Product')
const productFunctions = {
  searchProducts: async (req, res) => {
    try {
      const { searchWord } = req.body; // Assuming the search word is provided in the query string
      if (typeof searchWord !== 'string') {
        return res.status(400).json({ success: false, message: 'Invalid search word' });
      }
      // Use a regular expression to search for products with titles containing the search word
      const items = await Product.find({ Title: { $regex: searchWord, $options: 'i' } });

      res.json({ items, success: true, message: "searched successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  },
  searchAllProducts: async (req, res) => {
    
    try {
       const items = await Product.find({});

      res.json({ items, success: true, message: "searched successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  },
};

module.exports = productFunctions;
