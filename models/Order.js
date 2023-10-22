const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    _id: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    },
    quantity: Number,
    orderDate: Date,
    status: String,
});

module.exports = mongoose.model('Order', orderSchema);
