import VerifyAccessToken from "../../../utils/tokens/VerifyAccessToken/verifyAccessToken.js";
import { FindOneUser } from "../../../repository/UserRepository/UserRepository.js";
import ClearAccessTokenCookie from "../../../utils/Cookies/ClearCookies/AccessTokenCookie/accessTokenCookie.js";
import ClearRefreshTokenCookie from "../../../utils/Cookies/ClearCookies/RefreshTokenCookie/refreshTokenCookie.js";

export default async function LoginOnly(req, res, next) {
  try {
    const token = req.cookies?.accessToken;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "ابتدا لاگین یا ثبت نام کنید",
      });
    }

    const decode = VerifyAccessToken(token);

    if (!decode) {
      return res.status(401).json({
        success: false,
        message: "توکن شما منقضی شده است",
      });
    }

    const user = await FindOneUser({ _id: decode.userId });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "همچین کاربری وجود ندارد",
      });
    }

    if (user.isBanned === true) {
      ClearAccessTokenCookie(res);
      
      ClearRefreshTokenCookie(res);

      return res.status(403).json({
        success: false,
        message: "اکانت شما مسدود شده است، برای پیگیری ایمیل بزنید",
      });
    }

    req.user = decode;

    return next();
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
