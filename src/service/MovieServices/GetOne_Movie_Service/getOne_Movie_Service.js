import { FindAllComment } from "../../../repository/CommentRepository/commentRepository.js";
import { FindOneMovie } from "../../../repository/MovieRepository/MovieRepository.js";

export default async function GetOne_Movie_Service(slug) {
  try {
    const getOneMovie = await FindOneMovie(slug);

    if (!getOneMovie) {
      throw new Error("موردی پیدا نشد");
    }

    const comments = await FindAllComment({ movie: getOneMovie._id });

    return {
      success: true,
      movie: getOneMovie,
      movieComment: comments,
    };
  } catch (error) {
    throw error;
  }
}
