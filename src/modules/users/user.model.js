import mongoose from "mongoose";

import ROLES from "../../constants/roles.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: Object.values(ROLES),
      default: ROLES.CUSTOMER,
      required: true,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

// Automatically exclude soft-deleted users from all find queries
userSchema.pre("find", function () {
  this.where({ deletedAt: null });
});

userSchema.pre("findOne", function () {
  this.where({ deletedAt: null });
});

const User = mongoose.model("User", userSchema);

export default User;
