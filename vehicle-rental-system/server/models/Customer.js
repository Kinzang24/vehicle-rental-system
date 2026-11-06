const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Name is required'], trim: true, minlength: [2, 'Name must be at least 2 characters'] },
  email: { type: String, required: [true, 'Email is required'], unique: true, lowercase: true, trim: true, match: [/^\S+@\S+\.\S+$/, 'Enter a valid email'] },
  phone: { type: String, required: [true, 'Phone is required'], trim: true, minlength: [10, 'Phone must be at least 10 digits'] },
  address: { type: String, trim: true, default: '' },
  licenseNumber: { type: String, required: [true, 'License number is required'], trim: true, uppercase: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Customer', customerSchema); // collection: customers
