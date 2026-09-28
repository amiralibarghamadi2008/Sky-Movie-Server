import GetAll_Episode_Service from "../../../service/EpisodeService/GetAll_Episode_Service/getAll_Episode_Service.js";

export default async function GetAll_Episode_Controllers(req, res) {
  try {
    const getAllEpisode = await GetAll_Episode_Service();

    return res.status(200).json(getAllEpisode);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
