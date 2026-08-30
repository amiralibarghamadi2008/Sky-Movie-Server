import "dotenv/config"
import SignInService from "../../service/SignInService/signInService.js";
import AccessTokenCookie from "../../utils/Cookies/SetCookies/AccessTokenCookie/accessTokenCookie.js";
import RefreshTokenCookie from "../../utils/Cookies/SetCookies/RefreshTokenCookie/refreshTokenCookie.js";

export default async function SignInController(req, res) {
  try {
    const {phoneNumber , otpCode , firstName} = req.body
    const result = await SignInService({phoneNumber , otpCode , firstName})
    AccessTokenCookie(res , result)
    RefreshTokenCookie(res , result)
    return res.status(200).json({
        success : true,
        message : result.isNewUser ? "ثبت نام موفقیت آمیز بود" : "ورود موفقثیت آمیز بود",
        isNewUser : result.isNewUser,
        user : {
            firstName : result.user.firstName,
            role : result.user.role
        }
    })
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      success: false,
      message: error.message || "خطای سرور",
    });
  }
}
