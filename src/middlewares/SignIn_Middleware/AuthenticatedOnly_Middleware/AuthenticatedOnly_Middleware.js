import verifyAccessToken from "../../../utils/token/verifyAccessToken/verifyAccessToken.js";

export default function AuthenticatedOnly_Middleware(req, res, next) {
  try {
    const token = req.cookies?.accessToken;

    if (!token) {
      return res
        .status(401)
        .json({
          success: false,
          message: "دسترسی غیرمجاز! لطفا ابتدا وارد حساب خود شوید.",
        });
    }

    const decoded = verifyAccessToken(token);

    if (!decoded) {
      return res
        .status(401)
        .json({ success: false, message: "توکن شما منقضی یا نامعتبر است." });
    }

    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "توکن شما منقضی یا نامعتبر است." });
  }
}
