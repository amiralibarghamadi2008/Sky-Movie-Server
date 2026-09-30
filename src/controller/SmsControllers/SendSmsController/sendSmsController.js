import SendSmsService from "../../../service/SmsService/SendSmsService/sendSmsService.js";

export default async function SendSmsController(req, res) {
  try {
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
      return res.status(400).json("شماره تلفن ضروری هست");
    }

    const sendCode = await SendSmsService({ phoneNumber });

    return res.status(200).json({
      success: true,
      message: "کد تایید با موفقیت ارسال شد",
      result: sendCode.phoneNumber
    });
  } catch (error) {
    throw error;
  }
}
