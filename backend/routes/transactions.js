const express = require('express');

const {
  createTransaction,
  getTransaction,
  getTransactions,
  deleteTransaction,
  updateTransaction,
} = require('../controllers/transactionController');

// Instance of Router
const router = express.Router();

// GET all transactions
router.get('/', getTransactions);

// GET a single transaction
router.get('/:id', getTransaction);

// POST a new transaction
router.post('/', createTransaction);

// DELETE a transaction
router.delete('/:id', deleteTransaction);

// PATCH a transaction
router.patch('/:id', updateTransaction);

module.exports = router;
