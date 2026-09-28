import Create_Episode_Service from "../../../service/EpisodeService/Create_Episode_Service/create_Episode_Service.js";

export default async function Create_Series_Controllers(req, res) {
  try {
    const { titleSeries, mainImage, images, shortDes, longDes, genres, director, status, network, IMDbRating } = req.body;

    const createSeries = await Create_Episode_Service({ titleSeries, mainImage, images, shortDes, longDes, genres, director, status, network, IMDbRating } , req.user)

    return res.status(200).json(createSeries)
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
