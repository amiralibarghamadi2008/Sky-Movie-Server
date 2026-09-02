import UpdateName_Service from "../../../services/UserServices/UpdateName_Service/UpdateName_Service.js";

export default async function UpdateName(req, res) {
  try {
    const { firstName } = req.body;
    const userId = req.user.id;

    const result = await UpdateName_Service(userId, { firstName });
    return res.status(200).json(result);
  } catch (error) {
    let statusCode = 400;

    return res.status(statusCode).json({
      success: false,
      message: error.message,
    });
  }
}
