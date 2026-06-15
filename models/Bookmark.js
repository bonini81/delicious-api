const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  url: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  tags: { type: [String], default: [] },
}, { timestamps: true });

module.exports = mongoose.model('Bookmark', bookmarkSchema);
