import "dotenv/config";
import jwt from "jsonwebtoken";
import crypto from "crypto";

export default function RefreshToken(userData) {
  const refreshToken = jwt.sign(
    {
      userId: userData._id,
      firstName: userData.firstName,
      userRole: userData.role,
      jti: crypto.randomUUID(),
    },
    process.env.Access_Token_Security_Code,
    { expiresIn: "20d" }
  );

  return refreshToken;
}
