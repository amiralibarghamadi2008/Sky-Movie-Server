import VerifyAccessToken from "../../../utils/tokens/VerifyAccessToken/verifyAccessToken.js";

export default function LoginOnly(req, res, next) {
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

    req.user = decode;

    next();
  } catch (error) {
    throw error;
  }
}
