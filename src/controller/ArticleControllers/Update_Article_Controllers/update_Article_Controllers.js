import Update_Article_Service from "../../../service/ArticleServices/Update_Article_Service/update_Article_Service.js";

export default async function Update_Article_Controllers(req, res) {
  try {
    const queryParams = req.params.id

    const { titleArticle , image , shortDes , longDes } = req.body;

    const updateArticle = await Update_Article_Service( { titleArticle , image , shortDes , longDes } , queryParams , req.user)

    return res.status(200).json(updateArticle)
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
