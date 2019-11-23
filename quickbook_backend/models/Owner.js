const mongoose = require('mongoose');
const ownerSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Owner', ownerSchema);