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
      article: getOneArticle,
      articleComment: comments,
    };
  } catch (error) {
    throw error;
  }
}
