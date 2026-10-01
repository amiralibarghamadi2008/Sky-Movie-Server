import { FindOtpCode } from "../../../repository/OtpRepository/otpRepository.js";

export default async function VerifyOtpCodeService(userData) {
  try {
    const { phoneNumber , otpCode } = userData

    const otpRecord = await FindOtpCode(phoneNumber)

    if (!otpRecord) {
        throw new Error("کد تایید یا منقضی شده یا وجود ندارد")
    }

    if (otpRecord.otpCode !== String(otpCode)) {
        throw new Error("کد وارد شده اشتباه می باشد")
    }
  } catch (error) {
    throw error;
  }
}
