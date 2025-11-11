const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a medicine name'],
    trim: true
  },
  company: {
    type: String,
    required: [true, 'Please add a company name'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: [
      'Pain Relief',
      'Antibiotics',
      'Vitamins & Supplements',
      'Cold & Flu',
      'Digestive Health',
      'Heart Health',
      'Diabetes Care',
      'First Aid',
      'Skin Care',
      'Others'
    ]
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  price: {
    type: Number,
    required: [true, 'Please add a price'],
    min: 0
  },
  stock: {
    type: Number,
    required: [true, 'Please add stock quantity'],
    min: 0,
    default: 0
  },
  expiryDate: {
    type: Date,
    required: [true, 'Please add expiry date']
  },
  image: {
    type: String,
    default: 'default-medicine.jpg'
  },
  prescription: {
    type: Boolean,
    default: false
  },
  dosage: {
    type: String,
    required: false
  },
  sideEffects: {
    type: String,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update timestamp on save
medicineSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Medicine', medicineSchema);
