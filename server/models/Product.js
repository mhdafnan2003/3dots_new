const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  titleLine2: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    required: true
  },
  images: {
    type: [String],
    default: []
  },
  category: {
    type: String,
    required: true,
    enum: ['printing', 'signage', 'branding']
  },
  subcategory: {
    type: String,
    default: ''
  },
  year: {
    type: String,
    default: () => new Date().getFullYear().toString()
  },
  client: {
    type: String,
    default: 'VIP Client Dubai'
  },
  description: {
    type: String,
    default: ''
  },
  specMaterial: {
    type: String,
    default: ''
  },
  specFinishing: {
    type: String,
    default: ''
  },
  specProduction: {
    type: String,
    default: ''
  },
  specFacility: {
    type: String,
    default: ''
  },
  specs: {
    type: [{
      label: String,
      value: String
    }],
    default: []
  },
  features: {
    type: [String],
    default: []
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', ProductSchema);
