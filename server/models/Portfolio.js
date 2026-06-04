const mongoose = require('mongoose');

const PortfolioSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Banners', 'Printing', 'Signage', 'Promotional']
  },
  client: {
    type: String,
    required: true
  },
  year: {
    type: String,
    default: () => new Date().getFullYear().toString()
  },
  image: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Portfolio', PortfolioSchema);
