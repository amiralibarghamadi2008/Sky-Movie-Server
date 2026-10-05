import mongoose from "mongoose";
import Update_Article_Service from "../../../service/ArticleServices/Update_Article_Service/update_Article_Service.js";
import { validateUpdateArticle } from "../../../validator/ArticleValidator/articleValidator.js";

export default async function Update_Article_Controllers(req, res) {
  try {
    const checkResult = validateUpdateArticle(req.body);

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

    const queryParams = req.params.id;

    const isValidObjectId = mongoose.Types.ObjectId.isValid(queryParams);

    if (isValidObjectId === false) {
      return res.status(400).json({
        success: false,
        message: "همچین شانسه ای معتبر نیست",
      });
    }

    const { titleArticle, image, shortDes, longDes } = req.body;

    const updateArticle = await Update_Article_Service(
      { titleArticle, image, shortDes, longDes },
      queryParams,
      req.user
    );

    return res.status(200).json(updateArticle);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
