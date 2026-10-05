import mongoose from "mongoose";
import Update_Episode_Service from "../../../service/EpisodeService/Update_Episode_Service/update_Episode_Service.js";
import { validateUpdateEpisode } from "../../../validator/EpisodeValidator/episodeValidator.js";

export default async function Update_Episode_Controllers(req, res) {
  try {

    const checkResult = validateUpdateEpisode(req.body);
    
    if (checkResult !== true) {
      return res.status(422).json({
        success: false,
        message: checkResult[0].message,
        errors: checkResult.map((error) => ({
          field: error.field,
          message: error.message,
        })),
      });
    }

    const queryParams = req.params.id

    const isValidObjectId = mongoose.Types.ObjectId.isValid(queryParams);

    if (isValidObjectId === false) {
      return res.status(400).json({
        success: false,
        message: "همچین شانسه ای معتبر نیست",
      });
    }

    const { titleEpisode, seasonNumber, episodeNumber, duration, series, downloadLinks } = req.body;

    const updateEpisode = await Update_Episode_Service( { titleEpisode, seasonNumber, episodeNumber, duration, series, downloadLinks } , queryParams , req.user)

    return res.status(200).json(updateEpisode)
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
