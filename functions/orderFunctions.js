// functions/orderFunctions.js
const Order = require('../models/Order');
const User = require('../models/User');
const mongoose = require('mongoose');
const uuid = require('uuid');

const orderFunctions = {
    placeOrder: async (req, res) => {
        try {
            const { user,product , quantity } = req.body;
            const orderId = uuid.v4();
            const order = new Order({
                _id: new mongoose.Types.ObjectId(),
                user,
                product,
                quantity,
                orderDate: new Date(),
                status: 'Placed',
            });
            
            // Save the order to the database
            await order.save();
            const data=await User.findOne({_id:user})
            console.log("/////", order._id, data )
            await User.findByIdAndUpdate(user, { $push: { orderDetails: order._id } });



            res.json({ message: 'Order placed successfully', orderId });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    cancelOrder: async (req, res) => {
        try {
            // Assuming you have the orderId and userId in the request
            const { orderId, user } = req.body;

            // You should validate the data and handle errors appropriately

            // Find the order by orderId and user
            const order = await Order.findOne({ orderId, user });

            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }

            // Check if the order is already canceled or delivered
            if (order.status === 'Canceled' || order.status === 'Delivered') {
                return res.status(400).json({ message: 'Cannot cancel order; it is already canceled or delivered' });
            }

            // Update the order status to 'Canceled'
            order.status = 'Canceled';

            // Save the updated order to the database
            await order.save();

            res.json({ message: 'Order canceled successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
};

module.exports = orderFunctions;
