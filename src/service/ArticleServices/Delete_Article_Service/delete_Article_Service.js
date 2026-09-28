import { DeleteArticle } from "../../../repository/ArticleRepository/ArticleRepository.js";

export default async function Delete_Article_Service(articleId) {
  try {
    const deleteArticle = await DeleteArticle(articleId)

    return {success : true , deleteArticle}
  } catch (error) {
    throw error;
  }
}
