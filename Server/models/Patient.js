const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  address: {
    type: String,
    required: false 
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  lastVisited: {
    type: Date,
    required: true
  },
  age: {
    type: Number,
    required: false
  },
  symptoms: {
    type: Array,
    required: true
  },
  gender: {
    type: String,
    required: true,
    // enum: ['male', 'female', 'other']
  },
  medications: {
    type: [String]
  }
});

module.exports = mongoose.model('Patient', patientSchema);
