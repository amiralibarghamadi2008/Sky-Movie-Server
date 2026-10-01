import VerifyOtpCodeService from "../../../service/SmsService/VerifySmsService/verifySmsService.js";

export default async function VerifyOtpCodeController(req, res) {
  try {
    const { phoneNumber, otpCode } = req.body;

    if (!phoneNumber || !otpCode) {
      res.status(400).json("شماره تلفن و کد تایید الزامی هستش ");
    }

    const result = await VerifyOtpCodeService({ phoneNumber, otpCode });

    return res.status(200).json({
      success: true,
      message: "کد تایید معتبر بود",
      result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
