import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },
    code: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 120,
    },
  },
  {
    timestamps: true,
  },
);

const OTPModel = mongoose.models.OTP || mongoose.model("OTP", otpSchema);

export default OTPModel;
