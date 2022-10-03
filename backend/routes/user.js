const express = require('express');

const { loginUser, signUpUser } = require('../controllers/userController');

// Instance of Router
const router = express.Router();

// Login router
router.post('/login', loginUser);

// SingUp router
router.post('/signup', signUpUser);

module.exports = router;
