import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "VendorProfile",
    required: true
  },

  name: {
    type: String,
    required: true,
    trim: true
  },

  category: {
    type: String,
    enum: ['fish', 'meat', 'eggs', 'bakery', 'water', 'grocery', 'computers', 'other'],
    required: true
  },

  description: {
    type: String
  },

  price: {
    type: Number,
    required: true,
    min: 0
  },

  unit: {
    type: String,
    enum: ['kg', 'pc', 'dozen', 'liter', 'pack', 'grams'],
    default: 'pc'
  },

  stock: {
    type: Number,
    default: 0
  },

  isAvailable: {
    type: Boolean,
    default: true
  },

  images: [String],

  freshnessNote: String,  // "caught today", "1 day old"

}, {
  timestamps: true
});

export default mongoose.model("Product", productSchema);
