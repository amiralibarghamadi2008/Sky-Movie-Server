import GetOne_Article_Service from "../../../service/ArticleServices/GetOne_Article_Service/getOne_Article_Service.js";

export default async function GetOne_Article_Controllers(req, res) {
  try {
    const queryParams = req.params.slug;

    const getOneArticle = await GetOne_Article_Service(queryParams);

    return res.status(200).json(getOneArticle);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
