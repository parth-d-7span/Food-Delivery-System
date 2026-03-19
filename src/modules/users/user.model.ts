import mongoose, { type Model, type Query } from "mongoose";

import ROLES, { type Role } from "../../constants/roles.js";
import type { UserEntity } from "./dto/user.dto.js";

export type UserDocument = mongoose.HydratedDocument<UserEntity>;  //used for type safety
type UserModel = Model<UserEntity>;

const userSchema = new mongoose.Schema<UserEntity, UserModel>(
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
      enum: Object.values(ROLES) as Role[],
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

const filterDeletedDocuments = function (this: Query<unknown, UserEntity>): void {
  this.where({ deletedAt: null });
};

userSchema.pre("find", filterDeletedDocuments);
userSchema.pre("findOne", filterDeletedDocuments);

const User = mongoose.model<UserEntity, UserModel>("User", userSchema);

export default User;
