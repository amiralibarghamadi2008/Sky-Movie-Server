import { CreateComment } from "../../../../repository/CommentRepository/commentRepository.js";
import { FindOneMovie } from "../../../../repository/MovieRepository/MovieRepository.js";

export default async function Create_Comment_Movie_Sercie(slug, commentData, userId) {
  try {
    const foundMovie = await FindOneMovie(slug);

    if (!foundMovie) {
      throw new Error("همچین فیلم ای وجود ندارد");
    }

    const createComment = await CreateComment({
      ...commentData,
      movie: foundMovie._id,
      user: userId
    });

    return {
      success: true,
      movie: foundMovie,
      comment: createComment,
    };
  } catch (error) {
    throw error;
  }
}
