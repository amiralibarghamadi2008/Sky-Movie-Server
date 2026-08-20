import sendSMSWithPattern from "../../utils/ConnectToSmsPanel/ConnectToSmsPanel.js";
import { SendOtp } from "../../repository/OtpRepository/OtpRepository.js"
import crypto from "node:crypto";

export default async function SmsServices(userData) {
  try {
    const { phoneNumber } = userData;

    const generatedCode = crypto.randomInt(10000, 100000).toString();

    const recId = await sendSMSWithPattern(phoneNumber, generatedCode);

    await SendOtp(phoneNumber, generatedCode);
  } catch (err) {
    throw err;
  }
}
