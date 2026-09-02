import ConnectToDataBace from "../../config/data/db.js";

export default async function ConnectToDataBace_Middlewares(req, res, next) {
  try {
    await ConnectToDataBace();

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
}
