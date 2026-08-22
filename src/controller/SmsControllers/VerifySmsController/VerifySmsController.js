import Verify_Service from "../../../service/SmsService/VerifySmsService/VerifySmsService.js";

export default async function Verify_Controllers(req, res) {
  try {
    const { phoneNumber, userCode } = req.body;

    if (!phoneNumber || !userCode) {
      return res.status(400).json({ success: false, message: "شماره موبایل و کد تایید الزامی هستند" });
    }

    const result = await Verify_Service({ phoneNumber, userCode });

    return res.status(200).json({
      success: true,
      message: result.message
    });

  } catch (error) {
    console.error("خطا در وریفای کد", error.message);
    return res.status(400).json({
      success: false,
      message: error.message || "خطا در تایید کد."
    });
  }
}