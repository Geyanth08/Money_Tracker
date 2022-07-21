// Packages used in applications 👇
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

// Instances from other files
const transactionRoutes = require('./routes/transactions');

// Create a Instance of express
const app = express();

// Environmental Variables
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGO_URI;

// Middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
app.use(express.json());

// Transaction Routes Middleware
app.use('/api/transactions', transactionRoutes);

// Connecting to MONGODB
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    // Listen for requests
    app.listen(PORT, () => {
      console.log(`Server is connected DB and Running at the Port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
