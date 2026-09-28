import { DeleteMovie } from "../../../repository/MovieRepository/MovieRepository.js";

export default async function Delete_Movie_Service(movieId) {
  try {
    const deleteMovie = await DeleteMovie(movieId);

    return { success: true, message : "فیلم با موفقیت حذف شد" ,deleteMovie };
  } catch (error) {
    throw error;
  }
}
