import AdjustPrice_Service from "../../../services/ProductServices/AdjustPrice_Service/AdjustPrice_Service.js";
import { InvalidateProductCache } from "../../../services/ProductServices/ProductCache_Service/ProductCache_Service.js";

export default async function AdjustPrice(req, res) {
  try {
    const Params = req.params.id;
    const { percent, mode, applyToDiscount, rounding } = req.body;

    const result = await AdjustPrice_Service(
      Params,
      {
        percent,
        mode,
        applyToDiscount,
        rounding,
      },
      req.user,
    );

    // ⭐ قیمت‌ها تغییر کردن → کش قدیمی رو پاک کن
    await InvalidateProductCache();

    return res.status(200).json(result);
  } catch (error) {
    let statusCode = 400;
    if (error.message.includes("یافت نشد")) {
      statusCode = 404;
    }

    return res.status(statusCode).json({
      success: false,
      message: error.message,
    });
  }
}