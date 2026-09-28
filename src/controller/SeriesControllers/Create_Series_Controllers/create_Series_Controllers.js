import Create_Series_Service from "../../../service/SeriesServices/Create_Series_Service/create_Series_Service.js";

export default async function Create_Series_Controllers(req, res) {
  try {
    const { titleSeries, mainImage, images, shortDes, longDes, genres, director, status, network, IMDbRating} = req.body;

    const createSeries = await Create_Series_Service({ titleSeries, mainImage, images, shortDes, longDes, genres, director, status, network, IMDbRating} , req.user)

    return res.status(200).json(createSeries)
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
