import SendSMSWithPattern from "../../../utils/ConnectToSmsPanel/ConnectToSmsPanel.js";
import { SendOtpCode } from "../../../repository/OtpRepository/otpRepository.js";
import redis from "../../../config/redis/redis.js";
import crypto from "node:crypto";

export default async function SendSmsService(userData) {
  try {
    const { phoneNumber } = userData;

    const cacheKey = `otp:${phoneNumber}`;

    const cachedOtpCode = await redis.get(cacheKey);

    if (cachedOtpCode) {
      throw new Error(
        "کد تایید قبلاً برای شما ارسال شده است. لطفاً ۲ دقیقه دیگر مجدداً تلاش کنید."
      );
    }

    const generatOtpCode = crypto.randomInt(10000, 100000).toString();

    const resId = await SendSMSWithPattern(phoneNumber, generatOtpCode);

    const Send = await SendOtpCode(phoneNumber, generatOtpCode);

    if (Send) {
      await redis.set(cacheKey, JSON.stringify(Send), {
        EX: 120,
      });
    }

    return { resId, Send };
  } catch (error) {
    throw error;
  }
}
