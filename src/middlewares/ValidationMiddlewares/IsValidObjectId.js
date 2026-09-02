import { isValidObjectId } from "mongoose";

export default async function IsValidObjectId_Middleware(req, res, next) {
  try {
    const Params = req.params.id;

    if (isValidObjectId(Params) === true) {
      next();
    } else {
      res.status(422).json({
        message: "user not found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
}
