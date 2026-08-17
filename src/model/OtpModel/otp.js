import mongoose from "mongoose";

const OtpSchema = new mongoose.Schema(
  {
    phoneNumber: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      match: /09[0-9]{9}$/,
    },
  },
  {
    timestamps: true,
  },
);

const OtpModel = mongoose.models.otp || mongoose.model("otp", OtpSchema);

export default OtpModel;
