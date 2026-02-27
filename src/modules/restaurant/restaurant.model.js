import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Restaurant name is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "createdBy is required"],
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "updatedBy is required"],
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true, 
  }
);

// Soft-delete filter — exclude deleted restaurants by default
restaurantSchema.pre("find", function () {
  this.where({ deletedAt: null });
});

restaurantSchema.pre("findOne", function () {
  this.where({ deletedAt: null });
});

restaurantSchema.pre("findOneAndUpdate", function () {
  this.where({ deletedAt: null });
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
export default Restaurant;