const mongoose = require('mongoose');

const authenticationSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Authentication', authenticationSchema);