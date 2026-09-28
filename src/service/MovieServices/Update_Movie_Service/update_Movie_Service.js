import { UpdateMovie } from "../../../repository/MovieRepository/MovieRepository.js";

export default async function Update_Movie_Service(movieId , movieData) {
  try {
    const updateMovie = await UpdateMovie(movieId , movieData);

    return {success : true , message : "فیلم با موفقیت ویرایش شد" , updateMovie}
  } catch (error) {
    throw error;
  }
}
