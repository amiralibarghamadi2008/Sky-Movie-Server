import { FindOneArticle } from "../../../repository/ArticleRepository/ArticleRepository.js";

export default async function GetOne_Article_Service(slugArticle) {
  try {
    const getOneArticle = await FindOneArticle({ slugArticle });

    return {success : true , getOneArticle}
  } catch (error) {
    throw error;
  }
}
