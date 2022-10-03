// Packages used in applications 👇
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

// Instances from other files
const transactionRoutes = require('./routes/transactions');
const userRoutes = require('./routes/user');

// Create a Instance of express
const app = express();

// Environmental Variables
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGO_URI;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, './frontend', './build')));

// Transaction Routes Middleware
app.use('/api/transactions', transactionRoutes);
app.use('/api/users', userRoutes);

// Connecting to MONGODB
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, './frontend', './build', 'index.html'));
    });
    // Listen for requests
    app.listen(PORT, () => {
      console.log(`Server is connected DB and Running at the Port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
