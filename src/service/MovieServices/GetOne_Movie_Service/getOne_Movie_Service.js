import { FindOneMovie } from "../../../repository/MovieRepository/MovieRepository.js";

export default async function GetOne_Movie_Service(movieId) {
  try {
    const getOneMovie = await FindOneMovie(movieId);

    return { success: true, getOneMovie };
  } catch (error) {
    throw error;
  }
}
