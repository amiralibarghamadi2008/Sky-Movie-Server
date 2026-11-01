import GetOne_Movie_Service from "../../../service/MovieServices/GetOne_Movie_Service/getOne_Movie_Service.js";

export default async function GetOne_Movie_Controller(req, res) {
  try {
    const queryParams = req.params.slug;

    const { movie , movieComment } = await GetOne_Movie_Service({ slug: queryParams });

    if (!movie && !movieComment) {
      return res.status(404).json("این فیلم وجود ندارد");
    } 
      
    return res.status(200).json({
      success : true,
      movie,
      movieComment,
    });
    
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
