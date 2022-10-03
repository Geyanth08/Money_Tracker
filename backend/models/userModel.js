const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

// Instance of Schema
const Schema = mongoose.Schema;

// Document Structure
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// static signup method
userSchema.statics.signup = async function (email, password) {
  if (!email || !password) {
    throw Error('All fields are required');
  }

  if (!validator.isEmail(email)) {
    throw Error('Not a Valid Email Address');
  }

  if (!validator.isStrongPassword(password)) {
    throw Error('Not a Strong enough password');
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error('Email already in use');
  }

  const salt = await bcrypt.genSalt(10); // Number of characters
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    email,
    password: hash,
  });

  return user;
};

// static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error('All fields are required');
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error('Email is not found');
  }

  const match = bcrypt.compare(password, user.password);

  if (!match) {
    throw Error('Incorrect Password');
  }

  return user;
};

// Instance of Model
module.exports = mongoose.model('user', userSchema);
