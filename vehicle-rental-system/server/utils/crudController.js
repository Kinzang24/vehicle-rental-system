// Sprints 15 and 17: one CRUD pattern reused by every module.
// Each module still has its own model, controller file and route file.
const mongoose = require('mongoose');

const handleError = (res, error) => {
  if (error.name === 'ValidationError') {
    const message = Object.values(error.errors).map((e) => e.message).join(', ');
    return res.status(400).json({ success: false, message });
  }
  if (error.code === 11000) {
    const field = Object.keys(error.keyPattern || {})[0] || 'value';
    return res.status(400).json({ success: false, message: `A record with this ${field} already exists` });
  }
  if (error.name === 'CastError') {
    return res.status(400).json({ success: false, message: 'Invalid ID' });
  }
  return res.status(500).json({ success: false, message: error.message });
};

const badId = (req, res) => {
  if (mongoose.isValidObjectId(req.params.id)) return false;
  res.status(400).json({ success: false, message: 'Invalid ID' });
  return true;
};

module.exports = (Model, label) => ({
  create: async (req, res) => {            // CREATE
    try {
      const doc = await Model.create(req.body);
      res.status(201).json({ success: true, message: `${label} created successfully`, data: doc });
    } catch (error) { handleError(res, error); }
  },

  getAll: async (req, res) => {            // READ ALL
    try {
      const docs = await Model.find().sort({ createdAt: -1 });
      res.status(200).json({ success: true, count: docs.length, data: docs });
    } catch (error) { handleError(res, error); }
  },

  getOne: async (req, res) => {            // READ ONE
    try {
      if (badId(req, res)) return;
      const doc = await Model.findById(req.params.id);
      if (!doc) return res.status(404).json({ success: false, message: `${label} not found` });
      res.status(200).json({ success: true, data: doc });
    } catch (error) { handleError(res, error); }
  },

  update: async (req, res) => {            // UPDATE
    try {
      if (badId(req, res)) return;
      const doc = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!doc) return res.status(404).json({ success: false, message: `${label} not found` });
      res.status(200).json({ success: true, message: `${label} updated successfully`, data: doc });
    } catch (error) { handleError(res, error); }
  },

  remove: async (req, res) => {            // DELETE
    try {
      if (badId(req, res)) return;
      const doc = await Model.findByIdAndDelete(req.params.id);
      if (!doc) return res.status(404).json({ success: false, message: `${label} not found` });
      res.status(200).json({ success: true, message: `${label} deleted successfully` });
    } catch (error) { handleError(res, error); }
  }
});
