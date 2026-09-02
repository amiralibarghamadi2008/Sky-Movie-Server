import UpdateProduct_Service from "../../../services/ProductServices/UpdateProduct_Service/UpdateProduct_Service.js";
import { InvalidateProductCache } from "../../../services/ProductServices/ProductCache_Service/ProductCache_Service.js";

export default async function UpdateProduct(req, res) {
  try {
    const Params = req.params.id;
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

    const result = await UpdateProduct_Service(
      Params,
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

    // ⭐ محصول ویرایش شد → کش قدیمی رو پاک کن
    await InvalidateProductCache();

    return res.status(200).json(result);
  } catch (error) {
    let statusCode = 400;

    return res.status(statusCode).json({
      success: false,
      message: error.message,
    });
  }
}