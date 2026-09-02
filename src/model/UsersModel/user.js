import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      maxLength: 50,
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      match: /09[0-9]{9}$/,
    },
    role: {
      type: String,
      enum: ["PENDING", "USER", "ADMIN"],
      default: "PENDING",
    },
    avatar: {
      type: String,
      trim: true,
      default: "",
    },
    jobTitle: {
      type: String,
      trim: true,
      maxLength: 100,
      default: "",
    },
    bio: {
      type: String,
      trim: true,
      maxLength: 500,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

const UserModel = mongoose.models.user || mongoose.model("user", UserSchema);

export default UserModel;
