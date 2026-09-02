import SMS_Service from "../../services/SMS_Services/SMS_Services.js";

export default async function SMS_Controllers(req, res) {
  try {
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
      return res.status(400).json({ message: "شماره موبایل الزامی است" });
    }

    const result = await SMS_Service({ phoneNumber });

    return res.status(200).json({
      success: true,
      message: "کد تایید با موفقیت ارسال شد",
    });

    return res.status(500).json({
      success: false,
      message:
        "خطا در وب‌سرویس پترن ملی پیامک",
    });
  } catch (error) {
    throw error;
  }
}
