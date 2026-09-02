import RefreshToken_Services from "../../services/RefreshToken_Services/RefreshToken_Services.js";
import SetTokenCookies from "../../utils/cookies/setTokenCookies/setTokenCookies.js";

export default async function RefreshToken_Controllers(req, res) {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res
        .status(401)
        .json({ success: false, message: "دسترسی غیرمجاز؛ توکن یافت نشد." });
    }

    const { newAccessToken, newRefreshToken } = await RefreshToken_Services(refreshToken);

    SetTokenCookies(res, newAccessToken, newRefreshToken);

    return res.status(200).json({
      success: true,
      message: "توکن‌ها با موفقیت تمدید شدند.",
    });
  } catch (error) {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    return res.status(401).json({ success: false, message: error.message });
  }
}
