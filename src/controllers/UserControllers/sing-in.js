import "dotenv/config";
import SignIn_Services from "../../services/UserServices/sign-in.js";
import SetTokenCookies from "../../utils/cookies/setTokenCookies/setTokenCookies.js";


export default async function SignIn_Controllers(req, res) {
  try {
    const { phoneNumber, code , firstName } = req.body;

    const result = await SignIn_Services({ phoneNumber, code , firstName });

    SetTokenCookies(res, result.accessToken, result.refreshToken);

    return res.status(200).json({
      success: true,
      message: result.isNewUser
        ? "ثبت‌نام با موفقیت انجام شد."
        : "ورود با موفقیت انجام شد.",
      isNewUser: result.isNewUser,
      user: {
        firstName: result.user.firstName,
        role: result.user.role,
      },
    });
  } catch (error) {
    console.error("SignIn error:", error);
    return res
      .status(400)
      .json({ success: false, message: error.message || "خطای سرور" });
  }
}
