import VerifyRefreshToken from "../../utils/tokens/VerifyRefreshToken/verifyRefreshToken.js";
import { FindOneUserById } from "../../repository/UserRepository/UserRepository.js";
import AccessToken from "../../utils/tokens/AccessToken/accessToken.js";
import RefreshToken from "../../utils/tokens/RefreshToken/refreshToken.js";

export default async function RefreshTokenService(token) {
  try {
    const decode = VerifyRefreshToken(token);

    if (!decode) {
      throw new Error("دوباره لاگین کنید");
    }

    const user = await FindOneUserById(decode.userId);

    if (!user) {
      throw new Error("همچین کاربری یافت نشد");
    }

    const newAccessToken = AccessToken(user);

    const newRefreshToken = RefreshToken(user);

    return { newAccessToken, newRefreshToken };
  } catch (error) {
    throw error;
  }
}
