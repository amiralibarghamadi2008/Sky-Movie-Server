import { GetOtpCode } from "../../../repository/OtpRepository/OtpRepository.js";

export default async function Verify_Service(userQeury) {
  try {
    const { phoneNumber, userCode } = userQeury;

    const otpRecord = await GetOtpCode(phoneNumber);

    if (!otpRecord) {
      throw new Error(
        "کد تایید منقضی شده یا وجود ندارد. لطفاً مجدداً تلاش کنید.",
      );
    }

    if (otpRecord.code !== String(userCode)) {
      throw new Error("کد تایید وارد شده اشتباه است.");
    }

    return { message: "احراز هویت با موفقیت انجام شد." };
  } catch (err) {
    throw err;
  }
}
