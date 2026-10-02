import OtpModel from "../../model/OtpModel/otp.js";
import { FindOne, Create, Delete } from "../BaceRepository/BaceRepository.js";

export async function SendOtpCode(phoneNumber, otpCode) {
  try {
    return await Create(OtpModel, { phoneNumber, otpCode });
  } catch (error) {
    throw error;
  }
}

export async function FindOtpCode(phoneNumber) {
  try {
    return await FindOne(OtpModel, { phoneNumber }, { sort: { createdAt: -1 } });
  } catch (error) {
    throw error;
  }
}

export async function DeleteOtp(otpCode) {
  try {
    return await Delete(OtpModel, otpCode);
  } catch (error) {
    throw error;
  }
}
