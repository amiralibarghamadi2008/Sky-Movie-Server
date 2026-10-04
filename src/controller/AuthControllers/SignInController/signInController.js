import "dotenv/config";
import SignInService from "../../../service/AuthService/SignInService/signInService.js";
import AccessTokenCookie from "../../../utils/Cookies/SetCookies/AccessTokenCookie/accessTokenCookie.js";
import RefreshTokenCookie from "../../../utils/Cookies/SetCookies/RefreshTokenCookie/refreshTokenCookie.js";
import { validateSignIn } from "../../../validator/AuthValidator/authValidator.js";

export default async function SignInController(req, res) {
  try {

    const checkResult = validateSignIn(req.body);

    if (checkResult !== true) {
      return res.status(422).json({
        success: false,
        message: checkResult[0].message,
        errors: checkResult.map((error) => ({
          field: error.field,
          message: error.message,
        })),
      });
    }

    const { phoneNumber, otpCode, firstName } = req.body;

    const result = await SignInService({ phoneNumber, otpCode, firstName });    

    AccessTokenCookie(res, result.accessToken);

    RefreshTokenCookie(res, result.refreshToken);

    return res.status(200).json({
      success: true,

      message: result.isNewUser
        ? "ثبت نام موفقیت آمیز بود"
        : "ورود موفقثیت آمیز بود",

      isNewUser: result.isNewUser,

      user: {
        firstName: result.user.firstName,
        role: result.user.role,
      },
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      success: false,
      message: error.message || "خطای سرور",
    });
  }
}
