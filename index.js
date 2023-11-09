const express = require('express');
const app = express();
const db = require('./db');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');
const connectToMongo = require('./db.js');



// Middleware for parsing JSON
app.use(express.json());

// Connect to the database
connectToMongo();

// Routes
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
