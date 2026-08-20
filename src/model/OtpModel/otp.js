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
    otpCode: {
      type: String,
      required : true,
    },
    createdAt : {
      type: Date,
      default : Date.now,
      expires : 120
    }
  },
  {
    timestamps: true,
  },
);

const OtpModel = mongoose.models.otp || mongoose.model("otp", OtpSchema);

export default OtpModel;
