import Update_Series_Service from "../../../service/SeriesServices/Update_Series_Service/update_Series_Service.js";
import { validateUpdateSeries } from "../../../validator/SeriesValidator/seriesValidator.js";

export default async function Update_Series_Controllers(req, res) {
  try {

    const checkResult = validateUpdateSeries(req.body);

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

    const { titleSeries, mainImage, images, shortDes, longDes, genres, director, status, network, IMDbRating } = req.body;

    const updateSeries = await Update_Series_Service({ titleSeries, mainImage, images, shortDes, longDes, genres, director, status, network, IMDbRating } , queryParams , req.user)

    return res.status(200).json(updateSeries)
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
