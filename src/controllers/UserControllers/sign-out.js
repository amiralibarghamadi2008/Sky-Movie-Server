import SignOut_Services from "../../services/UserServices/sign-out.js";
import ClearTokenCookies from "../../utils/cookies/clearTokenCookies/clearTokenCookies.js";

export default async function SignOut_Controllers(req, res) {
  try {
    await SignOut_Services();

    ClearTokenCookies(res);

    return res.status(200).json({
      success: true,
      message: "با موفقیت از حساب کاربری خود خارج شدید. 👋",
    });
  } catch (error) {
    console.error("SignOut error:", error);
    return res
      .status(500)
      .json({ success: false, message: "خطا در فرآیند خروج از حساب" });
  }
}