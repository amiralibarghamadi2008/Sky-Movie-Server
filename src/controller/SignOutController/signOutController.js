import ClearAccessTokenCookie from "../../utils/Cookies/ClearCookies/AccessTokenCookie/accessTokenCookie.js";
import ClearRefreshTokenCookie from "../../utils/Cookies/ClearCookies/RefreshTokenCookie/refreshTokenCookie.js";
import SignOutService from "../../service/SignOutService/signOutService.js";

export default async function signOutController(req, res) {
  try {
    SignOutService();
    ClearAccessTokenCookie(res);
    ClearRefreshTokenCookie(res);
    return res.status(200).json({
      success: true,
      message: "با موفقیت از حساب کاربری خود خارج شدید",
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      success: false,
      message: error.message || "خطای سرور",
    });
  }
}
