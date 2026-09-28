import Delete_Movie_Service from "../../../service/MovieServices/Delete_Movie_Service/delete_Movie_Service.js";

export default async function Delete_Movie_Controller(req, res) {
  try {
    const queryParams = req.params.id;

    const deleteMovie = await Delete_Movie_Service(queryParams, req.user);

    if (!deleteMovie) {
      return res.status(404).json("همچین فیلمی وجود نداره");
    } else {
      return res.status(200).json(deleteMovie);      
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
