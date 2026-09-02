import DeleteUser_Service from "../../../services/UserServices/DeleteUser_Service/DeleteUser_Service.js";

export default async function DeleteUser_Controller(req, res) {
  try {
    const userId = req.params.id;
    const result = await DeleteUser_Service(userId, req.user);
    return res.status(200).json(result);
  } catch (error) {
    let statusCode = 400;
    if (error.message.includes("دسترسی غیرمجاز")) statusCode = 403;
    if (error.message.includes("یافت نشد")) statusCode = 404;

    return res.status(statusCode).json({
      success: false,
      message: error.message,
    });
  }
}
