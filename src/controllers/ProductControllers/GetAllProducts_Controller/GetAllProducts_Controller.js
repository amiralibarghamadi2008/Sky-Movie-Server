import GetCachedProducts from "../../../services/ProductServices/ProductCache_Service/ProductCache_Service.js";

export default async function GetAllProducts(req, res) {
  try {
    const result = await GetCachedProducts();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
}