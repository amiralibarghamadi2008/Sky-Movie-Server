import GetAll_Article_Service from "../../../service/ArticleServices/GetAll_Article_Service/getAll_Article_Service.js";

export default async function GetAll_Article_Controllers(req, res) {
  try {
    const getAllArticle = await GetAll_Article_Service();

    return res.status(200).json(getAllArticle);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
