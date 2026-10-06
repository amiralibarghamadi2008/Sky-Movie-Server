import SendSmsService from "../../../service/SmsService/SendSmsService/sendSmsService.js";
import { validateSendSms } from "../../../validator/AuthValidator/authValidator.js";

export default async function SendSmsController(req, res) {
  try {

    const checkResult = validateSendSms(req.body);

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

    const { phoneNumber } = req.body;

    if (!phoneNumber) {
      return res.status(400).json("شماره تلفن ضروری هست");
    }

    const sendCode = await SendSmsService({ phoneNumber });

    return res.status(200).json({
      success: true,
      message: "کد تایید با موفقیت ارسال شد",
      result: sendCode.phoneNumber,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
