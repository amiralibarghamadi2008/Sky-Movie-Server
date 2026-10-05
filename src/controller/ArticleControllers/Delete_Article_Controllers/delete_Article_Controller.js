import mongoose from "mongoose";
import Delete_Article_Service from "../../../service/ArticleServices/Delete_Article_Service/delete_Article_Service.js";

export default async function Delete_Article_Controllers(req, res) {
  try {
    const queryParams = req.params.id;

    const isValidObjectId = mongoose.Types.ObjectId.isValid(queryParams);

    if (isValidObjectId === false) {
      return res.status(400).json({
        success: false,
        message: "همچین شانسه ای معتبر نیست",
      });
    }

    const deleteArticle = await Delete_Article_Service(queryParams, req.user);

    return res.status(200).json(deleteArticle);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
