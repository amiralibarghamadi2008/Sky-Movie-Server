import GetOne_Episode_Service from "../../../service/EpisodeService/GetOne_Episode_Service/getOne_Episode_Service.js";

export default async function GetOne_Series_Controllers(req, res) {
  try {
    const queryParams = req.params.slug;

    const getOneSeries = await GetOne_Episode_Service(queryParams);

    return res.status(200).json(getOneSeries);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
