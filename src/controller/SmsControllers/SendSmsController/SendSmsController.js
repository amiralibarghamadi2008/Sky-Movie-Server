import SmsServices from "../../../service/SmsService/SendSmsService/SendSmsService.js";

export default async function SmsController(req, res) {
  try {
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
      return res.status(400).json({
        success: false,
        message: "شماره موبایل الزامی است",
      });
    }

    const iranPhoneRegex = /^09\d{9}$/;
    if (!iranPhoneRegex.test(phoneNumber)) {
      return res.status(400).json({
        success: false,
        message: "فرمت شماره موبایل وارد شده معتبر نیست",
      });
    }

    const result = await SmsServices({ phoneNumber });

    return res.status(200).json({
      success: true,
      message: "کد تایید با موفقیت ارسال شد",
      data: result || null,
    });
  } catch (error) {
    console.error("SMS Controller Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "خطا در ارسال پیامک تایید",
    });
  }
}