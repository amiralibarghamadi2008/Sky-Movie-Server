import { FindAllMovie } from "../../../repository/MovieRepository/MovieRepository.js";

export default async function GetAll_Movie_Service(movieData) {
  try {
    const AllMovie = await FindAllMovie(movieData);

    return { success: true, AllMovie };
  } catch (error) {
    throw error;
  }
}
