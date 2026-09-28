import { UpdateArticle } from "../../../repository/ArticleRepository/ArticleRepository.js";

export default async function Update_Article_Service(articleId, articleData) {
  try {
    const updateArticle = await UpdateArticle(articleId, articleData);

    return { success: true, updateArticle };
  } catch (error) {
    throw error;
  }
}
