import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
  {
    menuItemId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "menuItems",
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: false },
);

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: "User",
    },
    menuItemId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
      ref: "menuItems",
    },
    items: {
      type: [cartItemSchema],
      required: true,
      default: [],
    },
    quantity: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    totalAmount: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true },
);

cartSchema.pre("validate", function () {
  this.quantity = this.items.reduce((sum, item) => sum + item.quantity, 0);
  this.totalAmount = this.items.reduce((sum, item) => sum + item.totalPrice, 0);
  this.menuItemId = this.items.length > 0 ? this.items[this.items.length - 1].menuItemId : null;
});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
