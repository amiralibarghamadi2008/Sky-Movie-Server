import { CreateArticle } from "../../../repository/ArticleRepository/ArticleRepository.js";

export default async function Create_Article_Service(articleData) {
  try {
    const createArticle = await CreateArticle(articleData)

    return {success : true , createArticle}
  } catch (error) {
    throw error;
  }
}
