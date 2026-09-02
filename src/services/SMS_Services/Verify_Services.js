import { findOTPByPhone } from "../../repository/OtpRepository/OtpRepository.js";

export default async function Verify_Service(verifyData) {
  try {
    const { phoneNumber, code } = verifyData;

    const otpRecord = await findOTPByPhone(phoneNumber);

    if (!otpRecord) {
      throw new Error("کد تایید منقضی شده یا وجود ندارد. لطفاً مجدداً تلاش کنید.");
    }

    if (otpRecord.code !== String(code)) {
      throw new Error("کد تایید وارد شده اشتباه است.");
    }

    return { message: "احراز هویت با موفقیت انجام شد." };

  } catch (error) {
    throw error;
  }
}