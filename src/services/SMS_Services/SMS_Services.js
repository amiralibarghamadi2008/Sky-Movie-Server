import crypto from "crypto";
import sendSMSWithPattern from "../../utils/SMS_Service/SMS_Service.js";
import { saveOTP } from "../../repository/OtpRepository/OtpRepository.js";

export default async function SMS_Service(userData) {
  try {
    const { phoneNumber } = userData;

    // کد OTP با randomInt رمزنگارانه
    const generatedCode = crypto.randomInt(10000, 100000).toString();

    const recId = await sendSMSWithPattern(phoneNumber, generatedCode);

    await saveOTP(phoneNumber, generatedCode);

    return { recId, generatedCode };
  } catch (error) {
    throw error;
  }
}
