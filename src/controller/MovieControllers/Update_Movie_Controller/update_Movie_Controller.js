import Update_Movie_Service from "../../../service/MovieServices/Update_Movie_Service/update_Movie_Service.js";
import { validateUpdateMovie } from "../../../validator/MovieValidator/movieValidator.js";

export default async function Update_Movie_Controller(req, res) {
  try {

    const checkResult = validateUpdateMovie(req.body);

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
      
      const {titleMovie, slug, mainImage, images, shortDes, longDes, genres, duration, director, IMDbRating, downloadLinks} = req.body

    const updateMovie = await Update_Movie_Service(queryParams , {titleMovie, slug, mainImage, images, shortDes, longDes, genres, duration, director, IMDbRating, downloadLinks} , req.user)    

    if (!updateMovie) {
        return res.status(404).json("همچین فیلمی وجود نداره");
    }else {
        return res.status(200).json({success: true , updateMovie});
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
