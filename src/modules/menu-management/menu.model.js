const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true
  },

  name: {
    type: String,
    required: true,
    trim: true
  },

  description: {
    type: String,
    default: null
  },

  price: {
    type: Number,
    required: true,
    min: 20
  },

  category: {
    type: String,
    required: true,
    enum: [
        "starter",
        "main_course",
        "dessert",
        "beverage",
        "snack",
        "combo"
      ]
  },

  image: {
    type: String,
    default: null,
  },

  isAvailable: {
    type: Boolean,
    required: true,
    default: true
  }

}, {
  timestamps: true // automatically adds createdAt & updatedAt
});

module.exports = mongoose.model("MenuItem", menuSchema);