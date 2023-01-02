const mongoose = require('mongoose')

const FriendSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
    required: false,
  }
})

module.exports = mongoose.model('Friend', FriendSchema)
