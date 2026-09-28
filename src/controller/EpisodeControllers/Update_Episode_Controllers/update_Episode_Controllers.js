import Update_Episode_Service from "../../../service/EpisodeService/Update_Episode_Service/update_Episode_Service.js";

export default async function Update_Series_Controllers(req, res) {
  try {
    const queryParams = req.params.id

    const { titleSeries, mainImage, images, shortDes, longDes, genres, director, status, network, IMDbRating } = req.body;

    const updateSeries = await Update_Episode_Service({ titleSeries, mainImage, images, shortDes, longDes, genres, director, status, network, IMDbRating } , queryParams , req.user)

    return res.status(200).json(updateSeries)
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
