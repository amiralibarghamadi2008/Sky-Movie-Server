import OTPModel from "../../model/OTPModel/OTP.js";
import { Create , FindOne } from "../BaceRepository/BaceRepository.js";

export async function saveOTP(phoneNumber, code) {
  try {
    return await Create(OTPModel, { phoneNumber, code });
  } catch (error) {
    throw error;
  }
}
export async function findOTPByPhone(phoneNumber) {
  try {
    return await FindOne(OTPModel, { phoneNumber }, { sort: { createdAt: -1 } });
  } catch (error) {
    throw error;
  }
}