import VerifyOtpCodeService from "../../../service/SmsService/VerifySmsService/verifySmsService.js";
import { validateVerifySms } from "../../../validator/AuthValidator/authValidator.js";

export default async function VerifyOtpCodeController(req, res) {
  try {

    const checkResult = validateVerifySms(req.body);

    if (checkResult !== true) {
      return res.status(422).json({
        success: false,
        message: checkResult[0].message,
        errors: checkResult.map((error) => ({
          field: error.field,
          message: error.message,
        })),
      });
    }

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
