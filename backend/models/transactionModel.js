const mongoose = require('mongoose');

// Instance of Schema
const Schema = mongoose.Schema;

// Document Structure
const transactionSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    method: {
      type: Boolean,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

// Instance of Model
module.exports = mongoose.model('transaction', transactionSchema);
