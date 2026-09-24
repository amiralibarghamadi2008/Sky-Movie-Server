import GetMeService from "../../service/GetMeService/getMeService.js";

export default async function GetMeController(req, res) {
  try {
    const userId = req.user.id;

    const userData = await GetMeController(userId);

    if (userData) {
      return res.status(200).json({
        success: true,
        user: userData,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "همچین کاربی وجود ندارد",
      });
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      success: false,
      message: error.message || "خطای سرور",
    });
  }
}
