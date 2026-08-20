import sendSMSWithPattern from "../../utils/ConnectToSmsPanel/ConnectToSmsPanel.js";
import { SendOtpCode } from "../../repository/OtpRepository/OtpRepository.js";

export default async function SmsServices(userData) {
  try {
    const { phoneNumber } = userData;

    const generatedCode = Math.floor(10000 + Math.random() * 90000).toString();
    console.log(generatedCode);

    const recId = await sendSMSWithPattern(phoneNumber, generatedCode);

    console.log(generatedCode);

    await saveOTP(phoneNumber, generatedCode);
  } catch (err) {
    throw err;
  }
}
