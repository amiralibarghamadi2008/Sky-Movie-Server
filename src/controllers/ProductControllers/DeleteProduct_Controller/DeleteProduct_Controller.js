import DeleteProduct_Service from "../../../services/ProductServices/DeleteProduct_Service/DeleteProduct_Service.js";
import { InvalidateProductCache } from "../../../services/ProductServices/ProductCache_Service/ProductCache_Service.js";

export default async function DeleteProduct(req, res) {
  try {
    const Params = req.params.id;

    const result = await DeleteProduct_Service(Params, req.user);

    // ⭐ محصول حذف شد → کش قدیمی رو پاک کن
    await InvalidateProductCache();

    return res.status(200).json(result);
  } catch (error) {
    let statusCode = 500;
    if (error.message.includes("یافت نشد")) {
      statusCode = 404;
    }

    return res.status(statusCode).json({
      success: false,
      message: error.message,
    });
  }
}