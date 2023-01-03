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
  age: {
    type: Number,
    required: false
  },
  gender: {
    type: String,
    required: true,
    // enum: ['male', 'female', 'other']
  },
  symptoms: {
    type: [{
      type: String,
    }],
    required: true,
  },  
  medications: {
    type: [String]
  }
});

module.exports = mongoose.model('Patient', patientSchema);
