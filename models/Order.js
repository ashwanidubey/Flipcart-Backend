const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

    product: {
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
    },
    quantity: Number,
    orderDate: Date,
    status: String,
});

module.exports = mongoose.model('Order', orderSchema);
