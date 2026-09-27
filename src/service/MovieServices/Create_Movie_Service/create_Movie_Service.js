import { CreateMovie } from "../../../repository/MovieRepository/MovieRepository.js";

export default async function Create_Movie_Service(movieData) {
  try {
    const createMovie = await CreateMovie(movieData);

    return { success: true, createMovie };
  } catch (error) {
    throw error;
  }
}
