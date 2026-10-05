import mongoose from "mongoose";
import MakeAdminService from "../../service/MackeAdminService/mackeAdminService.js";
import { validateChangeRole } from "../../validator/UserValidator/userValidator.js";

export default async function MackeAdminController(req, res) {
  try {

    const checkResult = validateChangeRole(req.body);

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

    const { role } = req.body;

    const roleChange = await MakeAdminService(queryPrams, { role });

    return res.status(200).json(roleChange);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
