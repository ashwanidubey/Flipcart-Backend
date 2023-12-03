// functions/orderFunctions.js
const Order = require('../models/Order');
const User = require('../models/User');
const Product = require('../models/Product')
const mongoose = require('mongoose');
const uuid = require('uuid');

const orderFunctions = {
    placeOrder: async (req, res) => {
        try {
            const { product , quantity } = req.body;
            const userid=req.userid
            if(!userid || !product || !quantity ) 
            {
                res.send({status:false,message:"not proper input"})
                return ;
           }
            const order = new Order({
                user:userid,
                product,
                quantity,
                orderDate: new Date(),
                status: 'Placed',
            });
            
            // Save the order to the database
            await order.save();
            const data=await User.findOne({_id:userid})
            await User.findByIdAndUpdate(userid, { $push: { orderDetails: order._id } });



            res.json({ message: 'Order placed successfully', orderId:order._id });
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
          
            const order = await Order.findOne({ _id:orderId });

            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }

            // Check if the order is already canceled or delivered
            if (order.status === 'Canceled' || order.status === 'Delivered') {
                return res.status(400).json({ message: `Cannot cancel order; it is already ${order.status}`});
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
    orderItem:  async (req, res) => {
        try {
            const userid=req.userid
            const user=await User.findOne({_id:userid})
            const orderIdList= user.orderDetails 

            const productPromises = orderIdList.map(async (item) => {
                const order = await Order.findOne({ _id: item });
                const product = await order.product;
    
                return {product,
                    "quantity": order.quantity,
                    "orderDate": order.orderDate,
                    "status": order.status,
                    "orderId":order._id
                };
            });
    
            const productlist = await Promise.all(productPromises);
            res.send({"success":true, productlist})

            
        }catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }

    }
};

module.exports = orderFunctions;
