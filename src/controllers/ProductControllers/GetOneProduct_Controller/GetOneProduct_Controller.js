import { GetCachedSingleProduct } from "../../../services/ProductServices/ProductCache_Service/ProductCache_Service.js";

export default async function GetOneProduct(req, res) {
  try {
    const Params = req.params.id;
    const result = await GetCachedSingleProduct(Params);
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
