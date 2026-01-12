import mongoose from "mongoose";

const vendorProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  },

  storeName: {
    type: String,
    required: true,
    trim: true
  },

  storeType: {
    type: String,
    enum: ['fish', 'meat', 'eggs', 'bakery', 'water', 'grocery', 'other'],
    required: true
  },

  storeAddress: {
    type: String,
    required: true
  },

  description: {
    type: String
  },

  isApproved: {
    type: Boolean,
    default: false
  },

  businessPermitUrl: {
    type: String
  },

  rating: {
    type: Number,
    default: 0
  },

  totalOrders: {
    type: Number,
    default: 0
  }

}, {
  timestamps: true
});

export default mongoose.model("VendorProfile", vendorProfileSchema);
