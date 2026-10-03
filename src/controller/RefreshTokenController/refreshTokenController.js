import RefreshTokenService from "../../service/RefreshTokenService/refreshTokenService.js";
import AccessTokenCookie from "../../utils/Cookies/SetCookies/AccessTokenCookie/accessTokenCookie.js";
import RefreshTokenCookie from "../../utils/Cookies/SetCookies/RefreshTokenCookie/refreshTokenCookie.js";

export default async function RefreshTokenController(req, res) {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      res.status(401).json("دسترسی غیر مجاز");
    }

    const { newAccessToken, newRefreshToken } = await RefreshTokenService({ refreshToken });

    AccessTokenCookie(res , newAccessToken)

    RefreshTokenCookie(res , newRefreshToken)

    return res.status(201).json({
        success : true,
        message : "توکن ها تمید شدند"
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
