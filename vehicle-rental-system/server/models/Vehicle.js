const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Vehicle name is required'], trim: true, minlength: [2, 'Name must be at least 2 characters'] },
  brand: { type: String, required: [true, 'Brand is required'], trim: true },
  type: { type: String, required: [true, 'Type is required'], enum: { values: ['Car', 'Bike', 'Bus', 'Van'], message: 'Type must be Car, Bike, Bus or Van' } },
  registrationNumber: { type: String, required: [true, 'Registration number is required'], unique: true, uppercase: true, trim: true },
  pricePerDay: { type: Number, required: [true, 'Price per day is required'], min: [1, 'Price must be at least 1'] },
  available: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Vehicle', vehicleSchema); // collection: vehicles
