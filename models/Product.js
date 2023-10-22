const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  _id: String,
  Title: String,
  Ratings: Number,
  Reviews: Number,
  Price: Number,
  Quantity: Number,
  Image: String,
  Stars: Number,
  Description: String,
  Category: String,
  Sub_Category: String,
});

module.exports = mongoose.model('Product', productSchema);
