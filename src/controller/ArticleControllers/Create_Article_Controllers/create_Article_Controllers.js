import Create_Article_Service from "../../../service/ArticleServices/Create_Article_Service/create_Article_Service.js";
import { validateCreateArticle } from "../../../validator/ArticleValidator/articleValidator.js";

export default async function Create_Article_Controllers(req, res) {
  try {
    const checkResult = validateCreateArticle(req.body);

    if (checkResult !== true) {
      return res.status(422).json({
        success: false,
        message: checkResult[0].message,
        errors: checkResult.map((error) => ({
          field: error.field,
          message: error.message,
        })),
      });
    }

    const { titleArticle , image , shortDes , longDes } = req.body;
    
    const createArticle = await Create_Article_Service( { titleArticle , image , shortDes , longDes } ,req.user);

    return res.status(200).json(createArticle);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
