const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: {type: String, required: true, unique: true },
  address: { type: String, required: false },
  city: { type: String, required: false },
  postalCode: { type: String, required: false }
});

module.exports = mongoose.model('Users', userSchema);
