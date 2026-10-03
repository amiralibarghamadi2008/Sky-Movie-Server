import "dotenv/config";
import jwt from "jsonwebtoken";
import crypto from "crypto";

export default function AccessToken(userData) {
  try {
    const accessToken = jwt.sign(
      {
        userId: userData._id,
        firstName: userData.firstName,
        userRole: userData.role,
        jti: crypto.randomUUID(),
      },
      process.env.Access_Token_Security_Code,
      { expiresIn: "10m" }
    );

    return accessToken;
  } catch (error) {
    throw new Error(`توکن نشست نکرد${error}`);
  }
}
