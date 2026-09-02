import GetMe_Services from "../../services/GetMe_Services/GetMe_Services.js";
import GenerateAccessToken from "../../utils/token/accessToken/accessToken.js";

export default async function GetMe_Controllers(req, res) {
  try {
    const userId = req.user.id;

    const userData = await GetMe_Services(userId);

    // اگر نقش کاربر در دیتابیس با توکن تغییر کرده، کوکی جدید ست شود
    if (userData.role && req.user.role !== userData.role) {
      const newAccessToken = GenerateAccessToken({
        _id: userData._id,
        role: userData.role,
        firstName: userData.firstName,
      });
      res.cookie("accessToken", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 20 * 60 * 1000,
        priority: "high",
      });
    }

    return res.status(200).json({
      success: true,
      user: userData,
    });
  } catch (error) {
    return res.status(401).json({ success: false, message: error.message });
  }
}
