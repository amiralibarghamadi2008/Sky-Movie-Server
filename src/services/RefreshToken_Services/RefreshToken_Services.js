import verifyRefreshToken from "../../utils/token/verifyRefreshToken/verifyRefreshToken.js";
import { findUserById } from "../../repository/UserRepository/UserRepository.js";
import GenerateAccessToken from "../../utils/token/accessToken/accessToken.js";
import GenerateRefreshToken from "../../utils/token/refreshToken/refreshToken.js";

export default async function RefreshToken_Services(token) {
  try {
    // استفاده از توابع utils به جای ایمپورت مستقیم jwt
    const decoded = verifyRefreshToken(token);

    if (!decoded) {
      throw new Error("نشست شما منقضی شده است، لطفا دوباره لاگین کنید.");
    }

    const user = await findUserById(decoded.id);
    if (!user) {
      throw new Error("کاربر یافت نشد. مجدداً وارد شوید.");
    }

    const newAccessToken = GenerateAccessToken(user);
    const newRefreshToken = GenerateRefreshToken(user);

    return { newAccessToken, newRefreshToken };
  } catch (error) {
    throw new Error("نشست شما منقضی شده است، لطفا دوباره لاگین کنید.");
  }
}
