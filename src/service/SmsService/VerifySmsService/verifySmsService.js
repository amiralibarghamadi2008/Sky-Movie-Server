import redis from "../../../config/redis/redis.js";

export default async function VerifyOtpCodeService(userData) {
  try {
    const { phoneNumber, otpCode } = userData;
    const cacheKey = `otp:${phoneNumber}`;

    const savedData = await redis.get(cacheKey);

    if (!savedData) {
      throw new Error("کد تایید منقضی شده یا وجود ندارد");
    }

    const parsedData = JSON.parse(savedData);

    if (parsedData.otpCode !== String(otpCode)) {
      throw new Error("کد وارد شده اشتباه می باشد");
    }

    await redis.del(cacheKey);

    return { success: true, message: "کد با موفقیت تایید شد" };
  } catch (error) {
    throw error;
  }
}
