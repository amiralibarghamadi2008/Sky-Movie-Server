import { FindAllArticle } from "../../../repository/ArticleRepository/ArticleRepository.js";

export default async function GetAll_Article_Service() {
  try {
    const getAllArticle = await FindAllArticle();

    return { success: true, getAllArticle };
  } catch (error) {
    throw error;
  }
}
