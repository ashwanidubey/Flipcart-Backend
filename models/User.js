const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
  orderDetails: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
  cartItems: [{  type: mongoose.Schema.Types.ObjectId,ref: 'Product' }]
});

module.exports = mongoose.model('User', userSchema);
