import Update_Episode_Service from "../../../service/EpisodeService/Update_Episode_Service/update_Episode_Service.js";

export default async function Update_Episode_Controllers(req, res) {
  try {
    const queryParams = req.params.id

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
