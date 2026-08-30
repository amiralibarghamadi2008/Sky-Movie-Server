import ConnectToDB from "../../config/db/db.js";

export default async function ConnectToDBMiddleware(req, res, next) {
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
