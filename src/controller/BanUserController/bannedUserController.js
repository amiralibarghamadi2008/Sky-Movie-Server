import mongoose from "mongoose";
import BannedUserService from "../../service/BannedUserService/bannedUserService.js";
import { validateBanUser } from "../../validator/UserValidator/userValidator.js";

export default async function BannedUserController(req, res) {
  try {

    const checkResult = validateBanUser(req.body);

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

    const { isBanned } = req.body;

    const bannedUser = await BannedUserService(queryParams, { isBanned });

    res.status(200).json({
        success : true, 
        message : "کاربر بن شد",
        bannedUser
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
