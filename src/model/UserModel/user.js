import mongoose from "mongoose";
import MovieModel from "../MovieModel/movie";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: true,
      maxLength: 30,
    },
    phonNumber: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      match: /09[0-9]{9}$/,
    },
    role: {
      type: String,
      enum: ["ADMIN", "USER"],
      default: "USER",
    },
    Bookmark: {
      type: mongoose.Types.ObjectId,
      ref: "movie",
    },
  },
  {
    timestamps: true,
  },
);

const UserModel = mongoose.models.user || mongoose.model("user", UserSchema);

export default UserModel;
