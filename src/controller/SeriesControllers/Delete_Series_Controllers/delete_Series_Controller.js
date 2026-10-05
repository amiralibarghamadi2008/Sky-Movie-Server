import mongoose from "mongoose";
import Delete_Series_Service from "../../../service/SeriesServices/Delete_Series_Service/delete_Series_Service.js";

export default async function Delete_Series_Controllers(req, res) {
  try {
    const queryParams = req.params.id

    const isValidObjectId = mongoose.Types.ObjectId.isValid(queryParams);

    if (isValidObjectId === false) {
      return res.status(400).json({
        success: false,
        message: "همچین شانسه ای معتبر نیست",
      });
    }

    const deleteSeries = await Delete_Series_Service(queryParams , req.user)

    return res.status(200).json(deleteSeries)
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
