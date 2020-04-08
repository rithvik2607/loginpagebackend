const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  lastName: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  username: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  regNo: {
    type: String,
    required: true,
    min: 6,
    max: 10
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 1024
  },
  blockDet: {
    type: String,
    required: true,
    min: 1,
    max: 255
  },
  address: {
    type: String,
    required: true,
    max: 255
  }
});

module.exports = mongoose.model('User', userSchema);  