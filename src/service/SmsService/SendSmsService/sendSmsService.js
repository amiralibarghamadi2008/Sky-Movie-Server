import SendSMSWithPattern from "../../../utils/ConnectToSmsPanel/ConnectToSmsPanel.js";
import { SendOtpCode } from "../../../repository/OtpRepository/otpRepository.js";
import crypto from "node:crypto";

export default async function SendSmsService(userData) {
  try {
    const { phoneNumber } = userData

    const generatOtpCode = crypto.randomInt(1000 , 100000).toString()

    const resId = await SendSMSWithPattern(phoneNumber , generatOtpCode)

    const Send = await SendOtpCode(phoneNumber , generatOtpCode)

    return {resId , Send}
  } catch (error) {
    throw error;
  }
}
