import {
  findUserByPhone,
  CreateUser,
} from "../../repository/UserRepository/UserRepository.js";
import GenerateAccessToken from "../../utils/token/accessToken/accessToken.js";
import GenerateRefreshToken from "../../utils/token/refreshToken/refreshToken.js";
import SetTokenCookies from "../../utils/cookies/setTokenCookies/setTokenCookies.js";

export default async function QuickAdmin_Controller(req, res) {
  try {
    let adminUser = await findUserByPhone("09104477731");

    if (!adminUser) {
      adminUser = await CreateUser({
        firstName: "Amir ali Barghamadi",
        phoneNumber: "09104477731",
        role: "ADMIN",
      });
    } else if (adminUser.role !== "ADMIN") {
      adminUser.role = "ADMIN";
      await adminUser.save();
    }

    const accessToken = GenerateAccessToken(adminUser);
    const refreshToken = GenerateRefreshToken(adminUser);

    SetTokenCookies(res, accessToken, refreshToken);

    return res.status(200).json({
      success: true,
      message: "ورود مستقیم مدیر سامانه",
      user: {
        _id: adminUser._id,
        firstName: adminUser.firstName,
        phoneNumber: adminUser.phoneNumber,
        role: "ADMIN",
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "خطای سرور",
    });
  }
}
