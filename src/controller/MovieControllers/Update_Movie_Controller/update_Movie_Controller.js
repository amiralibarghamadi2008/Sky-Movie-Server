import Update_Movie_Service from "../../../service/MovieServices/Update_Movie_Service/update_Movie_Service.js";

export default async function Update_Movie_Controller(req, res) {
  try {
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
