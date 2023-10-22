const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/flipkart-clone', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;
