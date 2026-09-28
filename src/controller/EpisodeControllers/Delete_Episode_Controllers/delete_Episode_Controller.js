import Delete_Episode_Service from "../../../service/EpisodeService/Delete_Episode_Service/delete_Episode_Service.js";

export default async function Delete_Episode_Controllers(req, res) {
  try {
    const queryParams = req.params.id

    const deleteEpisode = await Delete_Episode_Service(queryParams , req.user)

    return res.status(200).json(deleteEpisode)
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
