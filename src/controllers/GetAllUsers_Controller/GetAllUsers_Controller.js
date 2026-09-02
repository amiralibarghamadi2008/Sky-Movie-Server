import GetAllUsers_Service from "../../services/GetAllUsers_Service/GetAllUsers_Service.js";

export default async function GetAllUsers(req, res) {
  try {
    const result = await GetAllUsers_Service();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "خطای سرور در دریافت کاربران",
    });
  }
}