import mongoose from "mongoose";
import Delete_Episode_Service from "../../../service/EpisodeService/Delete_Episode_Service/delete_Episode_Service.js";

export default async function Delete_Episode_Controllers(req, res) {
  try {
    const queryParams = req.params.id

    const isValidObjectId = mongoose.Types.ObjectId.isValid(queryParams);

    if (isValidObjectId === false) {
      return res.status(400).json({
        success: false,
        message: "همچین شانسه ای معتبر نیست",
      });
    }

    const deleteEpisode = await Delete_Episode_Service(queryParams , req.user)

    return res.status(200).json(deleteEpisode)
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
