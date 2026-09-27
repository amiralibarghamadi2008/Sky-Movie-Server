import GetAll_Movie_Service from "../../../service/MovieServices/GetAll_Movie_Service/getAll_Movie_Service.js";

export default async function GetAll_Movie_Controller(req, res) {
  try {
    const getAllProduct = await GetAll_Movie_Service();

    if (!getAllProduct) {
      return res.status(404).json("فیلمی یافت نشد !");
    } else {
      return res.status(200).json(getAllProduct);
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
