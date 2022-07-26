const mongoose = require('mongoose');

const Transaction = require('../models/transactionModel');

// Get all transaction
const getTransactions = async (req, res) => {
  const user_id = req.user._id;

  // get docs from db
  try {
    const transactions = await Transaction.find({ user_id }).sort({
      createdAt: -1,
    });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single transaction
const getTransaction = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such transaction' });
  }
  // get doc from db
  try {
    const transaction = await Transaction.findById(id);

    if (!transaction) {
      return res.status(404).json({ error: 'No such Transaction' });
    }
    res.status(200).json(transaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Create a new transaction
const createTransaction = async (req, res) => {
  const { title, method, amount } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push('title');
  }
  if (!amount) {
    emptyFields.push('amount');
  }

  if (emptyFields.length > 0) {
    res.status(400).json({ error: 'Please Fill in all Fields', emptyFields });
  }

  // Add doc to db
  try {
    const user_id = req.user._id;
    const transaction = await Transaction.create({
      title,
      method,
      amount,
      user_id,
    });
    res.status(200).json(transaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a transaction
const deleteTransaction = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such transaction' });
  }
  // get doc from db
  try {
    const transaction = await Transaction.findOneAndDelete({ _id: id });

    if (!transaction) {
      return res.status(404).json({ error: 'No such Transaction' });
    }
    res.status(200).json(transaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a transaction
const updateTransaction = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such transaction' });
  }
  // get doc from db
  try {
    const transaction = await Transaction.findByIdAndUpdate(
      { _id: id },
      {
        ...req.body,
      }
    );

    if (!transaction) {
      return res.status(404).json({ error: 'No such Transaction' });
    }
    res.status(200).json(transaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createTransaction,
  getTransaction,
  getTransactions,
  deleteTransaction,
  updateTransaction,
};
