import { findOTPByPhone } from "../../repository/OtpRepository/OtpRepository.js";
import {
  CreateUser,
  FindAllUsers,
  findUserByPhone,
} from "../../repository/UserRepository/UserRepository.js";
import GenerateAccessToken from "../../utils/token/accessToken/accessToken.js";
import GenerateRefreshToken from "../../utils/token/refreshToken/refreshToken.js";

export default async function SignIn_Services(userData) {
  try {
    const { phoneNumber, code, firstName } = userData;

    const otpRecord = await findOTPByPhone(phoneNumber);
    if (!otpRecord) {
      throw new Error(
        "کد تایید منقضی شده یا وجود ندارد. لطفاً مجدداً تلاش کنید.",
      );
    }

    if (otpRecord.code !== String(code)) {
      throw new Error("کد تایید وارد شده اشتباه است.");
    }

    let user = await findUserByPhone(phoneNumber);
    let isNewUser = false;

    if (!user) {
      isNewUser = true;
      const allUsers = await FindAllUsers();
      // کاربر اول ADMIN، بقیه کاربران PENDING
      const role = allUsers.length > 0 ? "PENDING" : "ADMIN";

      user = await CreateUser({
        firstName,
        phoneNumber,
        role,
      });
    }

    const accessToken = GenerateAccessToken(user);
    const refreshToken = GenerateRefreshToken(user);

    return { accessToken, refreshToken, isNewUser, user };
  } catch (error) {
    throw error;
  }
}
