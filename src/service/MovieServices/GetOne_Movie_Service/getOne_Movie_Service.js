import { FindOneMovie } from "../../../repository/MovieRepository/MovieRepository.js";

export default async function GetOne_Movie_Service(slug) {
  try {
    const getOneMovie = await FindOneMovie( slug );

    return { success: true, getOneMovie };
  } catch (error) {
    throw error;
  }
}
