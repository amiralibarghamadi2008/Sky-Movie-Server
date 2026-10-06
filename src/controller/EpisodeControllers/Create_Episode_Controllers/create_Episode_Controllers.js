import Create_Episode_Service from "../../../service/EpisodeService/Create_Episode_Service/create_Episode_Service.js";
import { validateCreateEpisode } from "../../../validator/EpisodeValidator/episodeValidator.js";

export default async function Create_Episode_Controllers(req, res) {
  try {

    const checkResult = validateCreateEpisode(req.body);

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

    const { titleEpisode, seasonNumber, episodeNumber, duration, series, downloadLinks } = req.body;
    
    const createEpisode = await Create_Episode_Service( { titleEpisode, seasonNumber, episodeNumber, duration, series, downloadLinks } ,req.user);

    return res.status(200).json(createEpisode);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
