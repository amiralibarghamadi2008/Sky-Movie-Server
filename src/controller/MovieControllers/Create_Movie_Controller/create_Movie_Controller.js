import Create_Movie_Service from "../../../service/MovieServices/Create_Movie_Service/create_Movie_Service.js";
import { validateCreateMovie } from "../../../validator/MovieValidator/movieValidator.js";

export default async function Create_Movie_Controller(req, res) {
  try {

    const checkResult = validateCreateMovie(req.body);

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

    const {titleMovie, slug, mainImage, images, shortDes, longDes, genres, duration, director, IMDbRating, downloadLinks} = req.body

    const createMovie = await Create_Movie_Service({ titleMovie, slug, mainImage, images, shortDes, longDes, genres, duration, director, IMDbRating, downloadLinks } , req.user)

    if (!createMovie) {
        return res.status(400).json("فیلد ها پر نشدن یا اطلاعات وارد شده مشکل دارد")
    } else {
        return res.status(201).json(createMovie)
    }

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
