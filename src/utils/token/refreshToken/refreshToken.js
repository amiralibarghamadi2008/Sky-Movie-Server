import "dotenv/config";
import jwt from "jsonwebtoken";
import crypto from "crypto";

export default function GenerateRefreshToken(user) {
  try {
    return jwt.sign({ id: user._id , firstName : user.firstName , jti: crypto.randomUUID(), }, process.env.Refresh_Token_Security_Code, {
      expiresIn: "15d",
    });
  } catch (error) {
    throw error;
  }
}
