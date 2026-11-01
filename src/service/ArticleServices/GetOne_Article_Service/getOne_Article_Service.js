import { FindOneArticle } from "../../../repository/ArticleRepository/ArticleRepository.js";
import { FindAllComment } from "../../../repository/CommentRepository/commentRepository.js";

export default async function GetOne_Article_Service(slugArticle) {
  try {
    const getOneArticle = await FindOneArticle({ slugArticle });

    if (!getOneArticle) {
      throw new Error("موردی پیدا نشد");
    }

    const comments = await FindAllComment({ movie: getOneArticle._id });

    return {
      success: true,
<<<<<<< HEAD
      article: getOneArticle,
      articleComment: comments,
=======
      movie: getOneArticle,
      movieComment: comments,
>>>>>>> 3e87702d84697aab8a5bb8910499fb08bd24fbe6
    };
  } catch (error) {
    throw error;
  }
}
