import Delete_Episode_Service from "../../../service/EpisodeService/Delete_Episode_Service/delete_Episode_Service.js";

export default async function Delete_Series_Controllers(req, res) {
  try {
    const queryParams = req.params.id

    const deleteSeries = await Delete_Episode_Service(queryParams , req.user)

    return res.status(200).json(deleteSeries)
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
