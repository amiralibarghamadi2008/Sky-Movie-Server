import CreateProduct_Service from "../../../services/ProductServices/CreateProduct_Service/CreateProduct_Service.js";
import { InvalidateProductCache } from "../../../services/ProductServices/ProductCache_Service/ProductCache_Service.js";

export default async function CreateProduct(req, res) {
  try {
    const {
      title,
      short_description,
      long_description,
      main_image,
      images,
      variants,
      delivery_time,
      is_active,
    } = req.body;

    const result = await CreateProduct_Service(
      {
        title,
        short_description,
        long_description,
        main_image,
        images,
        variants,
        delivery_time,
        is_active,
      },
      req.user,
    );

    // ⭐ محصول جدید ساخته شد → کش قدیمی رو پاک کن
    await InvalidateProductCache();

    return res.status(201).json(result);
  } catch (error) {
    let statusCode = 400;
    if (error.message.includes("دسترسی غیرمجاز")) {
      statusCode = 403;
    }

    return res.status(statusCode).json({
      success: false,
      message: error.message,
    });
  }
}